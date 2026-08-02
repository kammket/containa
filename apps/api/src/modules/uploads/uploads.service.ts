import {
  BadRequestException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';

/** Erlaubte Bildformate – bewusst eng gehalten. */
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

/**
 * Wortbildmarke als Wasserzeichen für Produktfotos.
 *
 * In der Overlay-Angabe von Cloudinary ersetzt ein Doppelpunkt den
 * Verzeichnistrenner; die Datei liegt also unter `emc/watermark`.
 */
const WATERMARK_ID = 'emc:watermark';

export interface UploadResult {
  publicId: string;
  url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

/**
 * Bild-Upload nach Cloudinary.
 *
 * Der Upload läuft ausschließlich serverseitig: Das API-Secret verlässt nie
 * den Server, und jede Datei wird vorher auf Typ und Größe geprüft. Ein
 * signierter Direktupload aus dem Browser wäre schneller, würde aber diese
 * Prüfung umgehen.
 */
@Injectable()
export class UploadsService {
  private readonly logger = new Logger(UploadsService.name);
  private readonly configured: boolean;

  constructor(private readonly config: ConfigService) {
    const cloudName = this.config.get<string>('CLOUDINARY_CLOUD_NAME');
    const apiKey = this.config.get<string>('CLOUDINARY_API_KEY');
    const apiSecret = this.config.get<string>('CLOUDINARY_API_SECRET');

    this.configured = Boolean(cloudName && apiKey && apiSecret);

    if (this.configured) {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        secure: true,
      });
    } else {
      this.logger.warn(
        'Cloudinary ist nicht konfiguriert – Bild-Uploads sind deaktiviert. ' +
          'Setzen Sie CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY und CLOUDINARY_API_SECRET.',
      );
    }
  }

  async uploadProductImage(file: Express.Multer.File, productSlug: string): Promise<UploadResult> {
    this.assertConfigured();
    this.validate(file);

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `emc/products/${productSlug}`,
          resource_type: 'image',
          transformation: [
            // Überbreite Aufnahmen aus der Kamera auf sinnvolle Maße bringen
            { width: 2000, height: 2000, crop: 'limit', quality: 'auto:good' },
            // Wasserzeichen unten rechts. Es wird beim Hochladen fest
            // eingebrannt, nicht erst beim Ausliefern: So trägt auch eine
            // heruntergeladene oder anderswo eingebundene Datei die Marke.
            // `w_0.28` skaliert relativ zur Bildbreite, `fl_relative` ist dafür
            // erforderlich.
            {
              overlay: WATERMARK_ID,
              width: '0.28',
              flags: 'relative',
              gravity: 'south_east',
              x: 24,
              y: 20,
              opacity: 62,
            },
          ],
          // Verhindert doppelte Dateien bei mehrfachem Hochladen
          overwrite: false,
          unique_filename: true,
        },
        (error, result) => {
          if (error || !result) {
            this.logger.error('Cloudinary-Upload fehlgeschlagen', error);
            reject(
              new ServiceUnavailableException(
                'Das Bild konnte nicht hochgeladen werden. Bitte versuchen Sie es erneut.',
              ),
            );
            return;
          }
          resolve(this.toResult(result));
        },
      );

      stream.end(file.buffer);
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    this.assertConfigured();

    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      // Das Bild ist in der Datenbank bereits entfernt – ein verwaister
      // Cloudinary-Eintrag ist unschön, aber kein Grund für einen Fehler.
      this.logger.warn(`Bild ${publicId} konnte bei Cloudinary nicht gelöscht werden`, error);
    }
  }

  isConfigured() {
    return this.configured;
  }

  // ── intern ───────────────────────────────────────────────────────────────

  private assertConfigured() {
    if (!this.configured) {
      throw new ServiceUnavailableException(
        'Der Bildupload ist nicht konfiguriert. Bitte hinterlegen Sie die Cloudinary-Zugangsdaten.',
      );
    }
  }

  private validate(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Bitte wählen Sie eine Bilddatei aus.');
    }

    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException('Nur JPEG-, PNG-, WebP- und AVIF-Dateien sind zulässig.');
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new BadRequestException('Die Datei ist größer als 10 MB.');
    }

    // Magic Bytes prüfen: Ein umbenanntes Skript darf nicht als Bild durchgehen.
    if (!this.hasImageSignature(file.buffer)) {
      throw new BadRequestException('Die Datei ist kein gültiges Bild.');
    }
  }

  private hasImageSignature(buffer: Buffer): boolean {
    if (buffer.length < 12) return false;

    // JPEG: FF D8 FF
    if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return true;

    // PNG: 89 50 4E 47 0D 0A 1A 0A
    if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
      return true;
    }

    // WebP und AVIF liegen beide in RIFF- bzw. ISO-BMFF-Containern
    const header = buffer.subarray(0, 12).toString('binary');
    if (header.startsWith('RIFF') && header.includes('WEBP')) return true;
    if (header.includes('ftyp')) return true;

    return false;
  }

  private toResult(result: UploadApiResponse): UploadResult {
    return {
      publicId: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    };
  }
}

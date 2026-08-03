import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Meldet der Storefront, dass sich Produktdaten geändert haben.
 *
 * Die Storefront liefert Produktseiten statisch aus und erneuert sie sonst
 * erst nach einer Minute. Nach dem Speichern im Adminbereich soll die
 * Änderung aber sofort sichtbar sein – dafür ruft diese Klasse den Endpunkt
 * `/api/revalidate` der Storefront auf.
 *
 * Zwei Eigenschaften sind wichtig:
 *
 * * **Optional.** Ohne `APP_URL` und `REVALIDATE_SECRET` passiert schlicht
 *   nichts; die Seiten aktualisieren sich dann wie gehabt zeitgesteuert.
 * * **Folgenlos bei Fehlern.** Eine nicht erreichbare Storefront darf das
 *   Speichern im Adminbereich niemals scheitern lassen. Die Änderung liegt zu
 *   diesem Zeitpunkt bereits in der Datenbank.
 */
@Injectable()
export class StorefrontRevalidationService {
  private readonly logger = new Logger(StorefrontRevalidationService.name);

  constructor(private readonly config: ConfigService) {}

  /** Stößt die Erneuerung an, ohne auf sie zu warten. */
  trigger(reason: string): void {
    void this.request(reason);
  }

  private async request(reason: string): Promise<void> {
    const appUrl = this.config.get<string>('APP_URL');
    const secret = this.config.get<string>('REVALIDATE_SECRET');

    if (!appUrl || !secret) return;

    try {
      const response = await fetch(`${appUrl.replace(/\/+$/, '')}/api/revalidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-revalidate-secret': secret },
        body: JSON.stringify({ reason }),
        signal: AbortSignal.timeout(5_000),
      });

      if (!response.ok) {
        this.logger.warn(
          `Storefront meldet ${response.status} bei der Erneuerung (${reason}). ` +
            'Die Änderung erscheint spätestens nach Ablauf der Cache-Zeit.',
        );
      }
    } catch (error) {
      this.logger.warn(
        `Storefront für die Erneuerung nicht erreichbar (${reason}): ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }
}

import 'reflect-metadata';

import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const config = app.get(ConfigService);
  const port = config.get<number>('PORT', 4000);
  const isProduction = config.get<string>('NODE_ENV') === 'production';

  // ── Sicherheit ───────────────────────────────────────────────────────────
  app.use(
    helmet({
      contentSecurityPolicy: isProduction ? undefined : false,
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );
  app.use(compression());
  app.use(cookieParser(config.get<string>('COOKIE_SECRET')));

  // Nur die konfigurierten Frontends dürfen die API mit Cookies ansprechen.
  const allowedOrigins = (config.get<string>('CORS_ORIGINS') ?? 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      // Anfragen ohne Origin (Server-zu-Server, curl) dürfen passieren.
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`Origin ${origin} ist nicht zugelassen`), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  });

  app.setGlobalPrefix('api/v1', { exclude: ['health'] });

  // ── Validierung ──────────────────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // unbekannte Felder verwerfen
      forbidNonWhitelisted: true, // und bei Fremdfeldern ablehnen
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      // Fehlermeldungen kommen aus den DTOs und sind auf Deutsch formuliert
      stopAtFirstError: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  // ── API-Dokumentation ────────────────────────────────────────────────────
  if (!isProduction || config.get<string>('ENABLE_SWAGGER') === 'true') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('EMC Container API')
      .setDescription(
        'REST-API des EMC-Container-Shops. Öffentliche Endpunkte für Bestellungen, ' +
          'Anfragen und Sendungsverfolgung sowie geschützte Adminendpunkte für ' +
          'Produktpflege, Bestellübersicht und Anfragenverwaltung.',
      )
      .setVersion('1.0')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'admin')
      .addTag('Produkte', 'Öffentlicher Katalogzugriff')
      .addTag('Bestellungen', 'Bestellung anlegen und Status abfragen')
      .addTag('Anfragen', 'Kontakt- und Angebotsanfragen')
      .addTag('Zahlungen', 'Zahlungsfreigabe im Adminbereich')
      .addTag('Admin – Authentifizierung')
      .addTag('Admin – Produkte')
      .addTag('Admin – Bestellungen')
      .addTag('Admin – Anfragen')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: { persistAuthorization: true },
      customSiteTitle: 'EMC Container API',
    });
  }

  app.enableShutdownHooks();

  await app.listen(port, '0.0.0.0');

  const logger = new Logger('Bootstrap');
  logger.log(`API läuft auf Port ${port}`);
  if (!isProduction) logger.log(`Dokumentation: http://localhost:${port}/api/docs`);
}

void bootstrap();

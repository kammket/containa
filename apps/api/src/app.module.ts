import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { envValidationSchema } from './config/env.validation';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';
import { InquiriesModule } from './modules/inquiries/inquiries.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { MailModule } from './modules/mail/mail.module';
import { NewsletterModule } from './modules/newsletter/newsletter.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ProductsModule } from './modules/products/products.module';
import { UploadsModule } from './modules/uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: envValidationSchema,
      envFilePath: ['.env.local', '.env'],
    }),

    /**
     * Ratenbegrenzung gegen automatisierte Anfragen. Zwei Fenster: ein kurzes
     * gegen Lastspitzen, ein längeres gegen ausdauerndes Ausprobieren.
     * Strengere Grenzen setzen Login und Formulare per @Throttle selbst.
     */
    ThrottlerModule.forRoot([
      { name: 'short', ttl: 60_000, limit: 120 },
      { name: 'long', ttl: 3_600_000, limit: 1_000 },
    ]),

    ScheduleModule.forRoot(),

    PrismaModule,
    MailModule,
    HealthModule,

    // Öffentliche Endpunkte
    ProductsModule,
    OrdersModule,
    InquiriesModule,
    NewsletterModule,
    PaymentsModule,
    InvoicesModule,

    // Geschützter Adminbereich
    AuthModule,
    AdminModule,
    UploadsModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}

import { Module } from '@nestjs/common';

import { InquiriesModule } from '../inquiries/inquiries.module';
import { InvoicesModule } from '../invoices/invoices.module';
import { MailModule } from '../mail/mail.module';
import { OrdersModule } from '../orders/orders.module';
import { ProductsModule } from '../products/products.module';
import { UploadsModule } from '../uploads/uploads.module';
import { AdminInquiriesController } from './admin-inquiries.controller';
import { AdminMailController } from './admin-mail.controller';
import { AdminOrdersController } from './admin-orders.controller';
import { AdminProductsController } from './admin-products.controller';
import { AuditService } from './audit.service';

/**
 * Adminbereich.
 *
 * Bewusst auf drei Aufgaben begrenzt: Produkte pflegen (inklusive Bildupload),
 * Bestellungen einsehen und deren Status pflegen sowie Kontakt- und
 * Angebotsanfragen bearbeiten. Alles Weitere – Inhalte, Preise, Rechtstexte –
 * lebt versioniert im Code und nicht in einer Datenbankmaske.
 */
@Module({
  imports: [
    ProductsModule,
    OrdersModule,
    InquiriesModule,
    UploadsModule,
    InvoicesModule,
    MailModule,
  ],
  controllers: [
    AdminProductsController,
    AdminOrdersController,
    AdminInquiriesController,
    AdminMailController,
  ],
  providers: [AuditService],
  exports: [AuditService],
})
export class AdminModule {}

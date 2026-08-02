import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type { Request, Response } from 'express';

/**
 * Zentrale Fehlerbehandlung.
 *
 * Nach außen gehen ausschließlich verständliche deutsche Meldungen. Interne
 * Details – Stacktraces, Prisma-Fehlercodes, SQL – landen im Log, niemals in
 * der Antwort. Das verhindert, dass Angreifer aus Fehlermeldungen Rückschlüsse
 * auf Datenmodell oder Infrastruktur ziehen.
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { status, message, details } = this.resolve(exception);

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `${request.method} ${request.url} → ${status}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    } else {
      this.logger.warn(`${request.method} ${request.url} → ${status}: ${message}`);
    }

    response.status(status).json({
      statusCode: status,
      message,
      ...(details ? { details } : {}),
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private resolve(exception: unknown): {
    status: number;
    message: string;
    details?: unknown;
  } {
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const payload = exception.getResponse();

      if (typeof payload === 'string') return { status, message: payload };

      const record = payload as Record<string, unknown>;
      const raw = record.message;

      // ValidationPipe liefert ein Array von Meldungen
      if (Array.isArray(raw)) {
        return { status, message: raw[0] as string, details: raw };
      }

      return { status, message: (raw as string) ?? exception.message };
    }

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      return this.resolvePrisma(exception);
    }

    if (exception instanceof Prisma.PrismaClientValidationError) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Die übermittelten Daten sind unvollständig oder haben ein falsches Format.',
      };
    }

    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es später erneut.',
    };
  }

  private resolvePrisma(error: Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return {
          status: HttpStatus.CONFLICT,
          message: 'Ein Eintrag mit diesen Daten existiert bereits.',
        };
      case 'P2003':
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Der Vorgang verweist auf einen Datensatz, der nicht existiert.',
        };
      case 'P2025':
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Der angeforderte Datensatz wurde nicht gefunden.',
        };
      default:
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Bei der Datenbankabfrage ist ein Fehler aufgetreten.',
        };
    }
  }
}

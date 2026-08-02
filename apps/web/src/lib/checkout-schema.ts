import { z } from 'zod';

/**
 * Validierungsschema für die Kasse.
 *
 * Dieselben Regeln gelten serverseitig in der API (`CreateOrderDto`) – die
 * Prüfung im Browser ist reine Bequemlichkeit, verbindlich ist der Server.
 */

const postalCode = z
  .string()
  .trim()
  .regex(/^\d{5}$/, 'Bitte geben Sie eine gültige fünfstellige Postleitzahl ein.');

const phone = z
  .string()
  .trim()
  .min(6, 'Bitte geben Sie eine Telefonnummer an – wir stimmen den Liefertermin ab.')
  .regex(/^[+0-9()\s./-]{6,25}$/, 'Bitte geben Sie eine gültige Telefonnummer ein.');

export const addressSchema = z.object({
  firstName: z.string().trim().min(2, 'Bitte geben Sie Ihren Vornamen ein.'),
  lastName: z.string().trim().min(2, 'Bitte geben Sie Ihren Nachnamen ein.'),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  street: z.string().trim().min(2, 'Bitte geben Sie die Straße ein.'),
  houseNumber: z.string().trim().min(1, 'Bitte geben Sie die Hausnummer ein.'),
  postalCode,
  city: z.string().trim().min(2, 'Bitte geben Sie den Ort ein.'),
  country: z.string().min(2).default('DE'),
  phone,
});

export type AddressValues = z.infer<typeof addressSchema>;

export const checkoutSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, 'Bitte geben Sie Ihre E-Mail-Adresse ein.')
      .email('Bitte geben Sie eine gültige E-Mail-Adresse ein.'),
    customerType: z.enum(['privat', 'gewerblich'], {
      errorMap: () => ({
        message: 'Bitte wählen Sie aus, ob Sie privat oder gewerblich bestellen.',
      }),
    }),
    vatId: z.string().trim().optional().or(z.literal('')),

    billingAddress: addressSchema,
    shippingSameAsBilling: z.boolean(),
    shippingAddress: addressSchema.partial().optional(),

    paymentMethod: z.enum(['banktransfer', 'sepa', 'invoice'], {
      errorMap: () => ({ message: 'Bitte wählen Sie eine Zahlungsart.' }),
    }),

    deliveryNotes: z.string().trim().max(600).optional().or(z.literal('')),
    couponCode: z.string().trim().max(40).optional().or(z.literal('')),

    acceptsTerms: z.literal(true, {
      errorMap: () => ({ message: 'Bitte akzeptieren Sie die AGB, um fortzufahren.' }),
    }),
    acceptsWithdrawal: z.literal(true, {
      errorMap: () => ({
        message: 'Bitte bestätigen Sie die Kenntnisnahme der Widerrufsbelehrung.',
      }),
    }),
  })
  .superRefine((values, ctx) => {
    // Abweichende Lieferadresse muss vollständig sein
    if (!values.shippingSameAsBilling) {
      const result = addressSchema.safeParse(values.shippingAddress ?? {});
      if (!result.success) {
        for (const issue of result.error.issues) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['shippingAddress', ...issue.path],
            message: issue.message,
          });
        }
      }
    }

    // Kauf auf Rechnung ist Geschäftskunden vorbehalten
    if (values.paymentMethod === 'invoice' && values.customerType !== 'gewerblich') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['paymentMethod'],
        message: 'Kauf auf Rechnung ist Geschäftskunden nach Bonitätsprüfung vorbehalten.',
      });
    }

    // USt-IdNr. prüfen, sofern angegeben
    if (
      values.vatId &&
      values.vatId.length > 0 &&
      !/^DE\d{9}$/i.test(values.vatId.replace(/\s/g, ''))
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['vatId'],
        message: 'Bitte geben Sie eine gültige deutsche USt-IdNr. an (Format: DE123456789).',
      });
    }
  });

export type CheckoutValues = z.infer<typeof checkoutSchema>;

/**
 * Prüfung der Umgebungsvariablen beim Start.
 *
 * Die Anwendung startet bewusst nicht, wenn sicherheitsrelevante Werte fehlen
 * oder zu schwach sind – ein früher Abbruch ist deutlich besser als ein
 * scheinbar laufender Dienst mit unsicherer Konfiguration.
 */

const REQUIRED_ALWAYS = ['DATABASE_URL', 'JWT_SECRET', 'JWT_REFRESH_SECRET'] as const;

/** In Produktion zusätzlich erforderlich. */
const REQUIRED_IN_PRODUCTION = ['COOKIE_SECRET', 'CORS_ORIGINS', 'APP_URL'] as const;

const MIN_SECRET_LENGTH = 32;

export function envValidationSchema(config: Record<string, unknown>) {
  const errors: string[] = [];
  const isProduction = config.NODE_ENV === 'production';

  for (const key of REQUIRED_ALWAYS) {
    if (!config[key]) errors.push(`${key} fehlt.`);
  }

  if (isProduction) {
    for (const key of REQUIRED_IN_PRODUCTION) {
      if (!config[key]) errors.push(`${key} fehlt (in Produktion erforderlich).`);
    }
  }

  // Zu kurze Schlüssel sind angreifbar – das darf nicht unbemerkt durchgehen.
  for (const key of ['JWT_SECRET', 'JWT_REFRESH_SECRET', 'COOKIE_SECRET'] as const) {
    const value = config[key];
    if (typeof value === 'string' && value.length > 0 && value.length < MIN_SECRET_LENGTH) {
      errors.push(`${key} ist zu kurz (mindestens ${MIN_SECRET_LENGTH} Zeichen).`);
    }
  }

  if (config.JWT_SECRET && config.JWT_SECRET === config.JWT_REFRESH_SECRET) {
    errors.push('JWT_SECRET und JWT_REFRESH_SECRET müssen sich unterscheiden.');
  }

  if (errors.length > 0) {
    throw new Error(
      `Ungültige Konfiguration:\n  - ${errors.join('\n  - ')}\n\n` +
        'Siehe .env.example für die vollständige Liste der Variablen.',
    );
  }

  return {
    ...config,
    NODE_ENV: config.NODE_ENV ?? 'development',
    PORT: Number(config.PORT ?? 4000),
  };
}

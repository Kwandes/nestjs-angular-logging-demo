import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from '@sentry/angular';
import { BrowserTracing } from '@sentry/tracing';
import { AppModule } from './app/app.module';

Sentry.init({
  dsn: '<DSN>',
  integrations: [
    // Registers and configures the Tracing integration,
    // which automatically instruments your application to monitor its
    // performance, including custom Angular routing instrumentation
    new BrowserTracing({
      tracePropagationTargets: [
        'localhost:3000',
        'api.dev.omnihost.app',
        'api.danleterre.omnihost.app/api',
        /^\//,
      ],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
    /*{
      tracePropagationTargets: [
        'localhost',
        'https://api.dev.omnihost.app',
        'https://api.danleterre.omnihost.app/api',
      ],
      routingInstrumentation: Sentry.routingInstrumentation,
    }*/
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((success) => console.log(`Bootstrap success`))
  .catch((err) => console.error(err));

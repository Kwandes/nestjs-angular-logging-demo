import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from '@sentry/angular';
import { AppModule } from './app/app.module';

Sentry.init({
  dsn: '<DSN>',
  integrations: [],
  tunnel: `http://localhost:8080/tunnel`,
});

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => console.log(`Bootstrap success`))
  .catch((err) => console.error(err));

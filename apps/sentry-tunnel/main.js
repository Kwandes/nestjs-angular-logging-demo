import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';
import { log } from './utils/logger.js';
import { requestLogger } from './utils/logging.middleware.js';

// ------------------------Check environment variables------------------------

dotenv.config({ path: './.env' });

const allowedDSNs = process.env.TUNNEL_ALLOWED_DSNs;
if (!allowedDSNs) {
  log.error(
    `TUNNEL_ALLOWED_DSNs is missing from environment variables, shutting down!`
  );
  process.exit(1);
}
const allowedOrigins = process.env.TUNNEL_CORS_ALLOWED_ORIGINS;
if (!allowedOrigins) {
  log.error(
    `TUNNEL_CORS_ALLOWED_ORIGIN is missing from environment variables, shutting down!`
  );
  process.exit(1);
}
const sentryHost = '';

// ------------------------Initialize the app------------------------
const app = express();
app.use(cors({ origin: allowedOrigins, method: '*' }));
app.use('/tunnel', express.text({ type: 'text/plain' }));
app.use(express.json());
app.use(requestLogger);

// ------------------------Process tunnel requests------------------------
app.post('/tunnel', async (req, res) => {
  try {
    const envelope = req.body;
    const pieces = envelope.split('\n');
    const header = JSON.parse(pieces[0]);
    const type = JSON.parse(pieces[1]).type;

    // Verify that the given DSN is allowed
    if (!allowedDSNs.includes(header.dsn)) {
      throw new Error(`Unsupported DSN ${header.dsn}`);
    }

    // DSNs are of the form `https://<key>@o<orgId>.ingest.sentry.io/<projectId>`
    const { pathname } = new URL(header.dsn);
    // Remove leading slash
    const projectId = pathname.substring(1);

    log.trace(
      `Sending ${type} with id ${header.event_id} to projectId ${projectId}`
    );

    const sentryIngestURL = `https://sentry.io/api/${projectId}/envelope/`;
    await fetch(sentryIngestURL, {
      method: 'POST',
      body: envelope,
    })
      .then((response) => {
        // Process the response and send it back to the frontend
        response.headers.forEach(([key, value]) => {
          if (value) {
            res.setHeader(key, value);
          }
        });
        res.status(response.status).send(response.body);
      })
      .catch((error) => {
        log.error(`Sentry request has failed`, error);
        return res
          .status(400)
          .json({ error: 'Bad Request', message: 'Invalid request' });
      });
  } catch (error) {
    log.error(`An error has occurred while tunneling a Sentry event`, error);
    return res
      .status(400)
      .json({ error: 'Bad Request', message: 'Invalid request' });
  }
});

app.get('/healthcheck', (_req, res) => {
  res.send({ message: 'Server running' });
});
// ---------------------Default------------------------
// Reject all non defined paths
app.all('*', (req, res) => {
  log.warn(`Invalid request: ${req.method} ${req.url}.`);
  log.warn(`Request body: ${JSON.stringify(req.body)}`);

  res.status(401).send({
    error: 'UnauthorizedError',
    message: 'Unauthorized',
  });
});

// -------------------App Launch-----------------------
const PORT = Number(process.env.TUNNEL_PORT) || 8080;
app.listen(PORT, (error) => {
  if (error) {
    log.error(`An error has occurred during app initialization`, error);
  }
  log.info(`Sentry Tunnel has started on port: ${PORT}`);
  log.trace(`Allowed DSNs: ${allowedDSNs}`);
  log.trace(`Allowed Origins: ${allowedOrigins}`);
  return;
});

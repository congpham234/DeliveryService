import express, { Express } from 'express';
import { Server } from 'http';
import swaggerUi from 'swagger-ui-express';
import createRouter from './routes/router';
import swaggerOptions from './apis/swagger-options';

const app: Express = express();
let server: Server | null = null;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));

if (process.env.ENVIRONMENT !== 'lambda') {
  const port: number = Number(process.env.PORT) || 3000;

  server = app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
}

app.use('/', createRouter());

export const closeServer = () => {
  if (server) {
    server.close();
  } else {
    console.log('Server is not running');
  }
};

export default app;

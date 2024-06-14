import fs from 'fs';
import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
const currentModulePath = new URL(import.meta.url).pathname;

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API Docs',
      version: '1.0.0',
    },
    components: {},
  },
  // apis: ['./src/routes/*.ts'],
  apis: [
    path.join(path.dirname(currentModulePath), 'docs', 'authentication-doc.ts'),
    path.join(path.dirname(currentModulePath), 'docs', 'params-doc.ts'),
    path.join(path.dirname(currentModulePath), 'docs', 'settings-doc.ts'),
    path.join(path.dirname(currentModulePath), 'docs', 'managing-calendar-events-doc.ts'),

  ],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('/api-docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}
fs.writeFileSync('swagger.json', JSON.stringify(swaggerSpec, null, 2));

export default swaggerDocs;

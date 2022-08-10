import 'reflect-metadata';
import express from 'express';
import './shared/infra/connection/typeorm';
import router from './shared/infra/routes';
const app = express();

app.use(express.json());

app.use(router);

export default app;

import express from 'express';
import './shared/infra/connection/typeorm';
const app = express();

app.use(express.json());

export default app;

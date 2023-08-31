import express from 'express';
import { api } from './config/Config.js';
import cors from'cors';
import swaggerDocs from './config/swagger.config.js';

import login from './routes/login.routes.js';
import producto from './routes/producto.routes.js'

const app = express();

app.use(express.json());

app.use('/api/producto',producto);
app.use('/api/login', login)

app.listen(api.port,()=>{
    console.log(`Servidor corriento en el puerto => ${api.port}`);
    swaggerDocs(app, api.port);
});
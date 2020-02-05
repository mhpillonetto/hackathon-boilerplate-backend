import 'dotenv/config'
import express from 'express';
import cors from 'cors';

import routes from '../routes';
import models from '../models';

const app = express();

app.use(cors());

app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
);

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);
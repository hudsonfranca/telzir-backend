import 'reflect-metadata';
import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import Routes from './routes';
import connection from './database/connection';

export const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(Routes);

export const listen = async () => {
    await connection.create();

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
};

export default {
    app,
    listen,
};

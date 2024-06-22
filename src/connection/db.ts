import { PG_DATABASE, PG_HOST, PG_PASSWORD, PG_PORT, PG_USER } from "../constants/envKeys";
import { Pool } from 'pg';

export const pool = new Pool({
    user: PG_USER,
    password: PG_PASSWORD,
    host: PG_HOST,
    port: parseInt(PG_PORT),
    database: PG_DATABASE
});

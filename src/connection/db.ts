import { POSTGRES_DB_SUPER_ADMIN_PASSWORD } from "../constants/envKeys";
import { Pool } from 'pg';

export const pool = new Pool({
    user: "postgres",
    password: POSTGRES_DB_SUPER_ADMIN_PASSWORD,
    host: "localhost",
    port: 5432,
    database: "db_devnotes"
});

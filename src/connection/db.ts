import { Pool } from 'pg';

const pool = new Pool({
    user: "postgres",
    password: process.env.POSTGRES_DB_SUPER_ADMIN_PASSWORD,
    host: "localhost",
    port: 5432,
    database: "db_devnotes"
});
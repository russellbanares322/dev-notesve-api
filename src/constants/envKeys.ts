import dotenv from 'dotenv';

dotenv.config()

export const { PORT, POSTGRES_DB_SUPER_ADMIN_PASSWORD } = process.env;
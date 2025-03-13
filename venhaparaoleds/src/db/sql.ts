import postgres from 'postgres'

export const sql = postgres(process.env.DB_URL!, { ssl: 'require', idle_timeout: 20, max_lifetime: 60 * 30 })

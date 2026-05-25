import mysql from "mysql2/promise";

type SqlValue =
  | string
  | number
  | bigint
  | boolean
  | Date
  | null
  | Buffer
  | Uint8Array
  | SqlValue[]
  | { [key: string]: SqlValue };

const databaseUrl = {
  host: process.env.MYSQL_HOST || "localhost",
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "lexiuridicus",
  waitForConnections: true,
  connectionLimit: 10,
};

declare global {
  var lexiuridicusPool: mysql.Pool | undefined;
}

export const pool = global.lexiuridicusPool ?? mysql.createPool(databaseUrl);

if (process.env.NODE_ENV !== "production") {
  global.lexiuridicusPool = pool;
}

export async function query<T>(sql: string, values: SqlValue[] = []) {
  const [rows] = await pool.execute(sql, values);
  return rows as T;
}

import "dotenv/config";

function getEnv(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;

  if (value === undefined || value.trim() === "") {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}
function getNumberEnv(key: string, fallback: number): number {
  const value = Number(getEnv(key, String(fallback)));

  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`Environment variable ${key} must be a positive integer`);
  }

  return value;
}



export const env = {
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: getNumberEnv("PORT", 3000),

  DB_HOST: getEnv("DB_HOST", "localhost"),
  DB_PORT: getNumberEnv("DB_PORT", 3306),
  DB_USERNAME: getEnv("DB_USERNAME"),
  DB_PASSWORD: process.env.DB_PASSWORD ?? "",
  DB_DATABASE: getEnv("DB_DATABASE"),


};

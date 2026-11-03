{
  "$schema": "https://cdn.drizzlekit.com/schema.json",
  "dialect": "postgresql",
  "dbCredentials": {
    "url": "postgresql://postgres:postgres@localhost:5432/qianduan"
  },
  "schema": "./src/db/schema.ts",
  "out": "./src/db/migrations"
}

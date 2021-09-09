module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'crm',
  logging: false,
  entities: [
    process.env.NODE_ENV === 'development' ? 'src/models/*{.ts,.js}' : './models/*{.ts,.js}'
  ],
  migrations: [
    process.env.NODE_ENV === 'development' ? 'src/database/migrations/*{.ts,.js}' : './database/*{.ts,.js}'
  ],
  cli: {
    migrationsDir: 'src/database/migrations'
  }
}
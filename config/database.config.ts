import { registerAs } from '@nestjs/config';

interface IDatabaseConfig{
  host: string
  port: number
  user: string
  pass: string
  name: string
}

export default registerAs('database', ():IDatabaseConfig => ({
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  name: process.env.DB_NAME,
}));

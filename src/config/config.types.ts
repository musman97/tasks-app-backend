export interface DbConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  dbName: string;
}

export interface JwtSecrets {
  secret: string;
  refreshSecret: string;
}

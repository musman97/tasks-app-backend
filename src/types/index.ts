export const NodeEnvs = {
  Development: 'development',
  Production: 'production',
} as const;

export type NodeEnv = (typeof NodeEnvs)[keyof typeof NodeEnvs];

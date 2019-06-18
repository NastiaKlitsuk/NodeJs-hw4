export enum KnownConfigKey {
  JwtSecret = 'jwt-sign-secret',
}

export function get(key: string): string {
  return 'my_jwt_secret';
}

export default {
  get,
};

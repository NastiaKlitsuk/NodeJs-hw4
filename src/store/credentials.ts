import { UserRole } from '../models/credentials';

export const credentials = [
  { email: 'a', password: 'a', userId: 1, roles: [UserRole.Admin] },
  { email: 'b', password: 'b', userId: 2, roles: [UserRole.Contributor] },
  { email: 'c', password: 'c', userId: 3, roles: [UserRole.Admin] },
];

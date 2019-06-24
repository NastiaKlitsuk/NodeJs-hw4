import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { UserRole, UserCredential } from '../models/credentials';

export function authenticate() {
  return passport.authenticate('jwt', { session: false });
}

export function authorize(...roles: UserRole[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (!request.isAuthenticated()) response.sendStatus(401);
    const user = request.user as UserCredential;
    if (!roles.find(role => user.roles.indexOf(role) >= 0)) {
      return response.sendStatus(403);
    }
    next();
  };
}

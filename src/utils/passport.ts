import passport from 'passport';
import { store } from '../store';
import { UserCredential } from '../models/credentials';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt_config, { KnownConfigKey } from '../configurations/jwt-config';

export function initPassport() {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      (email, password, callback) => {
        const maybeUser = store.credentials.find(
          user => user.email === email && user.password === password,
        );

        if (maybeUser) callback(null, maybeUser, { message: 'succeeded' });
        else callback(null, false, { message: 'failed' });
      },
    ),
  );

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwt_config.get(KnownConfigKey.JwtSecret),
      },
      (jwtPayload: UserCredential, callback) => callback(null, jwtPayload),
    ),
  );
}

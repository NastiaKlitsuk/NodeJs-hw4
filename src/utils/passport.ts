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
      // in this case the user credential is actually the same as jwtPayload
      // can consider simply passing jwtPayload, however it might be stale (common though)
      // trade-off: lightweight token vs. required info for most API's to reduce user re-query needs
      (jwtPayload: UserCredential, callback) => callback(null, jwtPayload),
    ),
  );
}

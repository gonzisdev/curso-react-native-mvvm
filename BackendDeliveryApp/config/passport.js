import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { secretOrKey } from './keys.js'
import { User } from '../models/user.js'

export const auth = (passport) => {
    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
    opts.secretOrKey = secretOrKey
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await User.findById(jwt_payload.id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    }))
}
// import passport from 'passport';
// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import { Request, Response, NextFunction } from 'express';
// import { AuthService } from '../auth.service'; // Assuming the auth service is in a different directory

// // Configure JWT strategy
// const jwtOptions = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: 'your-secret-key', // Replace with your actual secret key
// };

// passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
//   try {
//     const user = await AuthService.validateUser(payload);
//     if (user) {
//       return done(null, user);
//     } else {
//       return done(null, false);
//     }
//   } catch (error) {
//     return done(error, false);
//   }
// }));

// // Middleware to authenticate requests using JWT
// export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
//   passport.authenticate('jwt', { session: false }, (error, user) => {
//     if (error || !user) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
//     req.user = user;
//     next();
//   })(req, res, next);
// };

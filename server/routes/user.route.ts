import express from 'express'
import { verifyJWT } from '../../middlewares/auth.middleware.js';
import passport from "passport";


const router = express.Router();
import { loginUser, registerUser, getAllUsers, getCurrentUser, logoutUser, handleSocialLogin, unfollowUser, followUser } from '../controllers/auth.controller.js';


router.post('/register', registerUser);
router.post('/login', loginUser)
router.get('/streamers',verifyJWT, getAllUsers)
router.post('/streamers/:userId/follow',verifyJWT, followUser)
router.post('/streamers/:userId/unfollow',verifyJWT, unfollowUser)
router.get('/me',verifyJWT, getCurrentUser)
router.post('/logout',verifyJWT, logoutUser)


// SSO routes

router.route("/google").get(
    passport.authenticate("google", {
      scope: ["profile", "email"],
    }),
    (req, res) => {
      res.send("redirecting to google...");
    }
  );


router.route("/github").get(
passport.authenticate("github", {
    scope: ["profile", "email"],
}),
(req, res) => {
    res.send("redirecting to github...");
}
);

router.route("/linkedin").get(
    passport.authenticate("github", {
        scope: ["profile", "email"],
    }),
    (req, res) => {
        res.send("redirecting to github...");
    }
    );

router
.route("/google/callback")
.get(passport.authenticate("google"), handleSocialLogin);

router
  .route("/github/callback")
  .get(passport.authenticate("github"), handleSocialLogin);

  router
  .route("/linkedin/callback")
  .get(passport.authenticate("linkedin"), handleSocialLogin);


export default router;
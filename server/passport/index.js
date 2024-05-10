import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import { userLoginTypes } from "../constants.js";
import UserModel from "../models/UserModel.js";

try {
    // Serialize user which is used to store user in session
    passport.serializeUser((user, next) => {
        next(null, user._id);
    });

    // Deserialize user which is used to get user from the database
    passport.deserializeUser(async (id, next) => {
        try{
            const user = await UserModel.findById(id);
            if (user) next(null, user); // return user of exist
            else next(new Error("User not found"), null); // return error if user not found
        } catch(error) {
            next(new Error("Something went wrong while deserializing the user. Error "+ error), null); // return error if any error occurs
        }
    });

    // Google Strategy
    passport.use(
        new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALL_BACK_URL,
        },

        async (_, __, profile, next) => {
            // Check if user already exists
            const user = await UserModel.findOne({ email: profile._json.email });
            if (user) {
                // If user exists, check if the user has logged in using google ssocial login
                if (user.loginType !== userLoginTypes.GOOGLE){
                    // If user has not logged in using google social login, return error
                    next(new Error("You have previously registered using " +
                    user.loginType?.toLowerCase()?.split("_").join(" ") +
                    ". Please use the " +
                    user.loginType?.toLowerCase()?.split("_").join(" ") +
                    " login option to access your account."), null);
                } else {
                    // If user has logged in using google social login, return user
                    next(null, user);
                }
            } else {
                // If user does not exist, create a new user
                const newUser = await UserModel.create({
                    email: profile._json.email,
                    // Use google sub as password
                    password: profile._json.sub,
                    fullName: profile._json.name,
                    username: profile._json.email?.split("@")[0],
                    loginType: userLoginTypes.GOOGLE,
                });

                // Return the newly created user
                if (newUser) next(null, newUser);
                else next(new Error("Something went wrong while creating the user"), null);
            }
        }
    )
    )


    // Github Strategy
    passport.use(
        new GitHubStrategy(
            {
                clientID: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                callbackURL: process.env.GITHUB_CALL_BACK_URL,
            },
            
            async (_, __, profile, next) => {
                const user = await UserModel.findOne({ email: profile._json.email });
                if (user){
                    if (user.loginType !== userLoginTypes.GITHUB){
                        next(new Error("You have previously registered using " +
                        user.loginType?.toLowerCase()?.split("_").join(" ") +
                        ". Please use the " +
                        user.loginType?.toLowerCase()?.split("_").join(" ") +
                        " login option to access your account."), null);
                    } else {
                        next(null, user);
                    }
                } else {
                        const userNameExists = await UserModel.findOne({ username: profile?.username });

                        const createdUser = await UserModel.create({
                            email: profile._json.email,
                            password: profile._json.node_id,
                            fullName: profile._json.name,
                            username: userNameExists
                            ? profile._json.email?.split("@")[0]
                            :profile?.username,
                            loginType: userLoginTypes.GITHUB,
                        });

                        if (createdUser) next(null, createdUser);
                        else next(new Error("Something went wrong while creating the user"), null);
                    }
                }
        )
    )

    // LinkedIn Strategy
    passport.use(
        new LinkedInStrategy(
            {
                clientID: process.env.LINKEDIN_CLIENT_ID,
                clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
                callbackURL: process.env.LINKEDIN_CALL_BACK_URL,
                scope: ["r_emailaddress", "r_liteprofile"],
            },
            async (_, __, profile, next) => {
                const user = await UserModel.findOne({ email: profile._json.email });
                if (user) {
                    if (user.loginType !== userLoginTypes.LINKEDIN) {
                        next(new Error("You have previously registered using " +
                        user.loginType?.toLowerCase()?.split("_").join(" ") +
                        ". Please use the " +
                        user.loginType?.toLowerCase()?.split("_").join(" ") +
                        " login option to access your account."), null);
                    } else {
                        next(null, user);
                    }
                } else {
                    const createdUser = await UserModel.create({
                        email: profile._json.email,
                        password: profile._json.id,
                        fullName: profile._json.localizedFirstName + " " + profile._json.localizedLastName,
                        username: profile._json.email?.split("@")[0],
                        loginType: userLoginTypes.LINKEDIN,
                    });

                    if (createdUser) next(null, createdUser);
                    else next(new Error("Something went wrong while creating the user"), null);
                }
            }
        )
    );
} catch (error) {
    console.error("Error while setting up passport strategies: ", error);
}
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");
const config = require("../../config/config");

// const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

// const internalServerError = require("../middleware/error-handler");

module.exports = function(passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.JWT_SECRET_KEY;

  passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
      User.findOne({ _id: jwt_payload.id }, function(err, user) {
        // console.log("\x1b[7m\x1b[33m%s\x1b[0m", "jwt_payload", jwt_payload); //yellow

        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
    })
  );

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      function(email, password, cb) {
        //Assume there is a DB module providing a global UserModel
        return User.findOne(
          {
            email
          },
          { facebookId: 0, googleId: 0 }
        )
          .then(user => {
            // console.log("localSTR :", user);

            if (!user) {
              return cb(null, false, {
                message: "Incorrect email or password."
              });
            }
            user.comparePassword(password, function(err, isMatch) {
              if (!isMatch) {
                return cb(null, false, {
                  message: "Incorrect email or password."
                });
              }

              if (isMatch && !err) {
                const token = user.getJWT();

                User.populate(user, [
                  {
                    path: "goals",
                    model: "Goals",
                    select: { userId: 0, __v: 0, updatedAt: 0 }
                  },
                  {
                    path: "tasks",
                    model: "Tasks",
                    select: { userId: 0, __v: 0, updatedAt: 0 }
                  }
                ])
                  .then(result => {
                    // const userData = {
                    //   userData: {
                    //     name: result.name,
                    //     age: result.age,
                    //     email: result.email,
                    //     isChild: result.isChild,
                    //     scores: result.scores,
                    //     avatar: result.avatar
                    //   },
                    //   goals: result.goals,
                    //   tasks: result.tasks,
                    //   childs: result.childs,
                    //   token
                    // };
                    const userData = result.getPublicFields();
                    return cb(null, userData, {
                      message: "Logged In Successfully"
                    });
                  })
                  .catch(err => {
                    console.log(err.message);
                    return cb(err);
                  });
              }
            });
          })
          .catch(err => {
            return cb(err);
          });
      }
    )
  );

  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       clientID: config.GOOGLE_CLIENT_ID,
  //       clientSecret: config.GOOGLE_CLIENT_SECRET,
  //       callbackURL: config.GOOGLE_CB_URL
  //     },
  //     function(accessToken, refreshToken, profile, cb) {
  //       User.findOrCreate(
  //         { googleId: profile.id, email: profile.email },
  //         function(err, user) {
  //           return cb(err, user);
  //         }
  //       );
  //     }
  //   )
  // );

  passport.use(
    new FacebookStrategy(
      {
        clientID: config.FACEBOOK_APP_ID,
        clientSecret: config.FACEBOOK_APP_SECRET,
        callbackURL: config.FACEBOOK_CB_URL
      },
      function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate(
          { facebookId: profile.id, email: profile.email },
          function(err, user) {
            return cb(err, user);
          }
        );
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};

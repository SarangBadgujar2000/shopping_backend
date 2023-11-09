const User=require("./models/users")

const initializePassport = (passport) => {
  var JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.JWT_KEY;
  // opts.issuer = "accounts.examplesoft.com";
  // opts.audience = "yoursite.net";
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      console.log(jwt_payload);
      User.findOne({ _id: jwt_payload.id })
        .then((user) => {
          console.log(user);
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch((err) => {
          return done(err, false);
        });
    })
  );
};

module.exports = initializePassport;

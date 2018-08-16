/* Configures passport for auth strategy, and then 
exports its instance. */

const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const axios = require('axios');
const config = require('../../config');
const knex = require('../db/knexinstance');
const eveStrategy = new OAuth2Strategy(
  // OAuth2 config
  {
    authorizationURL: 'https://login.eveonline.com/oauth/authorize',
    tokenURL: 'https://login.eveonline.com/oauth/token',
    clientID: config.EVE_CLIENT_ID,
    clientSecret: config.EVE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/callback'
  },
  // Callback function
  async (accessToken, refreshToken, profile, cb) => {
    const { data } = await axios({
      method: 'get',
      url: 'https://login.eveonline.com/oauth/verify',
      headers: { Authorization: `Bearer ${accessToken}` }
    }).catch(err => {
      console.log(err);
    });
    const { CharacterID, CharacterName } = data;
    let [user] = await knex('users').where({ CharacterID });
    console.log(user);
    if (!user) {
      const id = await knex('users')
        .returning('id')
        .insert({ CharacterID, CharacterName });
      user = { id, CharacterID, CharacterName };
    }
    return cb(null, user);
  }
);

passport.use('eve', eveStrategy);

passport.serializeUser((user, done) => {
  /* Creates session identifier, which will be saved in
  the session store and sent to user in the cookie. For
  now, we're serializing the entire user object. We could
  alternately just serialize a user id property, and
  retrieve user data in the deserializeUser method. */
  done(null, user);
});

passport.deserializeUser((user, done) => {
  /* Retrieves user data (if necessary, here it's not), and
  attaches it to incoming request as req.user. */
  done(null, user);
});

module.exports = passport;

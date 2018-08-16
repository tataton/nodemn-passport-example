/* Handles authentication requests for login, logout,
and identification, to endpoint '/auth..'. */

const express = require('express');
const router = express.Router();
const passport = require('../resources/passport/authinstance');

router.get('/login', passport.authenticate('eve'));
router.get(
  '/callback',
  passport.authenticate('eve', {
    failureRedirect: '/'
  }),
  (req, res) => {
    res.redirect('/private/profile.html');
  }
);

router.get('/getuserinfo', (req, res) => {
  console.log(req.user);
  if (req.isAuthenticated()) {
    res.send({
      characterID: req.user.CharacterID,
      characterName: req.user.CharacterName
    });
  } else {
    res.sendStatus(403);
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;

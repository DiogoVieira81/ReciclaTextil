

const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.token;

  // Check if JWT token exists
  if (token) {
    jwt.verify(token, 'secretpassword', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    
    const error = 'Precisa fazer login para aceder a essa página!';
    res.render('login/logins', { error });
  }
};

module.exports =  requireAuth ;

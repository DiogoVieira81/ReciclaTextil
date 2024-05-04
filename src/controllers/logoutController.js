
exports.session_logout = (req, res, next) => {
    try {
       req.session.destroy();
      const error = 'Sessão terminada!';
      res.render('login/logins',{error})
    } catch (err) {
      res.status(500).send('Error logging out');
    }
  };
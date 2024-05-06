const asyncHandler = require("express-async-handler");
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login_session = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Admin.findOne({ email:email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, 'secretpassword', {
        expiresIn: '1h',
      });

      res.cookie('token', token, {
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hora
        httpOnly: true,
      });

      req.session.user_id = user._id;

      return res.redirect('/dashboard');
    } else {
      const error = 'O usuário não existe ou a senha está incorreta';
      return res.render('login/logins', { error });
    }
  } catch (error) {
    console.error(error);
    return next(error); 
  }
});

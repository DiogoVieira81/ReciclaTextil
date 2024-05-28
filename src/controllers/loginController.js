const asyncHandler = require("express-async-handler");
const Admin = require('../models/Admin');
const Donor = require('../models/Donor');
const Entity = require('../models/Entity');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login_session_json = asyncHandler(async (req, res, next) => {
  try {
      const { email, password } = req.body;

      const user = await Admin.findOne({ email: email });

      if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign({ id: user._id }, 'secretpassword', {
              expiresIn: '1h',
          });

          res.cookie('token', token, {
              expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hora
              httpOnly: true,
          });

          req.session.user_id = user._id;

          return res.json({ message: 'Login successful', token });
      } else {
          return res.status(401).json({ message: 'Invalid email or password' });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
  }
});
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

exports.userLogin = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user;
    let userType;

    // Tenta encontrar o usuário na coleção Donor
    user = await Donor.findOne({ email: email });
    if (user) {
      userType = 'donor';
    } else {
      // Tenta encontrar o usuário na coleção Entity
      user = await Entity.findOne({ email: email });
      if (user) {
        userType = 'entity';
      }
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id, userType }, 'secretpassword', {
        expiresIn: '1h',
      });

      res.cookie('token', token, {
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hora
        httpOnly: true,
      });

      req.session.user_id = user._id;
      req.session.user_type = userType;

      return res.json({ message: 'Login successful', token });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
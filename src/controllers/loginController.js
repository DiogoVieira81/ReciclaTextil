const asyncHandler = require("express-async-handler");
const Admin = require('../models/Admin');
const Donor = require('../models/Donor');
const Entity = require('../models/Entity');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Passport } = require("passport");

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

          return res.json({ message: 'Login successful'});
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
  
    const { email, password } = req.body;
    let user;
    console.log('Procurando usuário com email:', email);
    try{
   user = await Donor.findOne({ email });
    console.log('Usuário não encontrado');
    if(!user){
      user = await Entity.findOne({ email });
    }
    if(!user){
      console.log('Usuário não encontrado');
      return res.status(400).json({error:"user not found"});
    }
    console.log('Usuário encontrado:', user);
const passwordMatch=await bcrypt.compare(password, user.password);
console.log('Comparação de senha:', passwordMatch);
if(!passwordMatch){
  return res.status(400).json({error:'incorrect credentials'});
}

 
    const token = jwt.sign({ id: user._id }, 'secretpassword', {
      expiresIn: '1h',
    });
    console.log('Token gerado:', token);
  return res.status(200).json({
    status:true,
    message:'User loggedin',
    data:{_id:user._id,email:user.email,name:user.name},
    token,
  });
} catch (error) {
  console.error('Erro durante o processo de login:', error);
  return res.status(400).json({error:'incorrect credentials'});
  
}
    

  
});
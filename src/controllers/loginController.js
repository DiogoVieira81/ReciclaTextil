const asyncHandler = require("express-async-handler");
const Admin = require('../models/Admin');

exports.login_session = asyncHandler(async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log("Email:", email);
    
    
    const user = await Admin.findOne({ email: email});
    console.log("User:", user);

    if(user){
      console.log("User ID:", user._id);
      req.session.user_id = user._id;
      return res.redirect('/dashboard');
    } else {
        const error = 'O usuário não existe ou senha incorreta';
        res.render('login/logins', { error });
        }
  } catch (error) {
    console.error(error);
    return next(error); 
  }
});

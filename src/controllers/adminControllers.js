const asyncHandler = require("express-async-handler");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const jwtSecret = '424fdce80b01e737a19c9d465aae7b552e1354e181007475a6029fc9307d78ab0ae09f';
const passport = require('passport');
const Donor = require("../models/Donor");
const Entity = require("../models/Entity");

// Display list of all  Admins
exports.admin_list = asyncHandler(async (req, res, next) => {
    const admins = await Admin.find({});
    res.render('admins/show',{admins:admins});
    next();
})

// Display detail page for a specific Admin
exports.admin_detail = asyncHandler(async (req, res, next) => {
    const admin = await Admin.findById(req.params.id);
    res.json(admin);
    next();
})

// Display Admin create form on GET.
exports.admin_create_get = asyncHandler(async (req, res, next) => {
    res.render('admins/create', { title: 'Create admin' });
    next();
})

// Handle Admin create on POST.
exports.admin_create_post = asyncHandler(async (req, res, next) => {
    // Extract data from request body
    const { email, password } = req.body;

    bcrypt.hash(password, 10).then(async (hash) => {
        await Admin.create({
            email,
            password: hash,
        })
            .then((admin) => {
                const maxAge = 3 * 60 * 60;
                const token = jwt.sign(
                    { id: admin._id, email },
                    jwtSecret,
                    {
                        expiresIn: maxAge, // 3hrs in sec
                    }
                );
                res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000, // 3hrs in ms
                });
                res.render('admins/message')
            })
            .catch((error) =>
                res.status(400).json({
                    message: "Admin not successful created",
                    error: error.message,
                })
            );
    });
})

// Display Admin delete form on GET.
exports.admin_delete_get = asyncHandler(async (req, res, next) => {
    try {
        // Find the entity by ID from the request parameters
        const admin = await Admin.findById(req.params.id);

        if (!admin) {
            // If admin not found, return a 404 error
            res.status(404).json({ message: "Admin not found" });
            next();
        } else {
            // Render a delete confirmation form or page
            res.render("admins/delete", { admin: admin });
            next();
        }
    } catch (error) {
        // Handle database errors
        res.status(500).json({ message: error.message });
        next();
    }
})

// Handle Admin delete on POST.
exports.admin_delete_post = asyncHandler(async (req, res, next) => {
    try {
        // Find the entity by ID from the request parameters
        const admin = await Admin.findById(req.params.id);

        if (!admin) {
            // If admin not found, return a 404 error
            res.status(404).json({ message: "Admin not found" });
            next();
        } else {
            // Delete the admin from the database
            await Admin.deleteOne({ _id: admin.id });
            res.render('admins/message')
            next();
        }
    } catch (error) {
        // Handle database errors
        res.status(500).json({ message: error.message });
        next();
    }
})

// Display Admin update form on GET.
exports.admin_update_get = asyncHandler(async (req, res, next) => {
   
    res.render('admins/profile');
});

// Handle Admin update on POST.
    exports.admin_update_post = asyncHandler(async (req, res, next) => {
        try {
            // Extract updated password details from the request body
            const { email, passwordAntiga, passwordNova } = req.body;
            
            // Find the admin by email from the request parameters
            let admin = await Admin.findOne({ email });
    
            if (!admin) {
                // If admin not found, return a 404 error
                const error = "Email incorreto";
                res.render('admins/profile', { error });
                return;
            }
            if (email !== admin.email) {
                // If the email is different, render the page with an error message
                const error = "Email incorreto";
                res.render('admins/profile', { error });
                return;
            }
            const isPasswordValid = await bcrypt.compare(passwordAntiga, admin.password);
    
            if (!isPasswordValid) {
                const error = "Senha incorreta";
                res.render('admins/profile', { error });
                return;
            }
    
            // Update the admin's email
            admin.email = email;
    
            // Update the password if it's present
            if (passwordNova) {
                const hash = await bcrypt.hash(passwordNova, 10);
                admin.password = hash;
            }   
    
            // Save the updated admin to the database
            admin = await admin.save();
            res.render('admins/message');
        } catch (error) {
            // Handle validation or database errors
            res.status(400).json({ message: error.message });
            next();
        }
    });
// Display Admin login form on GET.
exports.admin_login_get = asyncHandler(async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.params.id);
        res.render('admins/profile', { admin });
    } catch (error) {
        res.status(404).json({ message: "Admin not found" });
    }
});

// Display Admin login form on POST.
exports.admin_login_post = passport.authenticate('admin-local', {
    successRedirect: '/admins/dashboard',
    failureRedirect: '/admins/login',
    failureFlash: true
  });

  // Admin Dashboard Route Handler
exports.admin_dashboard_get = asyncHandler(async (req, res, next) => {
    const donors = await Donor.find({ kg: { $exists: true, $nin: [0] } }).sort({kg:-1}).limit(5);
    const entities = await Entity.find({ kg: { $exists: true, $nin: [0] } });
    // Render the admin dashboard interface
    res.render('dashboard', { donors : donors, entities : entities });
});

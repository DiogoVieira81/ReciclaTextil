const asyncHandler = require("express-async-handler");
const Admin = require("../models/Admin");

// Display list of all  Admins
exports.admin_list = asyncHandler(async (req, res, next) => {
    const admins = await Admin.find({});
    res.json(admins);
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

    // Create a new Admin object
    const newAdmin = new Admin ({
        email,
        password
    });

    try {
        // Save the new Admin to the database
        const savedAdmin = await newAdmin.save();
        res.status(201).json(savedAdmin);
        next();
    } catch (error) {
        // Handle validation or database errors
        res.status(400).json({ message: error.message });
        next();
    }
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
            await admin.remove();
            res.json({ message: "Admin deleted successfully" });
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
    try {
        // Find the admin by ID from the request parameters
        const admin = await Admin.findById(req.params.id);

        if (!admin) {
            // If admin not found, return a 404 error
            res.status(404).json({ message: "Admin not found" });
            next();
        } else {
            // Render the admin update form with the existing admin details
            res.render("admins/update", { admin: admin });
            next();
        }
    } catch (error) {
        // Handle database errors
        res.status(500).json({ message: error.message });
        next();
    }
})

// Handle Admin update on POST.
exports.admin_update_post = asyncHandler(async (req, res, next) => {
    try {
        // Extract updated password details from the request body
        const { password } = req.body;

        // Find the admin by ID from the request parameters
        let admin = await Admin.findById(req.params.id);

        if (!admin) {
            // If admin not found, return a 404 error
            res.status(404).json({ message: "Admin not found" });
            next();
        } else {
            // Update the password fields
            admin.password = password;

            // Save the updated admin to the database
            admin = await admin.save();
            res.json(admin);
            next();
        }
    } catch (error) {
        // Handle validation or database errors
        res.status(400).json({ message: error.message });
        next();
    }
})

const Admin = require("../models/Admin");
const asyncHandler = require("express-async-handler");
const donorControllers = require("../controllers/donorControllers");
const entityControllers = require("../controllers/entityControllers");


//list all the admins
exports.admin_list = asyncHandler(async (req, res, next) => {
    const admins = await Admin.find({});
    res.json = admins;
    next();
})

// Display detail page for a specific Admin
exports.admin_detail = asyncHandler(async (req, res, next) => {
    const admin = await Admin.findById(req.param.id);
    res.json(admin);
    next();
})

//Display Admin create form GET
exports.admin_create_get = asyncHandler(async (req, res, next) => {
    res.render('admin_form', { title: 'Create Admin' });
    next();
})

//Handle admin create form POST
exports.admin_create_post = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    const newAdmin = new Admin({
        username,
        password,
    });

    try {
        const savedAdmin = await newAdmin.save();
        res.status(201).json(savedAdmin);
        next();
    } catch (error) {
        res.status(400).json({ message: error.message });
        next();
    }
})

//display admin update page GET
exports.admin_update_get = asyncHandler(async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.params.id);

        if (!admin) {
            res.status(404).json({ message: "Admin not found" });
            next();
        } else {
            res.render("admin_update", { admin: admin });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        next();
    }
})

//handle admin update POST
exports.admin_update_post = asyncHandler(async (req, res, next) => {
    try {
        const { password, status } = req.body;

        let admin = await Admin.findById(req.param.id);

        if (!admin) {
            res.status(404).json({ message: "Admin not found" });
            next();
        } else {
            admin.password = password;
            admin.status = status;

            admin = await admin.save();
            res.json(admin);
            next();
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
        next();
    }
})

//display admin delete page GET
exports.admin_delete_get = asyncHandler(async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.params.id);

        if (!admin) {
            res.status(404).json({ message: "Admin not found" });
            next();
        } else {
            res.render("admin_delete", { admin: admin });
            next();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        next();
    }
})

//handle admin delete POST
exports.admin_delete_post = asyncHandler(async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.params.id);

        if (!admin) {
            res.status(404).json({ message: "Admin not found" });
            next();
        } else {
            await admin.remove();
            res.json({ message: "Customer deleted susccessfully" });
            next();
        }
    } catch (error) {
        res.status(500).json(error.message);
        next();
    }
})

//allows the admin to list all of the customers
exports.admin_list_donor = asyncHandler(async (req, res, next) => {
    try {
        customerControllers.customer_list;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//Allows the admin to display the details of a specific customer
exports.admin_detail_customer = asyncHandler(async (req, res, next) => {
    try {
        customerControllers.customer_detail;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//Displays the customer create form by the admin
exports.admin_customer_create_get = asyncHandler(async (req, res, next) => {
    try {
        customerControllers.customer_create_get;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//handles the customer creation by the admin POST
exports.admin_customer_create_post = asyncHandler(async (req, res, next) => {
    try {
        customerControllers.customer_create_post;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//displays the customer update by the admin GET
exports.admin_customer_update_get = asyncHandler(async (req, res, next) => {
    try {
        customerControllers.customer_update_get;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//handles the customer update by the admin POST
exports.admin_customer_update_post = asyncHandler(async (req, res, next) => {
    try {
        customerControllers.customer_update_post;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//displays the customer delete by the admin GET
exports.admin_customer_delete_get = asyncHandler(async (req, res, next) => {
    try {
        customerControllers.customer_delete_get;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//handles the customer delete by the admin POST
exports.admin_customer_delete_post = asyncHandler(async (req, res, next) => {
    try {
        customerControllers.customer_delete_post;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//displays the customer reservation list
exports.admin_reservation_list = asyncHandler(async (req, res, next) => {
    try {
        reservationControllers.reservation_list;
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//displays the details of a specific reservation by the admin
exports.admin_reservation_detail = asyncHandler(async (req, res, next) => {
    try {
        reservationControllers.reservation_detail;
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//displays the reservation update by the admin GET
exports.admin_reservation_update_get = asyncHandler(async (req, res, next) => {
    try {
        reservationControllers.reservation_update_get;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//handles the reservation update by the admin POST
exports.admin_reservation_update_post = asyncHandler(async (req, res, next) => {
    try {
        reservationControllers.reservation_update_post;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
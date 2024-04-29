const asyncHandler = require("express-async-handler");
const donationControllers = require("../controllers/donationControllers");
const Donor = require("../models/Donor");
const { calculatePointsForDonation } = require("../utils/donationUtils");

// Display list of all  Donors
exports.donor_list = asyncHandler(async (req, res, next) => {
    const donors = await Donor.find({});
    res.json(donors);
    next();
})

// Display detail page for a specific Donor
exports.donor_detail = asyncHandler(async (req, res, next) => {
    const donor = await Donor.findById(req.params.id);
    res.json(donor);
    next();
})

// Display Donor create form on GET.
exports.donor_create_get = asyncHandler(async (req, res, next) => {
    res.render('/donors/create', { title: 'Criar Doador' });
    next();
})

// Handle Donor create on POST.
exports.donor_create_post = asyncHandler(async (req, res, next) => {
    // Extract data from request body
    const { name, email, phoneNumber,address,city,district,points} = req.body;

    // Create a new Donor object
    const newDonor = new Donor({
        name,
        email,
        phoneNumber,
        address,
        city,
        district,
        points

    });

    try {
        // Save the new donor to the database
        const savedDonor = await newDonor.save();
        res.status(201).json(savedDonor); // Return the newly created customer
        next();
    } catch (error) {
        // Handle validation or database errors
        res.status(400).json({ message: error.message });
        next();
    }
})

// Display Donor delete form on GET.
exports.donor_delete_get = asyncHandler(async (req, res, next) => {
    try {
        // Find the donor by ID from the request parameters
        const donor = await Donor.findById(req.params.id);

        if (!donor) {
            // If donor not found, return a 404 error
            res.status(404).json({ message: "Donor not found" });
            next();
        } else {
            // Render a delete confirmation form or page
            res.render("donor_delete", { donor: donor });
            next();
        }
    } catch (error) {
        // Handle database errors
        res.status(500).json({ message: error.message });
        next();
    }
})

// Handle Donor delete on POST.
exports.donor_delete_post = asyncHandler(async (req, res, next) => {
    try {
        // Find the donor by ID from the request parameters
        const donor = await Donor.findById(req.params.id);

        if (!donor) {
            // If donor not found, return a 404 error
            res.status(404).json({ message: "Donor not found" });
            next();
        } else {
            // Delete the donor from the database
            await Entity.deleteOne({ _id: entity.id });
            res.json({ message: "Donor deleted successfully" });
            next();
        }
    } catch (error) {
        // Handle database errors
        res.status(500).json({ message: error.message });
        next();
    }
})

// Display Donor update form on GET.
exports.donor_update_get = asyncHandler(async (req, res, next) => {
    try {
        // Find the donor by ID from the request parameters
        const donor = await Donor.findById(req.params.id);

        if (!donor) {
            // If donor not found, return a 404 error
            res.status(404).json({ message: "Donor not found" });
            next();
        } else {
            // Render the donor update form with the existing donor details
            res.render("donor_update", { donor: donor });
            next();
        }
    } catch (error) {
        // Handle database errors
        res.status(500).json({ message: error.message });
        next();
    }
})

// Handle Donor update on POST.
exports.donor_update_post = asyncHandler(async (req, res, next) => {
    try {
        // Extract updated donor details from the request body
        const {name, email, phoneNumber,address,city,district,points} = req.body;

        // Find the donor by ID from the request parameters
        let donor = await Donor.findById(req.params.id);

        if (!donor) {
            // If donor not found, return a 404 error
            res.status(404).json({ message: "Donor not found" });
            next();
        } else {
            // Update the donor fields
            donor.name = name;
            donor.email=email;
            donor.phoneNumber=phoneNumber;
            donor.address=address;
            donor.city=city;
            donor.district=district
            donor.points = points;

            // Save the updated donor to the database
            donor = await donor.save();
            res.json(donor);
            next();
        }
    } catch (error) {
        // Handle validation or database errors
        res.status(400).json({ message: error.message });
        next();
    }
})

// Handle Donor donation create on GET.
exports.donor_donation_create_get = asyncHandler(async (req, res, next) => {
    try {
        donationControllers.donation_create_get;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Handle Donor donation create on POST.
exports.donor_donation_create_post = asyncHandler(async (req, res, next) => {
    try {
        // Extract donation details from the request body
        const { value, donor } = req.body;
    
        // Calculate the number of points to award
        const pointsToAdd = calculatePointsForDonation(value);
    
        // Find the donor by ID and update their points balance
        const theDonor = await Donor.findById(donor);
        theDonor.points += pointsToAdd;
        await theDonor.save();
    
        // Create the donation and associate it with the donor
        donationControllers.donation_create_post(req, res, next);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})

// Handle Donor donation update on GET.
exports.donor_donation_update_get = asyncHandler(async (req, res, next) => {
    try {
        donationControllers.donation_update_get;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Handle Donor donation update on POST.
exports.donor_donation_update_post = asyncHandler(async (req, res, next) => {
    try {
        donationControllers.donation_update_post;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Handle Donor donation delete on GET.
exports.donor_donation_delete_get = asyncHandler(async (req, res, next) => {
    try {
        donationControllers.donation_delete_get;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Handle Donor donation delete on POST.
exports.donor_donation_delete_post = asyncHandler(async (req, res, next) => {
    try {
        donationControllers.donation_delete_post;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
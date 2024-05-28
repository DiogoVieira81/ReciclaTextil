const asyncHandler = require("express-async-handler");
const Entity = require("../models/Entity");
const Donor=require("../models/Donor")
const Donation=require("../models/Donation")

exports.donation_calculate_points = asyncHandler(async (req, res, next) => {
    const { kg, condition } = req.body;
    let pontos = 0;
    
    if (kg && condition) {
        if (condition === 'nova') {
            pontos = kg * 9;
        } else if (condition === 'semi-nova') {
            pontos = kg * 5;
        } else if (condition === 'desgastada') {
            pontos = kg * 2;
        }
    }
    
    res.json({ points: pontos });
});
exports.donation_list_json = asyncHandler(async (req, res, next) => {
    const donations = await Donation.find({})
    .populate('donor')
    .populate('entity');
    res.json({ donations: donations });
});

// Display list of all  Donations
exports.donation_list = asyncHandler(async (req, res, next) => {
    const donations = await Donation.find({})
    .populate('donor')
    .populate('entity');
    res.render('donations/show', { donations: donations });
   
})


// Display Donation create form on GET.
exports.donation_create_get = asyncHandler(async (req, res, next) => {
    try{
    const donors = await Donor.find({});
    const entities = await Entity.find({});
            const donations = await Donation.find({})
                .populate('donor')
                .populate('entity')
                .exec();
        res.render('donations/create', { title: 'Criar Doação', donors, entities });
    } catch (error) {
        return next(error);
    }
})
exports.donation_create_post_json = asyncHandler(async (req, res, next) => {
    // Extract data from request body
    const { id, numberOfParts, condition, kg, points, state, donor, entity } = req.body;
    
    // Create a new Donation object
    const newDonation = new Donation({
        id,
        numberOfParts,
        condition,
        kg,
        points,
        state,
        donor,
        entity
    });
    
    try {
        // Save the new donation to the database
        const savedDonation = await newDonation.save();
        const theDonor = await Donor.findById(donor);
        const theEntity = await Entity.findById(entity);
        
        theDonor.points += parseInt(points);
        theDonor.kg += parseInt(kg);
        theDonor.totalDonations += 1;
        await theDonor.save();

        theEntity.kg += parseInt(kg);
        theEntity.totalDonations += 1;
        await theEntity.save();
        
        // Return a JSON response with a success message
        res.status(201).json({ message: "Donation created successfully" });
    } catch (error) {
        // Handle validation or database errors
        res.status(400).json({ message: error.message });
        next();
    }
});

// Handle Donation create on POST.
exports.donation_create_post = asyncHandler(async (req, res, next) => {
    // Extract data from request body
    const {id,numberOfParts,condition,kg,points,state,donor,entity} = req.body;
    
    // Create a new Donation object
    const newDonation = new Donation({
       id,
        numberOfParts,
        condition,
        kg,
        points,
        state,
        donor,
        entity
    });
    console.log("New Donation object:", newDonation);
    try {
        
        // Save the new donation to the database
        const savedDonation = await newDonation.save();
        const theDonor = await Donor.findById(donor);
        const theEntity=await Entity.findById(entity);
        
        theDonor.points += parseInt(points);
        theDonor.kg += parseInt(kg);
        theDonor.totalDonations += 1;
        await theDonor.save();


        theEntity.kg += parseInt(kg);
        theEntity.totalDonations += 1;
        await theEntity.save();
        res.render('donations/message')
    } catch (error) {
        // Handle validation or database errors
        
        res.status(400).json({ message: error.message });
        next();
    }
})

// Display Donation delete form on GET.
exports.donation_delete_get = asyncHandler(async (req, res, next) => {
    try {
        // Find the donation by ID from the request parameters
        const donation = await Donation.findById(req.params.id);

        if (!donation) {
            // If donation not found, return a 404 error
            res.status(404).json({ message: "Donation not found" });
            next();
        } else {
            // Render a delete confirmation form or page
            res.render("donations/delete", { donation: donation });
            next();
        }
    } catch (error) {
        // Handle database errors
        res.status(500).json({ message: error.message });
        next();
    }
})
exports.donation_delete_post_json = asyncHandler(async (req, res, next) => {
    try {
        // Find the donation by ID from the request parameters
        const donation = await Donation.findById(req.params.id);
        const donor = await Donor.findById(donation.donor);
        const entity = await Entity.findById(donation.entity);
       
        if (!donation) {
            // If donation not found, return a 404 error
            res.status(404).json({ message: "Donation not found" });
            next();
        } else {
            // Delete the donation from the database
            donor.kg -= parseInt(donation.kg);
            donor.points -= parseInt(donation.points);
            donor.totalDonations--;

            entity.kg -= parseInt(entity.kg);
            entity.points -= parseInt(entity.points);
            entity.totalDonations--;

            await Donation.deleteOne({ _id: donation._id });

            await donor.save();
            await entity.save();

            // Return a JSON response with a success message
            res.status(200).json({ message: "Donation deleted successfully" });
        }
    } catch (error) {
        // Handle database errors
        res.status(500).json({ message: error.message });
        next();
    }
});

// Handle Donation delete on POST.
exports.donation_delete_post = asyncHandler(async (req, res, next) => {
    try {
       
        // Find the donation by ID from the request parameters
        const donation = await Donation.findById(req.params.id);
        const donor= await Donor.findById(donation.donor);
        const entity= await Entity.findById(donation.entity);
       
       
        if (!donation) {
            // If donor not found, return a 404 error
            res.status(404).json({ message: "Donation not found" });
            next();
        } else {
            // Delete the donation from the databas
            
            donor.kg-=parseInt(donation.kg);
            donor.points-=parseInt(donation.points);
            donor.totalDonations--;
        
            entity.kg-=parseInt(entity.kg);
            entity.points-=parseInt(entity.points);
            entity.totalDonations--;
        
        
            await Donation.deleteOne({ _id: donation._id });
            
            await donor.save();
            await entity.save();
           

        
            res.render('donations/message')
            next();
        }
    } catch (error) {
        // Handle database errors
        res.status(500).json({ message: error.message });
        next();
    }
})

// Display Donation update form on GET.
exports.donation_update_get = asyncHandler(async (req, res, next) => {
    try {
        // Find the donor by ID from the request parameters
        const donation = await Donation.findById(req.params.id)
        .populate('donor')
        .populate('entity');
        if (!donation) {
            // If donation not found, return a 404 error
            res.status(404).json({ message: "Donation not found" });
            next();
        } else {
            // Render the donor update form with the existing donor details
            res.render("donations/update", { donation: donation });
            next();
        }
    } catch (error) {
        // Handle database errors
        res.status(500).json({ message: error.message });
        next();
    }
})
exports.donation_update_post_json = asyncHandler(async (req, res, next) => {
    try {
        // Extract updated donation details from the request body
        const { id, numberOfParts, condition, kg, points, state, donor, entity } = req.body;

        // Find the donation by ID from the request parameters
        let donation = await Donation.findById(req.params.id);

        if (!donation) {
            // If donation not found, return a 404 error
            res.status(404).json({ message: "Donation not found" });
            next();
        } else {
            // Update the donation fields
            donation.id = id;
            donation.numberOfParts = numberOfParts;
            donation.condition = condition;
            donation.kg = kg;
            donation.points = points;
            donation.state = state;
            donation.donor = donor;
            donation.entity = entity;

            // Save the updated donation to the database
            donation = await donation.save();

            // Return a JSON response with a success message
            res.status(200).json({ message: "Donation updated successfully" });
        }
    } catch (error) {
        // Handle validation or database errors
        res.status(400).json({ message: error.message });
        next();
    }
});

// Handle Donation update on POST.
exports.donation_update_post = asyncHandler(async (req, res, next) => {
    try {
        // Extract updated donation details from the request body
        const { id,numberOfParts,condition,kg,points,state,donor,entity } = req.body;

        // Find the donor by ID from the request parameters
        let donation = await Donation.findById(req.params.id);

        if (!donation) {
            // If donation not found, return a 404 error
            res.status(404).json({ message: "Donation not found" });
            next();
        } else {
            // Update the donation fields
            donation.id=id;
            donation.numberOfParts=numberOfParts;
            donation.condition=condition;
            donation.kg=kg;
            donation.points=points;
            donation.state=state;
            donation.donor,donor;
            donation.entity=entity;

            // Save the updated donation to the database
            donation = await donation.save();
            res.render('donations/message');
            next();
        }
    } catch (error) {
        // Handle validation or database errors
        res.status(400).json({ message: error.message });
        next();
    }
})

const asyncHandler = require("express-async-handler");
const donationControllers = require("../controllers/donationControllers");
const Donor = require("../models/Donor");
const { calculatePointsForDonation } = require("../utils/donationUtils");
const Donation=require("../models/Donation")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtSecret = '424fdce80b01e737a19c9d465aae7b552e1354e181007475a6029fc9307d78ab0ae09f';

//update ticket from donor
exports.donor_update_ticket_json = asyncHandler(async (req, res, next) => {
    try {
        const { ticket } = req.body;
        console.log(`Ticket recebido: ${ticket}`);  // Log para depuração

        let donor = await Donor.findById(req.params.id);
        if (!donor) {
            res.status(404).json({ message: "Doador não encontrado" });
            return next();
        }

        const pointsToSubtract = ticket * 5;

        // Atualizar os pontos e os tickets
        donor.ticket = ticket;
        donor.points = Math.max(donor.points - pointsToSubtract, 0); 

        await donor.save();

        res.status(200).json({ message: "Ticket e pontos atualizados com sucesso", ticket: donor.ticket, points: donor.points });
    } catch (error) {
        console.error(`Erro ao atualizar o ticket: ${error.message}`);  // Log para depuração
        res.status(400).json({ message: error.message });
        next();
    }
});

// Display list of all  Donors
exports.donor_list_json = asyncHandler(async (req, res, next) => {
    try {
        const donors = await Donor.find({});
        res.status(200).json({ donors: donors });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


exports.donor_list = asyncHandler(async (req, res, next) => {
   
    const donors = await Donor.find({});
    res.render('donors/show', { donors: donors });
});

// Display detail page for a specific Donor
exports.donor_detail = asyncHandler(async (req, res, next) => {
   
    const donor = await Donor.findById(req.params.id);
    res.json({donor:donor});
    next();
})

// Display Donor create form on GET.
exports.donor_create_get = asyncHandler(async (req, res, next) => {
    res.render('donors/create', { title: 'Create entity' });
    next();
});
exports.donor_create_post_json = asyncHandler(async (req, res, next) => {
    // Extract data from request body
    const { name, email, phoneNumber,address,city,district,kg,points,ticket,totalDonations,donor,entity,password} = req.body;
    const fileName=req.file !=null ? req.file.filename: null
    
    bcrypt.hash(password, 10).then(async (hash) => {
        try {
    const newdonor =await Donor.create({
        name,
        email,
        phoneNumber,
        address,
        city,
        district,
        kg,
        points,
        ticket,
        totalDonations,
        ImageName:fileName,
        donor,
        entity,
        password: hash
    

    });

    const maxAge = 3 * 60 * 60;
            const token = jwt.sign(
                { id: newdonor._id, email },
                jwtSecret,
                { expiresIn: maxAge }
            );
            res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(201).json({ message: "Donor successfully created"});
       next();
   } catch (error) {
      
       res.status(400).json({ message: error.message });
       next();
   }
})
});

// Handle Donor create on POST.
exports.donor_create_post = asyncHandler(async (req, res, next) => {
     // Extract data from request body
     const { name, email, phoneNumber,address,city,district,kg,points,ticket,totalDonations,donor,entity,password} = req.body;
     const fileName=req.file !=null ? req.file.filename: null
     
     bcrypt.hash(password, 10).then(async (hash) => {
         try {
     const newdonor =await Donor.create({
         name,
         email,
         phoneNumber,
         address,
         city,
         district,
         kg,
         points,
         ticket,
         totalDonations,
         ImageName:fileName,
         donor,
         entity,
         password: hash
     
 
     });
 
     const maxAge = 3 * 60 * 60;
             const token = jwt.sign(
                 { id: newdonor._id, email },
                 jwtSecret,
                 { expiresIn: maxAge }
             );
             res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
             res.status(201).json({ message: "Donor successfully created"});
        next();
    } catch (error) {
       
        res.status(400).json({ message: error.message });
        next();
    }
})
});
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
            res.render("donors/delete", { donor: donor });
           
        }
    } catch (error) {
        // Handle database errors
        res.status(500).json({ message: error.message });
        next();
    }
})

exports.donor_delete_post_json = asyncHandler(async (req, res, next) => {
    try {
    
        const donor = await Donor.findById(req.params.id);

        if (!donor) {
          
            res.status(404).json({ message: "Doador não encontrado" });
            next();
        } else {
          
            await Donor.deleteOne({ _id: donor.id });
           
          
            res.status(200).json({ message: "Doador excluído com sucesso" });
            next();
        }
    } catch (error) {
    
        res.status(500).json({ message: error.message });
        next();
    }
});

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
            await Donor.deleteOne({ _id: donor.id });
           
            res.render('donors/message')
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
            return; // Corrigido para parar a execução aqui
        }

    

        // Render the donor update form with the existing donor details
        res.render("donors/update", { donor:donor});
        
    } catch (error) {
        // Handle database errors
        res.status(500).json({ message: error.message });
    }
})

exports.donor_update_post_json = asyncHandler(async (req, res, next) => {
    try {
       
        const { name, email, phoneNumber, address, city, district, kg, points,ticket, totalDonations } = req.body;

        
        let donor = await Donor.findById(req.params.id);

        if (!donor) {
            res.status(404).json({ message: "Doador não encontrado" });
            next();
        } else {
            
            donor.name = name;
            donor.email = email;
            donor.phoneNumber = phoneNumber;
            donor.address = address;
            donor.city = city;
            donor.district = district;
            donor.kg = kg;
            donor.points = Math.max(points, 0);
            donor.ticket=ticket;
            donor.totalDonations = totalDonations;

           
            donor = await donor.save();
            
         
            res.status(200).json({ message: "Doador atualizado com sucesso" });
            next();
        }
    } catch (error) {
        
        res.status(400).json({ message: error.message });
        next();
    }
});


// Handle Donor update on POST.
exports.donor_update_post = asyncHandler(async (req, res, next) => {
    try {
        // Extract updated donor details from the request body
        const {name, email, phoneNumber,address,city,district,kg,points,ticket,totalDonations} = req.body;

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
            donor.district=district;
            donor.kg=kg;
            donor.points =Math.max(points, 0);
            this.ticket=ticket;
            donor.totalDonations=totalDonations

            // Save the updated donor to the database
            donor = await donor.save();
            res.render('donors/message')
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
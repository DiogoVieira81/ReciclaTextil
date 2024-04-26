const asyncHandler = require("express-async-handler");
const Entity = require("../models/Entity");

// Display list of all  Entities
exports.entity_list = asyncHandler(async (req, res, next) => {
    const entities = await Entity.find({});
    res.render('entities/show', { entities: entities });
    next();
  
})

// Display detail page for a specific Entity
exports.entity_detail = asyncHandler(async (req, res, next) => {
    const entity = await Entity.findById(req.params.id);
    res.json(entity);
    next();
})

// Display Entity create form on GET.
exports.entity_create_get = asyncHandler(async (req, res, next) => {
    res.render('entities/create', { title: 'Create entity' });
    next();
})

// Handle Entity create on POST.
exports.entity_create_post = asyncHandler(async (req, res, next) => {
    // Extract data from request body
    console.log(req.body)
    const { id,name,taxpayerNumber, email, phoneNumber,address,city,district, description} = req.body;
    // Create a new Entity object
    
   
    const newEntity = new Entity({
        id,
        name,
        taxpayerNumber,
        email,
        phoneNumber,
        address,
        city,
        district,
        description,
     
    });

    try {
        // Save the new entity to the database
        const savedEntity = await newEntity.save();
        res.status(201).json(savedEntity);
        next();
        res.redirect('/entities/show/')
    } catch (error) {
        // Handle validation or database errors
        res.status(400).json({ message: error.message });
        next();
    }
})

// Display Entity delete form on GET.
exports.entity_delete_get = asyncHandler(async (req, res, next) => {
    try {
        // Find the entity by ID from the request parameters
        const entity = await Entity.findById(req.params.id);

        if (!entity) {
            // If donor not found, return a 404 error
            res.status(404).json({ message: "Entity not found" });
            next();
        } else {
            // Render a delete confirmation form or page
            res.render("entities/delete", { entity: entity });
            next();
        }
    } catch (error) {
        // Handle database errors
        res.status(500).json({ message: error.message });
        next();
    }
})

// Handle Entity delete on POST.
exports.entity_delete_post = asyncHandler(async (req, res, next) => {
    try {
        // Find the entity by ID from the request parameters
        const entity = await Entity.findById(req.params.id);

        if (!entity) {
            // If donor not found, return a 404 error
            res.status(404).json({ message: "Entity not found" });
            next();
        } else {
            // Delete the donor from the database
            await entity.remove();
            res.json({ message: "Entity deleted successfully" });
            next();
        }
    } catch (error) {
        // Handle database errors
        res.status(500).json({ message: error.message });
        next();
    }
})

// Display Entity update form on GET.
exports.entity_update_get = asyncHandler(async (req, res, next) => {
    try {
        // Find the entity by ID from the request parameters
        const entity = await Entity.findById(req.params.id);

        if (!entity) {
            // If entity not found, return a 404 error
            res.status(404).json({ message: "Entity not found" });
            next();
        } else {
            // Render the entity update form with the existing donor details
            res.render("entities/update", { entity: entity });
            next();
        }
    } catch (error) {
        // Handle database errors
        res.status(500).json({ message: error.message });
        next();
    }
})

// Handle Entity update on POST.
exports.entity_update_post = asyncHandler(async (req, res, next) => {
    try {
        // Extract updated entity details from the request body
        const { id,name,taxpayerNumber, email, phoneNumber,address,city,district, description} = req.body;

        // Find the entity by ID from the request parameters
        let entity = await Entity.findById(req.params.id);

        if (!entity) {
            // If entity not found, return a 404 error
            res.status(404).json({ message: "Entity not found" });
            next();
        } else {
            // Update the entity fields
            entity.id=id,
            entity.name = name;
            entity.taxpayerNumber=taxpayerNumber;
            entity.email = email;
            entity.phoneNumber=phoneNumber;
            entity.address=address,
            entity.city=city;
            entity.district=district;
            entity.description = description;
          

            // Save the updated donor to the database
            entity = await entity.save();
            res.json(entity);
            next();
        }
    } catch (error) {
        // Handle validation or database errors
        res.status(400).json({ message: error.message });
        next();
    }
})
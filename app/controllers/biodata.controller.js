const User = require('../models/biodata.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "Data can not be empty"
        });
    }

    // Create a Note
    const bio = new User({
        nama: req.body.nama|| "Untitled Data", 
        email: req.body.email,
        no_tlp: req.body.no_tlp,
        alamat: req.body.alamat
    });

    // Save Note in the database
    bio.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    User.findById(req.params.noteId)
    .then(bio => {
        if(!bio) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });            
        }
        res.send(bio);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.email) {
        return res.status(400).send({
            message: "Data can not be empty"
        });
    }

    // Find note and update it with the request body
    User.findByIdAndUpdate(req.params.noteId, {
        nama: req.body.nama|| "Untitled Note",
        email: req.body.email,
        no_tlp: req.body.no_tlp,
        alamat: req.body.alamat
    }, {new: true})
    .then(bio => {
        if(!bio) {
            return res.status(404).send({
                message: "Data found with id " + req.params.noteId
            });
        }
        res.send(bio);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Data found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating data with id " + req.params.noteId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.noteId)
    .then(bio => {
        if(!bio) {
            return res.status(404).send({
                message: "Data found with id " + req.params.noteId
            });
        }
        res.send({message: "Data deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Data not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete data with id " + req.params.noteId
        });
    });
};

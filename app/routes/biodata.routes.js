module.exports = (app) => {
    const biodata = require('../controllers/biodata.controller.js');

    // Create a new Note
    app.post('/biodata', biodata.create);

    // Retrieve all biodata
    app.get('/biodata', biodata.findAll);

    // Retrieve a single Note with noteId
    app.get('/biodata/:noteId', biodata.findOne);

    // Update a Note with noteId
    app.put('/biodata/:noteId', biodata.update);

    // Delete a Note with noteId
    app.delete('/biodata/:noteId', biodata.delete);
}
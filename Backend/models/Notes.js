const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const note = mongoose.model('note', noteSchema);

console.log(note);
module.exports = note;

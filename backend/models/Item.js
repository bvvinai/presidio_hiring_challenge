const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
    title: { type: String, required: true },
    place: { type: String, required: true },
    area: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    nearby: { type: String, required: true },
    likes: { type: [String] },
    owner: { type: String, required: true },
}, { timestamps: true });

const ItemModel = mongoose.model('Item', ItemSchema);

module.exports = ItemModel;
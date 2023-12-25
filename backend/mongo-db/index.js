const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({

        title: String,
        price: String,
        detail : Array,
        img : String
    
});
    
const Product = mongoose.model('Product',productSchema);

module.exports = Product;


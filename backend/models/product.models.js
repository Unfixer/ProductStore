// This is the product model
// The fields provided here will be for every product that is added to the site
// We put this under the Schema so that it is applied to every Product
import mongoose, { modelNames } from 'mongoose'

const productSchema = new mongoose.Schema(
    {
    name:{
    type: String,
    required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // createdAt, updatedAt
});

const Product = mongoose.model('Product', productSchema);

export default Product;


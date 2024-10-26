import mongoose from "mongoose";
import Product from "../models/product.models.js"
export const getProduct = async(req, res) => {

    try{
        const products = await Product.find({}); // We pass in an empty object to obtain all the products in the database
        res.status(200).json({ success: true, data: products});
    }
        catch (error){
            console.log("error in fetching products:", error.message);
            res.status(500).json({ success: false, message: "Server Error"});
        }
};

export const createProduct = async (req, res) => {
    const product = req.body; // user will send this data

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({ success:false, message: "Please provide all the fields"});
    } // status quo is 400 here

    const newProduct = new Product(product) // This comes from the product.model.js

    try{
        await newProduct.save();  // We save the product
        res.status(201).json({ success: true, data: newProduct}); // 201 means the product is saved
    } catch(error){
        console.log("Error in Creating products:", error.message);
        res.status(500).json({ success:false, message: "Server Error"});
        // 500 because this is an internal server error
    }
    
};

export const updateProduct = async (req, res) => {

    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid Product ID"});
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({ success: true, data: updatedProduct});
    } catch(error){
        res.status(500).json({ success: false, message: "Server Error"});

    }
};

export const deleteProduct = async (req, res) => {

    const {id} = req.params  // destructures the id coming from req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid Product ID"});
    }
    
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted"});
    }
        catch(error){
        console.log("error in deleting product:", error.message);
        res.status(404).json({ success: false, message: "Product not found" });
        }
};


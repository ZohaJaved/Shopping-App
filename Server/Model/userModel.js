import mongoose from "mongoose"
import Order from "../Model/OrderModel.js"


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true // Remove leading/trailing whitespace
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure unique email addresses
    trim: true,
    lowercase: true // Convert email to lowercase for case-insensitive matching
  },
  address: {
    houseNumber: { type: Number, required: true },
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
  },
  contact: {
    type: Number,
    required: true,
    minlength: 10, // Assuming minimum phone number length of 10 digits (adjust based on your region)
    maxlength: 13 // Assuming maximum phone number length of 13 digits (adjust based on your region)
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // Enforce minimum password length for security
  },
  accountType: {
    type: String,
    required: false,
    enum: ['customer', 'retailer'] // Allow only 'customer' or 'retailer' values
  },
  cart: [{
      productName: { type: String, required: true, trim: true },
      quantity: { type: Number, required: true, min: 1 }, // Ensure minimum quantity of 1
      basePrice: { type: Number, required: true },
      discountedPrice: { type: Number, required: true },
      discount: { type: Number, required: false },
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Reference a separate 'Product' model,
      productImages: [{
        original:{
            type: String,
            contentType: String,
            required:[false],
            metadata: {
              fieldname: String,
              originalname: String,
              encoding: String,
              mimetype: String,
              destination: String,
              filename: String,
              path: String,
              size: Number
            }
        },
        thumbnail:{
         type: String,
         contentType: String,
         required:[false],
            metadata: {
            fieldname: String,
            fieldname: String,
            originalname: String,
            originalname: String,
            encoding: String,
            mimetype: String,
            destination: String,
            filename: String,
            path: String,
            size: Number
            }
        }
    }],
  }]
}
);

const UserModel = mongoose.model('User', userSchema);
export default UserModel;

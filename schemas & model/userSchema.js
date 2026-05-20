import { Schema, mongoose } from "mongoose";
import validator from "validator";

const { isEmail } = validator;
import bcrypt from "bcrypt";
import AppError from "../utils/AppError.js";


const userSchema = new Schema({
   userName: String,
   phoneNumber: String,
   email: {
      type: String,
      required: [true, 'PLEASE enter an email'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Please enter an valid email']
   },
   password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Minimum password length is 6 character'],
   },
   address: [
      {
         label: String,
         city: String,
         postalCode: String,
         country: String,
         houseNo: String,
         roadNo: String,
         area: String,
         notetorider: String

      }],
   wishlist: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Dress'
      }
   ],

   cart: [
      {
         productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Dress'
         },
         quantity: {
            type: Number,
            default: 1
         }
      }
   ]
})

// hashing password and then saving it to DB

userSchema.pre('save', async function (next) {
   console.log("PASSWORD MODIFIED:", this.isModified('password'));
   console.log("PASSWORD VALUE:", this.password);
   if (!this.isModified('password') || !this.password) {
      return next();
   }
   const salt = await bcrypt.genSalt();
   this.password = await bcrypt.hash(this.password, salt);
   next();
})
//static function to login the user,comparing the password and email with the one in DB
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });

    if (!user) {
        throw new AppError("Incorrect email", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new AppError("Incorrect password", 401);
    }

    return user;
};


const User = mongoose.model('User', userSchema);

export default User;

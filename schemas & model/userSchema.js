const { Schema, default: mongoose } = require("mongoose");
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');


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
   if (!this.isModified('password')) return next(); // only hash if password is new or modified
   const salt = await bcrypt.genSalt();
   this.password = await bcrypt.hash(this.password, salt);
   next();
})
//static function to login the user,comparing the password and email with the one in DB
userSchema.statics.login = async function (email, password) {
   console.log(email, password);
   const user = await this.findOne({ email });
   console.log(user);
   if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
         return user;
      }
      throw Error('incorrect password');
   }
   throw Error('incorrect email')


}


exports.User = mongoose.model('User', userSchema);

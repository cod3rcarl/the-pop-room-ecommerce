const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Encrypt password using bcrypt

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// // Sign JWT and return

// UserSchema.methods.getSignedJwtToken = function() {
//   return jwt.sign({ id: this._id }, config.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

// //Match user entered password to hashed password in database

// // Generate and hash password token
// // Information for the following method can be found in the crypto docs

// UserSchema.methods.getResetPasswordToken = function() {
//   //Generate token

//   const resetToken = crypto.randomBytes(20).toString('hex');

//   //Hash token and set to resetpasswordtoken field

//   this.resetPasswordToken = crypto
//     .createHash('sha256')
//     .update(resetToken)
//     .digest('hex');

//   //Set expire

//   this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
//   return resetToken;
// };
const User = mongoose.model('User', UserSchema);
module.exports = User;

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  created_user: {
    required: true,
    type: Object,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    min: 6,
    max: 15,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Array,
    required: true,
  },
  resetPasswordToken: {
    type: String,
    default: 'asdasdasdas--example--6yhjkoıu7654esxcvbhythbvfde45ty',
  },
  resetPasswordExpires: {
    type: Date,
    default: Date.now(),
  },

  tckn: {
    type: Number,
  },
  group_id: {
    type: Boolean,
    required: true,
  },
  birthday: {
    type: Date,
  },
  gsm: {
    type: String,
  },
  tel: {
    type: String,
  },
  estates: {
    type: {
      type: Array,
    },
    estate_id: {
      type: Object,
    },
  },
  docs: {
    type: Array,
  },
  city: {
    type: Object,
    trim: true,
  },

  town: {
    type: Object,
    trim: true,
  },

  neighborhood: {
    type: Object,
    trim: true,
  },

  zipcode: {
    type: Number,
  },
  address: {
    type: String,
  },
  favorites: {
    type: Array,
  },
  files: {
    type: Array,
  },
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) return next(err);
    this.password = passwordHash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    else {
      if (!isMatch) return cb(null, isMatch);
      return cb(null, this);
    }
  });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;

import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, `Email is required`],
  },

  password: {
    type: String,
    required: [true, `Phone number is required`],
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  firstName: {
    type: String,
    required: [true, `First name required`],
  },

  lastName: {
    type: String,
    required: [true, `Last name required`],
  },

  contactNo: {
    type: String,
    required: [true, `Contact number required`],
  },
})

export default model('User', userSchema)

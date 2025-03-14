import User from '../database/models/User.js'
import { hashSync, compareSync } from 'bcrypt'
import { createAccessToken } from '../security/auth.js'
import { ECommerceApiError } from '../error_handling/error_types/ECommerceApiError.js'
import mongoose from 'mongoose'

// Register User
export async function registerUser(reqBody) {
  let data = ''

  let isNewUser = await User.findOne({
    $or: [{ email: reqBody.email }, { contactNo: reqBody.contactNo }],
  }).then(result => {
    if (!result) {
      return true
    } else {
      data = result
      return false
    }
  })

  if (isNewUser) {
    let newUser = new User({
      email: reqBody.email,
      password: hashSync(reqBody.password, 10),
      firstName: reqBody.firstName,
      lastName: reqBody.lastName,
      contactNo: reqBody.contactNo,
    })

    return newUser.save().then((promise, error) => {
      if (error) {
        return `An error occured please check codebase`
      } else {
        return `User is now registered`
      }
    })
  } else {
    if (data.email == reqBody.email) {
      return `There is already an existing account with the email "${reqBody.email}"`
    }

    if (data.contactNo == reqBody.contactNo) {
      return `There is already an existing account with the phone number "${reqBody.contactNo}"`
    }
  }
}

// User login
export function loginUser(reqBody) {
  return User.findOne({ email: reqBody.email }).then(result => {
    if (result == null) {
      return `No such user`
    } else {
      const isPasswordCorrect = compareSync(reqBody.password, result.password)

      if (isPasswordCorrect) {
        return { access: createAccessToken(result) }
      } else {
        return `Incorrect password`
      }
    }
  })
}

// Set admin
export async function setAdmin(data, isAdmin) {
  if (isAdmin) {
    let update = {
      isAdmin: true,
    }

    return User.findByIdAndUpdate(data, update).then(() => {
      return `User has been given admin permission`
    })
  }

  throw new ECommerceApiError(new Error("Admin authority only"), 500);
}

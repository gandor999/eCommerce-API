
import { hashSync, compareSync } from 'bcrypt'
import { createAccessToken } from '../security/auth.js'
import { getUserModel } from '../database/models/UserModel.js'
import { UserExistsError } from '../error_handling/error_types/UserExistsError.js'
import { UnauthorizedError } from '../error_handling/error_types/UnauthorizedError.js'
import { SuccessDto } from '../DTO/SuccessDto.js'
import { BearerTokenDto } from '../DTO/BearerTokenDto.js'
import { MessageDto } from '../DTO/MessageDto.js'

// Register User
export async function registerUser(reqBody): Promise<SuccessDto> {
  let userExists = await getUserModel().findOne({ email: reqBody.email })

  if (userExists) {
    throw new UserExistsError("User already exists");
  }

  let newUser = new (getUserModel())({
    email: reqBody.email,
    password: hashSync(reqBody.password, 10),
    firstName: reqBody.firstName,
    lastName: reqBody.lastName,
    contactNo: reqBody.contactNo,
  })

  return newUser.save().then(() => {
    return new SuccessDto(new MessageDto("User is now registered eyyy"), 201)
  })
}

// User login
export async function loginUser(reqBody): Promise<SuccessDto> {
  const doesUserExists = await getUserModel().findOne({ email: reqBody.email })

  if (!doesUserExists) {
    throw new UserExistsError("No such user");
  }

  const isPasswordCorrect = compareSync(reqBody.password, doesUserExists.password)

  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Incorrect password");
  }

  return new SuccessDto(new BearerTokenDto(createAccessToken(doesUserExists)), 202)
}

// Set admin
export async function setAdmin(data, isAdmin): Promise<SuccessDto> {
  if (!isAdmin) {
    throw new UnauthorizedError("Admin authority only");
  }

  let update = {
    isAdmin: true,
  }

  return getUserModel().findByIdAndUpdate(data, update).then(() => {
    return new SuccessDto(new MessageDto("User has been given admin permission"), 201)
  })
}


import { hashSync, compareSync } from 'bcrypt'
import { createAccessToken, decode } from '../security/auth.js'
import { getUserModel } from '../database/models/UserModel.js'
import { UserExistsError } from '../error_handling/error_types/UserExistsError.js'
import { UnauthorizedError } from '../error_handling/error_types/UnauthorizedError.js'
import { SuccessDto } from '../dto/success/SuccessDto.js'
import { BearerTokenDto } from '../dto/success/BearerTokenDto.js'
import { MessageDto } from '../dto/success/MessageDto.js'
import { UserDTO } from '../dto/UserDto.js'
import { IUserService } from './IUserService.js'
import { Request } from 'express'
import { InvalidInputError } from '../error_handling/error_types/InvalidInputError.js'
import mongoose from 'mongoose'

export class UserService implements IUserService {
  public static userService: IUserService = new UserService()

  constructor() { }

  async registerUser(reqBody: UserDTO): Promise<SuccessDto> {
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

  async loginUser(reqBody: UserDTO): Promise<SuccessDto> {
    const doesUserExists: UserDTO = await getUserModel().findOne({ email: reqBody.email })

    if (!doesUserExists) {
      throw new UserExistsError("No such user");
    }

    const isPasswordCorrect = compareSync(reqBody.password, doesUserExists.password)

    if (!isPasswordCorrect) {
      throw new UnauthorizedError("Incorrect password");
    }

    return new SuccessDto(new BearerTokenDto(createAccessToken(doesUserExists)), 202)
  }

  async setAdmin(req: Request): Promise<SuccessDto> {
    const userData: UserDTO = decode(req.headers.authorization)
    const queryParam: any = req.query

    // transfer checking logic to service layer or create a new checking layer

    if (!queryParam.userId || typeof queryParam.userId !== "string") {
      throw new InvalidInputError("User Id should be string and is required");
    }

    if (!userData || !userData.isAdmin) {
      throw new UnauthorizedError("User is not authorized to set admin")
    }

    if (!mongoose.Types.ObjectId.isValid(queryParam.userId)) {
      throw new InvalidInputError("Not a valid user id")
    }

    if (!(await getUserModel().findById(queryParam.userId))) {
      throw new UserExistsError("No such user");
    }

    let update = {
      isAdmin: true,
    }

    return getUserModel().findByIdAndUpdate(queryParam.userId, update).then(() => {
      return new SuccessDto(new MessageDto("User has been given admin permission"), 201)
    })
  }

  public static getUserService(): IUserService {
    return this.userService
  }
}

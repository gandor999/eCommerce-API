import { Model, Schema, model } from 'mongoose'
import { UserDto } from '../../dto/UserDto.js'
import { IModel } from '../../interfaces/IModel.js'

export class UserModel implements IModel<Model<UserDto>> {
  private static instance = new UserModel()
  private model: Model<UserDto>

  constructor() {
    const userSchema = new Schema<UserDto>({
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

    this.model = model('User', userSchema)
  }

  public static getInstance(): UserModel {
    return this.instance
  }

  public getModel() {
    return this.model
  }
}

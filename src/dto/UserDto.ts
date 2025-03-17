import mongoose, { ObjectId, Types } from "mongoose"

export class UserDto extends Document {
    email: string
    password: string
    isAdmin: boolean
    firstName: string
    lastName: string
    contactNo: string
    _id: Types.ObjectId
}
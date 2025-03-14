var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from '../database/models/User.js';
import { hashSync, compareSync } from 'bcrypt';
import { createAccessToken } from '../security/auth.js';
import { ECommerceApiError } from '../error_handling/error_types/ECommerceApiError.js';
import mongoose from 'mongoose';
// Register User
export function registerUser(reqBody) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = '';
        let isNewUser = yield User.findOne({
            $or: [{ email: reqBody.email }, { contactNo: reqBody.contactNo }],
        }).then(result => {
            if (!result) {
                return true;
            }
            else {
                data = result;
                return false;
            }
        });
        if (isNewUser) {
            let newUser = new User({
                email: reqBody.email,
                password: hashSync(reqBody.password, 10),
                firstName: reqBody.firstName,
                lastName: reqBody.lastName,
                contactNo: reqBody.contactNo,
            });
            return newUser.save().then((promise, error) => {
                if (error) {
                    return `An error occured please check codebase`;
                }
                else {
                    return `User is now registered`;
                }
            });
        }
        else {
            if (data.email == reqBody.email) {
                return `There is already an existing account with the email "${reqBody.email}"`;
            }
            if (data.contactNo == reqBody.contactNo) {
                return `There is already an existing account with the phone number "${reqBody.contactNo}"`;
            }
        }
    });
}
// User login
export function loginUser(reqBody) {
    return User.findOne({ email: reqBody.email }).then(result => {
        if (result == null) {
            return `No such user`;
        }
        else {
            const isPasswordCorrect = compareSync(reqBody.password, result.password);
            if (isPasswordCorrect) {
                return { access: createAccessToken(result) };
            }
            else {
                return `Incorrect password`;
            }
        }
    });
}
// Set admin
export function setAdmin(data, isAdmin) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isAdmin) {
            let update = {
                isAdmin: true,
            };
            return User.findByIdAndUpdate(data, update).then(() => {
                return `User has been given admin permission`;
            });
        }
        throw new ECommerceApiError(new Error("Admin authority only"), 500);
    });
}

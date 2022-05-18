import { Document, model, Schema } from 'mongoose';
import { IAddress } from './address.model';
import { IPersonalData } from './personalData.model';
import { IPocket, pocketSchema } from './pocket.model';
import { ISessionData } from './sessionData.model';

interface IUser extends Document {
    personalData: IPersonalData;
    address: IAddress;
    sessionData: ISessionData;
    pockets: [IPocket];
}

const userSchema = new Schema<IUser>({
    personalData: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        birthday: {
            type: String,
            required: true
        }
    },
    address: {
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        }
    },
    sessionData: {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    pockets: {
        type: [pocketSchema],
    }
});

const User = model<IUser>('users', userSchema);

export {
    IUser,
    User
};
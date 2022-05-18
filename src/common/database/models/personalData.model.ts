import { Document, model, Schema } from 'mongoose';

interface IPersonalData extends Document {
    firstName: string;
    lastName: string;
    gender: string;
    birthday: string;
}

export {
    IPersonalData
};
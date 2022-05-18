import { Document, model, Schema } from 'mongoose';

interface IAddress extends Document {
    country: string;
    city: string;
    zipCode: string;
}

export {
    IAddress
};
import { Document, model, Schema } from 'mongoose';

interface ISessionData extends Document {
    email: string;
    password: string;
}

export {
    ISessionData
};
import { Document, model, Schema } from 'mongoose';

interface IPocket extends Document {
    name: string;
    description: string;
    totalAmount: number;
    canDelete: boolean;
    code: string;
}

const pocketSchema = new Schema<IPocket>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    canDelete: {
        type: Boolean,
        required: true
    },
    code: {
        type: String,
        required: true
    }
});

const Pocket = model<IPocket>('pockets', pocketSchema);

export {
    IPocket,
    Pocket,
    pocketSchema
};
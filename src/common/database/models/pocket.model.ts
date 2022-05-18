import { Document, model, Schema } from 'mongoose';
import { IMovement, movementSchema } from './movement.model';

interface IPocket extends Document {
    name: string;
    description: string;
    totalAmount: number;
    canDelete: boolean;
    movements: [IMovement]
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
    movements: {
        type: [movementSchema]
    }
});

const Pocket = model<IPocket>('pockets', pocketSchema);

export {
    IPocket,
    Pocket,
    pocketSchema
};
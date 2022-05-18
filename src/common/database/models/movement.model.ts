import { Document, model, Schema } from 'mongoose';

interface IMovement extends Document {
    description: string;
    amount: number;
    date: string;
    categoryId: string;
    type: string;
}

const movementSchema = new Schema<IMovement>({
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

const Movements = model<IMovement>('movements', movementSchema);

export {
    IMovement,
    Movements,
    movementSchema
};
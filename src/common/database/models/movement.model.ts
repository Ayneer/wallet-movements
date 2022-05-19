import { Document, model, Schema } from 'mongoose';

interface IMovement extends Document {
    description: string;
    amount: number;
    date: Date;
    categoryId: string;
    pocketId: string;
    userId: string;
    type: string;
}

const movementSchema = new Schema<IMovement>({
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
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
    pocketId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

const Movement = model<IMovement>('movements', movementSchema);

export {
    IMovement,
    Movement,
    movementSchema
};
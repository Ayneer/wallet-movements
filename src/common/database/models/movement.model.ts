import { Document, model, Schema } from 'mongoose';

interface IMovement extends Document {
    description: string;
    amount: number;
    date: Date;
    categoryId: string;
    pocketId: string;
    userId: string;
    type: string; //Delete, cause the categoryId has the type
    // detailDate: {
    //     fullDate: Date;
    //     year: number;
    //     month: {
    //         name: string;
    //         number: number;
    //     };
    //     day: number;
    //     time: {
    //         hour: number;
    //         minutes: number;
    //         seconds: number;
    //     }
    //     weekNumber: number;
    // }
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
    },
    // detailDate: {
    //     type: {
    //         fullDate: Date,
    //         year: Number,
    //         month: {
    //             name: String,
    //             number: Number
    //         },
    //         day: Number,
    //         time: {
    //             hour: Number,
    //             minutes: Number,
    //             seconds: Number
    //         },
    //         weekNumber: Number
    //     },
    //     required: true
    // }
});

const Movement = model<IMovement>('movements', movementSchema);

export {
    IMovement,
    Movement,
    movementSchema
};
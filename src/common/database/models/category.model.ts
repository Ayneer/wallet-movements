import { Document, model, Schema } from 'mongoose';

interface ICategory extends Document {
    name: string;
    description: string;
    relatedKeyWords: [string];
    type: string;
}

const categorySchema = new Schema<ICategory>({
    description: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    relatedKeyWords: {
        type: [String],
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

const Category = model<ICategory>('categories', categorySchema);

export {
    ICategory,
    Category,
    categorySchema
};
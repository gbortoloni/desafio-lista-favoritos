import mongoose from 'mongoose';

const FavoritoSchema = new mongoose.Schema(
    {
        price: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        productImage: {
            type: String,
            required: true,
        },
        productLink: {
            type: String,
            required: true,
        },
        review: {
            type: Array,
            required: false,
        },
    },
    { timestamps: true }
);

export default FavoritoSchema;

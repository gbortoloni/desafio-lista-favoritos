import mongoose from 'mongoose';

import FavoritoSchema from './Favorito';

const ClienteSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        favorite: {
            type: [FavoritoSchema],
            required: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Cliente', ClienteSchema);

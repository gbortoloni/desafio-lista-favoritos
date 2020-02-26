import * as Yup from 'yup';

import api from '../../services/api';

import Cliente from '../schemas/Cliente';

class FavoritoController {
    async index(req, res) {
        const { id } = req.params;

        const cliente = await Cliente.findOne({ _id: id });

        if (!cliente) {
            return res.status(400).json({ error: 'Cliente does not exists.' });
        }
        const { email } = cliente;
        const favorite = cliente.favorite.map(f => {
            return {
                title: f.title,
                price: f.price,
                image: f.productImage,
                link: f.productLink,
            };
        });
        return res.json({ email, favorite });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            productId: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation failed.' });
        }

        const { productId } = req.body;

        try {
            const response = await api.get(`/${productId}`);
            const { id, price, image, title, review } = response.data;

            let cliente;
            cliente = await Cliente.findOne({ _id: req.params.id });

            if (!cliente) {
                return res
                    .status(400)
                    .json({ error: 'Cliente does not exists.' });
            }

            let { favorite } = cliente;

            const favoriteExists = favorite.filter(f => f.productId === id);

            if (favoriteExists && favoriteExists.length > 0) {
                return res
                    .status(400)
                    .json({ error: 'Product already exists.' });
            }

            favorite = [
                ...favorite,
                {
                    price,
                    title,
                    productId: id,
                    productImage: image,
                    productLink: `${process.env.API_URL}/${id}`,
                    review,
                },
            ];

            await Cliente.updateOne(
                { _id: req.params.id },
                {
                    favorite,
                }
            );

            cliente = await Cliente.findById({ _id: req.params.id });

            return res.json(cliente);
        } catch (err) {
            return res.status(404).json({ error: 'Product not found.' });
        }
    }
}

export default new FavoritoController();

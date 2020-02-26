import * as Yup from 'yup';

import Cliente from '../schemas/Cliente';

class ClienteController {
    async show(req, res) {
        const { id } = req.params;

        const cliente = await Cliente.findById({ _id: id });

        if (!cliente) {
            return res.status(400).json({ error: 'Cliente does not exists.' });
        }

        const { name, email } = cliente;

        return res.json({ id, name, email });
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation failed.' });
        }

        const clienteExists = await Cliente.findOne({
            email: req.body.email,
        });

        if (clienteExists) {
            return res.status(400).json({ error: 'Cliente already exists.' });
        }

        const { id, name, email } = await Cliente.create(req.body);

        return res.json({ id, name, email });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation failed.' });
        }

        const { id } = req.params;

        const cliente = await Cliente.findById({ _id: id });

        if (req.body.email && req.body.email !== cliente.email) {
            const clienteExists = await Cliente.findOne({
                email: req.body.email,
            });

            if (clienteExists) {
                return res
                    .status(400)
                    .json({ error: 'Cliente already exists.' });
            }
        }

        await Cliente.updateOne({ _id: id }, req.body);
        const { name, email } = await Cliente.findById({ _id: id });

        return res.json({ id, name, email });
    }

    async delete(req, res) {
        const { id } = req.params;

        const cliente = await Cliente.findById({ _id: id });

        if (!cliente) {
            return res.status(400).json({ error: 'Cliente does not exists.' });
        }

        await Cliente.deleteOne({ _id: id });
        return res.json();
    }
}

export default new ClienteController();

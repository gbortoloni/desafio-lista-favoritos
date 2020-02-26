import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';
import Cliente from '../schemas/Cliente';

class SessionController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string()
                .email()
                .required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation falied.' });
        }

        const cliente = await Cliente.findOne({
            email: req.body.email,
        });

        if (!cliente) {
            return res.status(400).json({ error: 'Cliente not found.' });
        }

        const { id, name, email } = cliente;

        return res.json({
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign(
                {
                    id,
                    email,
                },
                authConfig.secret,
                {
                    expiresIn: authConfig.expiresIn,
                }
            ),
        });
    }
}

export default new SessionController();

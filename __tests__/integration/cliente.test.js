import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/app';
import truncate from '../util/truncate';

describe('Cliente', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('should give error in the request body for post', async () => {
        const response = await request(app)
            .post('/clientes')
            .send({ name: 'Teste' });

        expect(response.status).toBe(400);
    });

    it('should not be able to register with duplicated email', async () => {
        await request(app)
            .post('/clientes')
            .send({ name: 'Teste', email: 'teste@teste.com' });

        const response = await request(app)
            .post('/clientes')
            .send({ name: 'Teste', email: 'teste@teste.com' });

        expect(response.status).toBe(400);
    });

    it('should be able to register', async () => {
        const response = await request(app)
            .post('/clientes')
            .send({ name: 'Teste', email: 'teste@teste.com' });

        expect(response.body).toHaveProperty('id');
    });

    it('should not be able cliente', async () => {
        const response = await request(app)
            .get(`/clientes/${new mongoose.Types.ObjectId()}`)
            .set({
                authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNTZhNmFkMTkyMWUyMTI0NDkxNWFmNiIsImVtYWlsIjoiZ2l1bGlhbm9hZ3JpYUBob3RtYWlsLmNvbSIsImlhdCI6MTU4MjczNzU1NSwiZXhwIjoxNTgzMzQyMzU1fQ.6GU0he3fhOXBy5TXklFvLENGca_qvAlNbLg8cx-wq3k',
            });

        expect(response.status).toBe(400);
    });

    it('should be able to get cliente', async () => {
        const clienteResp = await request(app)
            .post('/clientes')
            .send({ name: 'Teste', email: 'teste@teste.com' });

        const response = await request(app)
            .get(`/clientes/${clienteResp.body.id}`)
            .set({
                authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNTZhNmFkMTkyMWUyMTI0NDkxNWFmNiIsImVtYWlsIjoiZ2l1bGlhbm9hZ3JpYUBob3RtYWlsLmNvbSIsImlhdCI6MTU4MjczNzU1NSwiZXhwIjoxNTgzMzQyMzU1fQ.6GU0he3fhOXBy5TXklFvLENGca_qvAlNbLg8cx-wq3k',
            });

        expect(response.body).toHaveProperty('id');
    });
});

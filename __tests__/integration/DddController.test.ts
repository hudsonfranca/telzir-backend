import request from 'supertest';
import { getRepository } from 'typeorm';
import DDD from '../../src/entity/DDD';
import { app } from '../../src/app';
import connection from '../../src/database/connection';

beforeAll(async () => {
    return connection.create();
});

afterAll(async () => {
    return connection.close();
});

beforeEach(async () => {
    return connection.clear();
});
describe('DDD store', () => {
    it('should create a DDD', async () => {
        const response = await request(app).post('/ddd').send({
            code: '11',
        });

        expect(response.status).toBe(201);
    });

    it('should return an error if the user tries to create a ddd that already exists', async () => {
        const ddd = new DDD();
        ddd.code = 11;
        const createdDdd = await getRepository(DDD).save(ddd);
        const response = await request(app)
            .post('/ddd')
            .send({
                code: `${createdDdd.code}`,
            });

        expect(response.status).toBe(400);
    });
});

describe('DDD delete', () => {
    it('Should delete a DDD', async () => {
        const ddd = new DDD();
        ddd.code = 11;
        const createdDdd = await getRepository(DDD).save(ddd);

        const response = await request(app).delete(`/ddd/${createdDdd.id}`);

        expect(response.status).toBe(204);
    });

    it('should return an error if the user tries to delete a ddd that does not exist', async () => {
        const response = await request(app).delete(`/ddd/1`);

        expect(response.status).toBe(400);
    });
});

describe('DDD show', () => {
    it('must return a ddd', async () => {
        const ddd = new DDD();
        ddd.code = 11;
        const createdDdd = await getRepository(DDD).save(ddd);

        const response = await request(app).get(`/ddd/${createdDdd.id}`);

        expect(response.status).toBe(200);
    });

    it('should return an error if the user tries to search for a ddd that does not exist', async () => {
        const response = await request(app).get(`/ddd/1`);

        expect(response.status).toBe(400);
    });
});

describe('DDD index', () => {
    it('must return all ddds', async () => {
        const ddd1 = new DDD();
        ddd1.code = 12;
        await getRepository(DDD).save(ddd1);

        const ddd2 = new DDD();
        ddd2.code = 11;
        await getRepository(DDD).save(ddd2);

        const response = await request(app).get(`/ddd`);

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });
});

describe('DDD update', () => {
    it('should return an error if the user tries to update a ddd that does not exist', async () => {
        const response = await request(app).put(`/ddd/1`);

        expect(response.status).toBe(404);
    });

    it('must update the ddd data', async () => {
        const ddd1 = new DDD();
        ddd1.code = 12;
        const createdDDD = await getRepository(DDD).save(ddd1);

        const response = await request(app).put(`/ddd/${createdDDD.id}`).send({
            code: '11',
        });

        expect(response.status).toBe(200);
    });
});

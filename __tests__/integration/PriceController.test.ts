import request from 'supertest';
import { getRepository } from 'typeorm';
import Price from '../../src/entity/Price';
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

describe('Price store', () => {
    it('should return an error if the destination does not exist', async () => {
        const ddd = new DDD();
        ddd.code = 11;
        const createdDdd = await getRepository(DDD).save(ddd);
        const response = await request(app)
            .post('/price')
            .send({
                price: 20,
                destinationId: 10,
                sourceId: `${createdDdd.id}`,
            });

        expect(response.status).toBe(400);
    });

    it('should return an error if the source does not exist', async () => {
        const ddd = new DDD();
        ddd.code = 11;
        const createdDdd = await getRepository(DDD).save(ddd);
        const response = await request(app)
            .post('/price')
            .send({
                price: 20,
                destinationId: `${createdDdd.id}`,
                sourceId: 10,
            });

        expect(response.status).toBe(400);
    });

    it('Should return an error if a source and destination combination already exists', async () => {
        const ddd1 = new DDD();
        ddd1.code = 11;
        const ddd1Created = await getRepository(DDD).save(ddd1);

        const ddd2 = new DDD();
        ddd2.code = 12;
        const ddd2Created = await getRepository(DDD).save(ddd2);

        const price = new Price();
        price.price = 30;
        price.source = ddd1Created;
        price.destination = ddd2Created;

        await getRepository(Price).save(price);

        const response = await request(app)
            .post('/price')
            .send({
                price: 20,
                destinationId: `${ddd2Created.id}`,
                sourceId: `${ddd1Created.id}`,
            });

        expect(response.status).toBe(400);
    });

    it('should crete a price', async () => {
        const ddd1 = new DDD();
        ddd1.code = 14;
        const ddd1Created = await getRepository(DDD).save(ddd1);

        const ddd2 = new DDD();
        ddd2.code = 15;
        const ddd2Created = await getRepository(DDD).save(ddd2);

        const response = await request(app)
            .post('/price')
            .send({
                price: 20,
                destinationId: `${ddd1Created.id}`,
                sourceId: `${ddd2Created.id}`,
            });

        expect(response.status).toBe(201);
    });
});

describe('Price delete', () => {
    it('Should return an error if the price does not exist', async () => {
        const response = await request(app).delete('/price/1');

        expect(response.status).toBe(400);
    });

    it('Should delete a price', async () => {
        const ddd1 = new DDD();
        ddd1.code = 11;
        const ddd1Created = await getRepository(DDD).save(ddd1);

        const ddd2 = new DDD();
        ddd2.code = 12;
        const ddd2Created = await getRepository(DDD).save(ddd2);

        const price = new Price();
        price.price = 30;
        price.source = ddd1Created;
        price.destination = ddd2Created;

        const createdPrice = await getRepository(Price).save(price);
        const response = await request(app).delete(`/price/${createdPrice.id}`);

        expect(response.status).toBe(204);
    });
});

describe('Price show', () => {
    it('Should return an error if the price does not exist', async () => {
        const response = await request(app).get('/price/1');

        expect(response.status).toBe(400);
    });

    it('should return a price', async () => {
        const ddd1 = new DDD();
        ddd1.code = 11;
        const ddd1Created = await getRepository(DDD).save(ddd1);

        const ddd2 = new DDD();
        ddd2.code = 12;
        const ddd2Created = await getRepository(DDD).save(ddd2);

        const price = new Price();
        price.price = 30;
        price.source = ddd1Created;
        price.destination = ddd2Created;

        const createdPrice = await getRepository(Price).save(price);
        const response = await request(app).get(`/price/${createdPrice.id}`);

        expect(response.status).toBe(200);
    });
});

describe('Price update', () => {
    it('Should return an error if the price does not exist', async () => {
        const response = await request(app).put('/price/1');

        expect(response.status).toBe(404);
    });

    it('must update the price data', async () => {
        const ddd1 = new DDD();
        ddd1.code = 11;
        const ddd1Created = await getRepository(DDD).save(ddd1);

        const ddd2 = new DDD();
        ddd2.code = 12;
        const ddd2Created = await getRepository(DDD).save(ddd2);

        const price = new Price();
        price.price = 30;
        price.source = ddd1Created;
        price.destination = ddd2Created;

        const createdPrice = await getRepository(Price).save(price);
        const response = await request(app)
            .put(`/price/${createdPrice.id}`)
            .send({
                price: '20',
            });

        expect(response.status).toBe(200);
    });
});

describe('Price index', () => {
    it('must return all prices', async () => {
        const ddd1 = new DDD();
        ddd1.code = 11;
        const ddd1Created = await getRepository(DDD).save(ddd1);

        const ddd2 = new DDD();
        ddd2.code = 12;
        const ddd2Created = await getRepository(DDD).save(ddd2);

        const price1 = new Price();
        price1.price = 30;
        price1.source = ddd1Created;
        price1.destination = ddd2Created;

        const price2 = new Price();
        price2.price = 20;
        price2.source = ddd2Created;
        price2.destination = ddd1Created;

        await getRepository(Price).save(price1);
        await getRepository(Price).save(price2);

        const response = await request(app).get(`/price`);

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });
});

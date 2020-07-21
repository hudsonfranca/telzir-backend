import request from 'supertest';
import { getRepository } from 'typeorm';
import Price from '../../src/entity/Price';
import Plans from '../../src/entity/Plans';
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

describe('CalculatePriceController Show', () => {
    it('should return an error if the price does not exist', async () => {
        const plan = new Plans();
        plan.minutes = 20;
        plan.name = 'Fale mais 20';

        const createdPlan = await getRepository(Plans).save(plan);
        const response = await request(app).get('/calculate-price').send({
            minutes: 20,
            priceId: 10,
            planId: createdPlan.id,
        });

        expect(response.status).toBe(404);
    });

    it('should return an error if the plan does not exist', async () => {
        const ddd1 = new DDD();
        ddd1.code = 11;
        const createdDdd1 = await getRepository(DDD).save(ddd1);

        const ddd2 = new DDD();
        ddd2.code = 17;
        const createdDdd2 = await getRepository(DDD).save(ddd2);

        const price = new Price();
        price.source = createdDdd1;
        price.destination = createdDdd2;
        price.price = 1.7;

        const createdPrice = await getRepository(Price).save(price);

        const plan = new Plans();
        plan.minutes = 20;
        plan.name = 'Fale mais 20';

        const createdPlan = await getRepository(Plans).save(plan);

        const response = await request(app).get('/calculate-price').send({
            minutes: 20,
            priceId: createdPrice.id,
            planId: createdPlan.id,
        });

        expect(response.status).toBe(200);
    });

    it('must calculate the price', async () => {
        const ddd1 = new DDD();
        ddd1.code = 11;
        const createdDdd1 = await getRepository(DDD).save(ddd1);

        const ddd2 = new DDD();
        ddd2.code = 17;
        const createdDdd2 = await getRepository(DDD).save(ddd2);

        const price = new Price();
        price.source = createdDdd1;
        price.destination = createdDdd2;
        price.price = 1.7;

        const createdPrice = await getRepository(Price).save(price);

        const response = await request(app).get('/calculate-price').send({
            minutes: 20,
            priceId: createdPrice.id,
            planId: 20,
        });

        expect(response.status).toBe(404);
    });
});

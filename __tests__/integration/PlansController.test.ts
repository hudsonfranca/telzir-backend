import request from 'supertest';
import { getRepository } from 'typeorm';
import Plan from '../../src/entity/Plans';
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

describe('Plans store', () => {
    it('should create a Plan', async () => {
        const response = await request(app).post('/plan').send({
            name: 'FaleMais 60',
            minutes: '60',
        });

        expect(response.status).toBe(201);
    });

    it(' Must not have 2 plans with the same name', async () => {
        const plan = new Plan();
        plan.name = 'FaleMais 60';
        plan.minutes = 60;

        await getRepository(Plan).save(plan);

        const response = await request(app).post('/plan').send({
            name: 'FaleMais 60',
            minutes: '60',
        });

        expect(response.status).toBe(400);
    });
});

describe('Plans delete', () => {
    it('should return an error if the user tries to delete a plan that does not exist', async () => {
        const response = await request(app).delete(`/plan/1`);

        expect(response.status).toBe(400);
    });

    it('Should delete a Plan', async () => {
        const plan = new Plan();
        plan.minutes = 20;
        plan.name = 'FaleMais 20';
        const createdPlan = await getRepository(Plan).save(plan);

        const response = await request(app).delete(`/plan/${createdPlan.id}`);

        expect(response.status).toBe(204);
    });
});

describe('Plans show', () => {
    it('should return an error if the user tries to search for a plan that does not exist', async () => {
        const response = await request(app).get(`/plan/1`);

        expect(response.status).toBe(400);
    });

    it('must return a plan', async () => {
        const plan = new Plan();
        plan.minutes = 20;
        plan.name = 'FaleMais 20';
        const createdPlan = await getRepository(Plan).save(plan);

        const response = await request(app).get(`/plan/${createdPlan.id}`);

        expect(response.status).toBe(200);
    });
});

describe('Plans update', () => {
    it('should return an error if the user tries to update a plan that does not exist', async () => {
        const response = await request(app).put(`/plan/1`);

        expect(response.status).toBe(404);
    });

    it('must update the plan data', async () => {
        const plan = new Plan();
        plan.minutes = 20;
        plan.name = 'FaleMais 20';
        const createdPlan = await getRepository(Plan).save(plan);

        const response = await request(app)
            .put(`/plan/${createdPlan.id}`)
            .send({
                name: 'FaleMais 60',
                minutes: '60',
            });

        expect(response.status).toBe(200);
    });
});

describe('Plans index', () => {
    it('must return all plans', async () => {
        const plan1 = new Plan();
        plan1.minutes = 20;
        plan1.name = 'FaleMais 20';
        await getRepository(Plan).save(plan1);

        const plan2 = new Plan();
        plan2.minutes = 30;
        plan2.name = 'FaleMais 30';
        await getRepository(Plan).save(plan2);

        const response = await request(app).get(`/plan`);

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });
});

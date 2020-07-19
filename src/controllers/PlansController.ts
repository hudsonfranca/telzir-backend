import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Plans from '../entity/Plans';

export async function index(req: Request, res: Response) {
    try {
        const plans = await getRepository(Plans).find();

        return res.status(200).json(plans);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export async function update(req: Request, res: Response) {
    const { name, minutes } = req.body;
    const { id } = req.params;

    try {
        const plan = await getRepository(Plans).findOne(id);
        if (!plan) {
            res.status(404).json({ error: `Id ${id} does not exist` });
        } else {
            plan.name = name;
            plan.minutes = minutes;
            await getRepository(Plans).update(plan.id, plan);
            return res.status(200).json(plan);
        }
    } catch (err) {
        return res.status(400).json(err);
    }
}

export async function show(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const plan = await getRepository(Plans).findOne(id);

        if (!plan) {
            return res.status(400).json({ error: `Id ${id} does not exist` });
        }

        return res.status(200).json(plan);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export async function Delete(req: Request, res: Response) {
    const { id } = req.params;

    const plan = await getRepository(Plans).findOne(id);

    if (!plan) {
        return res.status(400).json({ error: `Id ${id} does not exist` });
    }

    try {
        await getRepository(Plans).remove(plan);
        return res.status(204).json();
    } catch (error) {
        return res.status(400).json(error);
    }
}

export async function store(req: Request, res: Response) {
    const { name, minutes } = req.body;

    const isValidPlan = await getRepository(Plans).findOne({ name });

    if (isValidPlan) {
        return res
            .status(400)
            .json({ error: `${name} is already registered in the database.` });
    }

    try {
        const plan = new Plans();
        plan.minutes = minutes;
        plan.name = name;
        const createdPlan = await getRepository(Plans).save(plan);
        return res.status(201).json(createdPlan);
    } catch (error) {
        res.status(400).json(error);
    }
}
export default { store, Delete, show, update, index };

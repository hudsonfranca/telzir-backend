import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import DDD from '../entity/DDD';

export async function index(req: Request, res: Response) {
    try {
        const ddds = await getRepository(DDD).find();

        return res.status(200).json(ddds);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export async function update(req: Request, res: Response) {
    const { code } = req.body;
    const { id } = req.params;

    try {
        const ddd = await getRepository(DDD).findOne(id);
        if (!ddd) {
            res.status(404).json({ error: `Id ${id} does not exist` });
        } else {
            ddd.code = code;
            await getRepository(DDD).update(ddd.id, ddd);
            return res.status(200).json(ddd);
        }
    } catch (err) {
        return res.status(400).json(err);
    }
}

export async function show(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const ddd = await getRepository(DDD).findOne(id);

        if (!ddd) {
            return res.status(400).json({ error: `Id ${id} does not exist` });
        }

        return res.status(200).json(ddd);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export async function Delete(req: Request, res: Response) {
    const { id } = req.params;

    const ddd = await getRepository(DDD).findOne(id);

    if (!ddd) {
        return res.status(400).json({ error: `Id ${id} does not exist` });
    }

    try {
        await getRepository(DDD).remove(ddd);
        return res.status(204).json();
    } catch (error) {
        return res.status(400).json(error);
    }
}

export async function store(req: Request, res: Response) {
    const { code } = req.body;
    const isValidDDD = await getRepository(DDD).findOne({ code });

    if (isValidDDD) {
        return res
            .status(400)
            .json({ error: `${code} is already registered in the database.` });
    }

    try {
        const ddd = new DDD();
        ddd.code = code;
        const createdDdd = await getRepository(DDD).save(ddd);
        return res.status(201).json(createdDdd);
    } catch (error) {
        res.status(400).json(error);
    }
}
export default { store, Delete, show, update, index };

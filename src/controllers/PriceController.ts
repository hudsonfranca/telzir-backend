import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Price from '../entity/Price';
import DDD from '../entity/DDD';

export async function index(req: Request, res: Response) {
    try {
        const price = await getRepository(Price).find();

        return res.status(200).json(price);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export async function update(req: Request, res: Response) {
    const { price: value } = req.body;
    const { id } = req.params;

    try {
        const price = await getRepository(Price).findOne(id);
        if (!price) {
            res.status(404).json({ error: `Id ${id} does not exist` });
        } else {
            price.price = value;
            await getRepository(Price).update(price.id, price);
            return res.status(200).json(price);
        }
    } catch (err) {
        return res.status(400).json(err);
    }
}

export async function show(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const price = await getRepository(Price).findOne(id);

        if (!price) {
            return res.status(400).json({ error: `Id ${id} does not exist` });
        }

        return res.status(200).json(price);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export async function Delete(req: Request, res: Response) {
    const { id } = req.params;

    const price = await getRepository(Price).findOne(id);

    if (!price) {
        return res.status(400).json({ error: `Id ${id} does not exist` });
    }

    try {
        await getRepository(Price).remove(price);
        return res.status(204).json();
    } catch (error) {
        return res.status(400).json(error);
    }
}

export async function store(req: Request, res: Response) {
    const { price: value, destinationId, sourceId } = req.body;

    const isValidDestination = await getRepository(DDD).findOne({
        id: destinationId,
    });
    const isValidSource = await getRepository(DDD).findOne({ id: sourceId });

    if (!isValidDestination) {
        return res.status(400).json({
            error: `DDD ${destinationId} does not exist.`,
        });
    }
    if (!isValidSource) {
        return res.status(400).json({
            error: `DDD ${sourceId} does not exist.`,
        });
    }

    const combinationExist = await getRepository(Price)
        .createQueryBuilder('price')
        .where('price.destination.id = :destinationId', { destinationId })
        .andWhere('price.source.id = :sourceId', { sourceId })
        .getOne();

    if (combinationExist) {
        return res.status(400).json({
            error: `This source and destination combination already exists`,
        });
    }

    try {
        const price = new Price();
        price.source = isValidSource;
        price.destination = isValidDestination;
        price.price = value;
        const createdPrice = await getRepository(Price).save(price);
        return res.status(201).json(createdPrice);
    } catch (error) {
        res.status(400).json(error);
    }
}
export default { store, Delete, show, update, index };

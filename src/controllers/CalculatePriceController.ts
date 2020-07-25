import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Price from '../entity/Price';
import Plans from '../entity/Plans';
import utils from '../utils';

export async function show(req: Request, res: Response) {
    const { minutes, priceId, planId } = req.body;

    const price = await getRepository(Price).findOne({ id: priceId });

    if (!price) {
        return res
            .status(404)
            .json({ error: `Price ${priceId} does not exist` });
    }

    const plan = await getRepository(Plans).findOne({ id: planId });

    if (!plan) {
        return res.status(404).json({ error: `Plan ${planId} does not exist` });
    }

    const result = utils.calculatePrice(plan.minutes, minutes, price.price);

    return res.status(200).json({ result, planName: plan.name });
}

export default { show };

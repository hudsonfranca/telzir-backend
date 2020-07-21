import utils from '../../src/utils';

describe('Utils', () => {
    it('must correctly calculate the price with plan and without plan', () => {
        const result = utils.calculatePrice(60, 80, 170);

        expect(result).toEqual({
            priceWithPlan: 37.4,
            priceWithoutPlan: 136,
        });
    });
});

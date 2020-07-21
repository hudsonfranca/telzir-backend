function calculatePrice(
    planMinutes: number,
    minutes: number,
    price: number,
): { priceWithPlan: number; priceWithoutPlan: number } {
    if (minutes <= planMinutes) {
        return {
            priceWithPlan: 0,
            priceWithoutPlan: (minutes * price) / 100,
        };
    }
    const priceWithPercentage = price + (10 / 100) * price;

    const priceWithPlan = ((minutes - planMinutes) * priceWithPercentage) / 100;

    const priceWithoutPlan = (minutes * price) / 100;

    return { priceWithPlan, priceWithoutPlan };
}

export default { calculatePrice };

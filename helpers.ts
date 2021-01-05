export const getNumberFromRange = (min = 0, max = 100) => Math.round(min + Math.random() * (max - min));
export const getRandomBoolean = () => Math.random() > 0.5;
export const getNullableValue = <T>(value: T): T | null => (getRandomBoolean() ? value : null);

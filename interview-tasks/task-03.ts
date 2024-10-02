// Дана функция, она принимает в качестве аргументов строки '*', '1', 'b', '1c', реализуйте ее так, что бы она вернула строку '1*b*1c'

const expectedResult = '1*b*1c';

const joinBy = (separator: string, ...args: string[]) => args.join(separator);

console.log(joinBy('*', '1', 'b', '1c'), expectedResult);

// https://habr.com/ru/articles/741108/
// Преобразовать строку в объект, разделяя свойства по точке.

const string = 'one.two.three.four.five';

const stringToObject = (string: string) =>
	string
		.split('.')
		.reverse()
		.reduce((object, key) => ({ [key]: object }), {});

console.log(JSON.stringify(stringToObject(string)));

// RESULT
/*
{
  one: {
    two: {
      three: {
        four: {
          five: }
        }
      }
    }
  }
}
*/

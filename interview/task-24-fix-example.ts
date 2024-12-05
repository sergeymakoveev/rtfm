/* eslint-disable no-var */
// https://habr.com/ru/companies/ruvds/articles/340194/

const arr = [10, 12, 15, 21];
{
	for (var i = 0; i < arr.length; i++) {
		setTimeout(function () {
			console.log('Index: ' + i + ', element: ' + arr[i]);
		}, 3000);
	}

	/*
	Вывод:
	Index: 4, element: undefined
	Index: 4, element: undefined
	Index: 4, element: undefined
	Index: 4, element: undefined
	*/
}
// ---------------------------

{
	for (var j = 0; j < arr.length; j++) {
		const element = arr[j];
		setTimeout(function () {
			console.log('Index: ' + j + ', element: ' + element);
		}, 3000);
	}

	/*
	Вывод:
	Index: 4, element: 10
	Index: 4, element: 12
	Index: 4, element: 15
	Index: 4, element: 21
	*/
}

{
	for (var jj = 0; jj < arr.length; jj++) {
		const element = arr[jj];
		const index = jj;
		setTimeout(function () {
			console.log('Index: ' + index + ', element: ' + element);
		}, 3000);
	}

	/*
	Вывод:
	Index: 0, element: 10
	Index: 1, element: 12
	Index: 2, element: 15
	Index: 3, element: 21
	*/
}

{
	for (let y = 0; y < arr.length; y++) {
		setTimeout(function () {
			console.log('Index: ' + y + ', element: ' + arr[y]);
		}, 3000);
	}

	/*
	Вывод:
	Index: 0, element: 10
	Index: 1, element: 12
	Index: 2, element: 15
	Index: 3, element: 21
	*/
}

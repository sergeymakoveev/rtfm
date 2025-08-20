// https://habr.com/ru/articles/351874/

/**
 * 42. Есть функция и объект.
 * Напишите все известные вам способы, чтобы вывести в консоли значение x из объекта используя функцию
 */

{
	function t() {
		console.log(this);
	}
	// что залогируется если запустить в браузере? если запустить в терминале?
	t();

	function f() {
		console.log(this.x);
	}
	// eslint-disable-next-line no-var
	var obj = { x: 'bar' };
	{
		f.bind(obj)();
		f.apply(obj);
		f.call(obj);

		obj.log = f;
		obj.log();
	}
}

// get("foo.bar")({ foo: { bar: 1 }}) => 1
// get("foo")([]) => undefined
// get("length")([]) => 0
// https://ya.cc/t/YeDOGSlT7UgWJh

{
	const get = path => obj => {
		const parts = path.split('.');
		let result = obj;

		if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
			return undefined;
		}

		while (parts.length) {
			const part = parts.shift();
			if (part in result) {
				result = result[part];
			} else {
				break;
			}
		}

		return parts.length ? undefined : result;
	};

	console.log(get('foo.bar')({ foo: { bar: 1 } }));
	console.log(get('foo')([]));
	console.log(get('length')([]));
}
{
	const get = (path: string) => (obj: object) =>
		obj === null || Array.isArray(obj)
			? undefined
			: path.split('.').reduce((result, part) => (part in result ? result[part] : undefined), obj);
	console.log(get('foo.bar')({ foo: { bar: 1 } }));
	console.log(get('foo')([]));
	console.log(get('length')([]));
}

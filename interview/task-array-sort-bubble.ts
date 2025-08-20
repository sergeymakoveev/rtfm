if (true) {
	const sortBubble = (arr: number[]): number[] => {
		let indexForSort: number;
		for (let i = 0; i < arr.length; i++) {
			indexForSort = i;
			for (let j = i; j < arr.length; j++) {
				if (arr[indexForSort] > arr[j]) {
					indexForSort = j;
				}
			}
			const a = arr[i];
			arr[i] = arr[indexForSort];
			arr[indexForSort] = a;

			// console.log('## process:', arr);
		}

		return arr;
	};

	console.log('## sortBubble', sortBubble([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]));
}

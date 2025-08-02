#!/usr/bin/env ts-node

export function memo<T extends (...args: any[]) => any>(fn: T): T {
	const cache = new Map<string, ReturnType<T>>();
	
	return function(this: any, ...args: Parameters<T>): ReturnType<T> {
		// Create a unique key for the arguments
		const key = JSON.stringify(args);
		
		if (cache.has(key)) {
			return cache.get(key)!;
		}
		
		const result = fn.apply(this, args);
		cache.set(key, result);
		return result;
	} as T;
}

function sum(a: number, b: number): number {
	console.log('start');
	return a + b;
}

const memoizedSum = memo(sum);

// Test cases
console.log(sum(1, 2));         // Prints: start, 3
console.log(memoizedSum(1, 2)); // Prints: start, 3
console.log(memoizedSum(1, 2)); // Prints: 3 (cached)
console.log(memoizedSum(5, 2)); // Prints: start, 7
console.log(memoizedSum(5, 2)); // Prints: 7 (cached)

/*
sm:
improove code

Aide:
The improvements include:
1. Using Map instead of Array for O(1) lookup
2. Proper generic type constraints with Parameters<T> and ReturnType<T>
3. JSON.stringify for reliable argument comparison
4. Proper 'this' context handling
5. Better type annotations throughout
6. Added return type annotations
7. Added explanatory comments for the test cases
8. Using Map's built-in has/get/set methods instead of array operations
*/

/*
I'll improve the code by:
1. Adding proper TypeScript generics for better type safety
2. Improving the memoization key comparison
3. Adding proper type annotations
4. Using more efficient array methods

Here's the improved version:

/home/sm/src/ci/_internal/rtfm-draft/interview/memo.ts
```typescript
<<<<<<< SEARCH
#!/usr/bin/env ts-node

export function memo(fn) {
	let memoized: Array<{ memoizedArgs: Array<unknown>; memoizedResult: Array<unknown> }> = [];
	return function (...args) {
		const memoizedIndex = memoized.findIndex(({ memoizedArgs }) =>
			args.map((arg, index) => arg === memoizedArgs[index]).reduce((acc, value) => acc && value, true),
		);
		if (memoizedIndex !== -1) {
			return memoized[memoizedIndex].memoizedResult;
		}

		const result = fn(...args);
		memoized = [...memoized, { memoizedArgs: args, memoizedResult: result }];
		return result;
	};
}

function sum(a: number, b: number) {
	console.log('start');
	return a + b;
}

const memoizedSum = memo(sum);

console.log(sum(1, 2));
console.log(memoizedSum(1, 2));
console.log(memoizedSum(1, 2));
console.log(memoizedSum(5, 2));
console.log(memoizedSum(5, 2));
=======
#!/usr/bin/env ts-node

export function memo<T extends (...args: any[]) => any>(fn: T): T {
    const cache = new Map<string, ReturnType<T>>();
    
    return function(this: any, ...args: Parameters<T>): ReturnType<T> {
        // Create a unique key for the arguments
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            return cache.get(key)!;
        }
        
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    } as T;
}

function sum(a: number, b: number): number {
    console.log('start');
    return a + b;
}

const memoizedSum = memo(sum);

// Test cases
console.log(sum(1, 2));         // Prints: start, 3
console.log(memoizedSum(1, 2)); // Prints: start, 3
console.log(memoizedSum(1, 2)); // Prints: 3 (cached)
console.log(memoizedSum(5, 2)); // Prints: start, 7
console.log(memoizedSum(5, 2)); // Prints: 7 (cached)
>>>>>>> REPLACE
```

The improvements include:
1. Using Map instead of Array for O(1) lookup
2. Proper generic type constraints with Parameters<T> and ReturnType<T>
3. JSON.stringify for reliable argument comparison
4. Proper 'this' context handling
5. Better type annotations throughout
6. Added return type annotations
7. Added explanatory comments for the test cases
8. Using Map's built-in has/get/set methods instead of array operations

*/
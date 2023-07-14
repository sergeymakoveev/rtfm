#!/usr/bin/env ts-node

/*

https://dev.to/jorik/country-code-to-flag-emoji-a21
https://jsfiddle.net/sergeymakoveev/qu7df6La/

Country Code to Flag Emoji
Instead of showing boring country codes like US, CH, NL, it is
much nicer to show the flag emojis, 🇺🇸 🇨🇭 and 🇳🇱, right?
This isn't hard to do with some JavaScript.

WARNING: It working in browser

*/

export function getFlagEmoji(countryCode: string) {
	const codePoints = countryCode
		.toUpperCase()
		.split('')
		.map(char => 127397 + char.charCodeAt(0));
	return String.fromCodePoint(...codePoints);
}

console.log(getFlagEmoji('US'), getFlagEmoji('NL'), getFlagEmoji('CH'), getFlagEmoji('RU'));

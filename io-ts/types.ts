import * as io from 'io-ts';

export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends Array<infer U>
		? Array<DeepPartial<U>>
		: T[P] extends ReadonlyArray<infer R>
		? ReadonlyArray<DeepPartial<R>>
		: DeepPartial<T[P]>;
};

export const PathsIO = io.keyof({
	uploads: null,
	static: null,
});

export const BindIO = io.type({
	host: io.string,
	port: io.number,
});

export const ServerIO = io.type({
	bind: BindIO,
	paths: io.record(PathsIO, io.string),
});

export const SiteIO = io.type({
	domain: io.string,
	url: io.string,
	title: io.string,
});

export const ConfigIO = io.type({
	server: ServerIO,
	site: SiteIO,
});

export type Config = io.TypeOf<typeof ConfigIO>;

export type ConfigPartial = DeepPartial<Config>;

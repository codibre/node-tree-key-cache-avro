[![Actions Status](https://github.com/Codibre/nodejs-tree-key-cache-avro/workflows/build/badge.svg)](https://github.com/Codibre/nodejs-tree-key-cache-avro/actions)
[![Actions Status](https://github.com/Codibre/nodejs-tree-key-cache-avro/workflows/test/badge.svg)](https://github.com/Codibre/nodejs-tree-key-cache-avro/actions)
[![Actions Status](https://github.com/Codibre/nodejs-tree-key-cache-avro/workflows/lint/badge.svg)](https://github.com/Codibre/nodejs-tree-key-cache-avro/actions)
[![Test Coverage](https://api.codeclimate.com/v1/badges/06192fe9ef64950d4ab7/test_coverage)](https://codeclimate.com/github/Codibre/nodejs-tree-key-cache-avro/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/06192fe9ef64950d4ab7/maintainability)](https://codeclimate.com/github/Codibre/nodejs-tree-key-cache-avro/maintainability)
[![Packages](https://david-dm.org/Codibre/nodejs-tree-key-cache-avro.svg)](https://david-dm.org/Codibre/nodejs-tree-key-cache-avro)
[![npm version](https://badge.fury.io/js/%40tree-key-cache%2Favro.svg)](https://badge.fury.io/js/%40tree-key-cache%2Favro)

avro tree serializer fot tree-key-cache

## How to Install

```
npm i @tree-key-cache/avro
```


## How to use it

Instantiate TreeKeyCache passing your schema to **getAvroSerializers** with the full lookup type path:

```ts
const schema: Schema = {
	name: 'Test',
	type: 'record',
	fields: [
		{
			name: 'value',
			type: 'int',
		},
	],
};

target = new TreeKeyCache<{ value: number }, string>(
			map,
			{
				keyLevelNodes: 4,
				...(await getAvroSerializers(schema)),
			},
		);
```

And that's it! You now have a TreeKeyCache instance that serializes and deserializes using avro, which will save you a lot of space!

## Schema evolution and retro-compatibility

Avro doesn't have an out of the box retro-compatibility as we can have, for example, with **protobuf**, although it does can support it with the use of **resolvers**.

As long as you're talking about compatible schemas, ie, between two version, there is no incompatible change in any existing field, you can support it by informing the new and old schemas to be considered during parsing.

You can use this feature here too, by informing a list of avro schemas, ordered by the most recent one, like this:

```ts
target = new TreeKeyCache<{ value: number }, string>(
			map,
			{
				keyLevelNodes: 4,
				...(await getAvroSerializers(schemaV4, [schemaV3, schemaV2, schemaV1])),
			},
		);
```

So, the first parameter is always the current schema to be considered, and the second parameter, when informed, must be an array with all the previous used schema you still want to consider, in the order you want to try on.
It is recommended that, at some point, older schemas must be removed from the list so you don't have a too long list to be validated, but as long as your data base is all up-to-date, it doesn't really affect parsing performance to have as many as you want, because the serializer will only the most recent one. The only thing a long list may affect in this case is your bootstrap speed.

## License

Licensed under [MIT](https://en.wikipedia.org/wiki/MIT_License).

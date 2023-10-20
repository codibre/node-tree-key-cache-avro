import { Resolver, Schema, Type } from 'avsc';

export function loadAvroType(
	avroSchema: Schema,
	previousSchemas: Schema[] | undefined,
): { type: Type; resolvers: Resolver[] } {
	const type = Type.forSchema(avroSchema, {
		omitRecordMethods: true,
	});
	const resolvers: Resolver[] = [];
	if (previousSchemas) {
		for (const previousSchema of previousSchemas) {
			const resolver = type.createResolver(Type.forSchema(previousSchema));
			resolvers.push(resolver);
		}
	}

	return { type, resolvers };
}

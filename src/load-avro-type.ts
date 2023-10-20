import { Resolver, Schema, Type } from 'avsc';

export function loadAvroType(
	avroSchema: Schema,
	previousSchema?: Schema,
): { type: Type; resolver: Resolver | undefined } {
	const type = Type.forSchema(avroSchema, {
		omitRecordMethods: true,
	});
	const resolver = previousSchema
		? type.createResolver(Type.forSchema(previousSchema))
		: undefined;

	return { type, resolver };
}

import { Schema } from 'avsc/types';
import { loadAvroType } from './load-avro-type';
import { AvroSerializer } from './serializer';

export class AvroValueSerializer<
	TValue extends object,
> extends AvroSerializer<TValue> {
	static getInstance<TValue extends object>(
		schema: Schema,
		previousSchemas: Schema[] | undefined,
	) {
		const { type, resolvers } = loadAvroType(schema, previousSchemas);

		return new AvroValueSerializer<TValue>(type, resolvers);
	}
}

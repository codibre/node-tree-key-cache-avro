import { Schema } from 'avsc/types';
import { loadAvroType } from './load-avro-type';
import { AvroSerializer } from './serializer';

export class AvroValueSerializer<
	TValue extends object,
> extends AvroSerializer<TValue> {
	static getInstance<TValue extends object>(
		schema: Schema,
		readerSchema: Schema | undefined,
	) {
		const { type, resolver } = loadAvroType(schema, readerSchema);

		return new AvroValueSerializer<TValue>(type, resolver);
	}
}

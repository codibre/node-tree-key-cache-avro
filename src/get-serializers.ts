import { Schema } from 'avsc/types';
import { KeyTreeCacheOptions } from 'tree-key-cache';
import { AvroTreeSerializer } from './tree-serializer';
import { AvroValueSerializer } from './value-serializer';

export type AvroTreeKeyCacheOptions<TValue extends object> = Required<
	Pick<
		KeyTreeCacheOptions<TValue, Buffer>,
		'treeSerializer' | 'valueSerializer'
	>
>;

export function getAvroSerializers<TValue extends object>(
	schema: Schema,
	previousSchema?: Schema,
): AvroTreeKeyCacheOptions<TValue> {
	return {
		treeSerializer: AvroTreeSerializer.getInstance(),
		valueSerializer: AvroValueSerializer.getInstance(schema, previousSchema),
	};
}

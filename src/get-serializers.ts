import { Schema } from 'avsc/types';
import { KeyTreeCacheOptions } from 'tree-key-cache';
import { AvroTreeSerializer } from './tree-serializer';
import { AvroValueSerializer } from './value-serializer';

export type AvroTreeKeyCacheOptions<TValue extends object> = Pick<
	KeyTreeCacheOptions<TValue, string>,
	'treeSerializer' | 'valueSerializer'
>;

export function getAvroSerializers<TValue extends object>(
	schema: Schema,
): AvroTreeKeyCacheOptions<TValue> {
	return {
		treeSerializer: AvroTreeSerializer.getInstance(),
		valueSerializer: AvroValueSerializer.getInstance(schema),
	};
}

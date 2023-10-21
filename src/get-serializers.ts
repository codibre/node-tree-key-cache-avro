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

/**
 * Returns the tree and value avro serializers to be used with tree-key-cache
 * @param schema The most recent schema of your entity, to be used as node value
 * @param previousSchemas A list of previous schema versions, ordered by the most recent after the current one
 * @returns An object with the tree and value serializers
 */
export function getAvroSerializers<TValue extends object>(
	schema: Schema,
	previousSchemas?: Schema[],
): AvroTreeKeyCacheOptions<TValue> {
	return {
		treeSerializer: AvroTreeSerializer.getInstance(),
		valueSerializer: AvroValueSerializer.getInstance(schema, previousSchemas),
	};
}

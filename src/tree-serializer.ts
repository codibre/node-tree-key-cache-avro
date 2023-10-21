import { Tree } from 'tree-key-cache';
import { AvroSerializer } from './serializer';
import { loadAvroType } from './load-avro-type';
import { treeSchema } from './tree-schema';

export class AvroTreeSerializer extends AvroSerializer<Tree<Buffer>> {
	static getInstance() {
		const { type, resolvers } = loadAvroType(treeSchema, undefined);

		return new AvroTreeSerializer(type, resolvers);
	}
}

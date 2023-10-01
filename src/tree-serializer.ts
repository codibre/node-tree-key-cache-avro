import { Tree } from 'tree-key-cache';
import { AvroSerializer } from './serializer';
import { loadAvroType } from './load-avro-type';
import { treeSchema } from './tree-schema';

export class AvroTreeSerializer extends AvroSerializer<Tree<string>> {
	static getInstance() {
		const type = loadAvroType(treeSchema);

		return new AvroTreeSerializer(type);
	}
}

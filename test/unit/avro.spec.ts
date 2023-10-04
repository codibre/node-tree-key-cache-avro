import { TreeKeys } from 'tree-key-cache';
import { gzipSync } from 'zlib';
import { loadAvroType } from 'src/load-avro-type';
import { treeSchema } from 'src/tree-schema';

describe('avro', () => {
	it('should convert tree to proto and the other way around', async () => {
		const tree = {
			[TreeKeys.value]: Buffer.from([0, 1, 2]),
			[TreeKeys.children]: {
				a: {
					[TreeKeys.value]: Buffer.from([3, 4]),
					[TreeKeys.children]: {
						a1: {
							[TreeKeys.value]: Buffer.from([5, 6]),
							[TreeKeys.children]: null,
						},
					},
				},
				b: {
					[TreeKeys.value]: Buffer.from([5, 6]),
					[TreeKeys.children]: {
						b1: {
							[TreeKeys.value]: Buffer.from([7, 8]),
							[TreeKeys.children]: null,
						},
					},
				},
			},
		};
		const type = loadAvroType(treeSchema);

		const encoded = type.toBuffer(tree);
		const decoded = type.fromBuffer(encoded);

		expect(tree).toEqual(decoded);
		tree[TreeKeys.value] = Buffer.from([1, 2]);
		tree[TreeKeys.children].a[TreeKeys.value] = Buffer.from([3, 4]);
		tree[TreeKeys.children].b[TreeKeys.value] = Buffer.from([5, 6]);
		tree[TreeKeys.children].a[TreeKeys.children].a1[TreeKeys.value] =
			Buffer.from([5, 6]);
		tree[TreeKeys.children].b[TreeKeys.children].b1[TreeKeys.value] =
			Buffer.from([7, 8]);
		const originalLength = JSON.stringify(tree).length;
		expect(encoded.length).toBeLessThan(originalLength);
		const zippedLength = gzipSync(encoded).length;
		const originalZippedLength = gzipSync(JSON.stringify(tree)).length;
		expect(zippedLength).toBeLessThan(originalZippedLength);
	});
});

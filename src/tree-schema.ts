import { Schema } from 'avsc/types';
import { TreeKeys } from 'tree-key-cache';

export const treeSchema: Schema = {
	name: 'Tree',
	type: 'record',
	fields: [
		{
			name: TreeKeys.value,
			type: ['null', 'bytes'],
			default: null,
		},
		{
			name: TreeKeys.children,
			type: [
				'null',
				{
					type: 'map',
					values: 'Tree',
				},
			],
			default: null,
		},
	],
};

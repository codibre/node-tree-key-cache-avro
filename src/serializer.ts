import { Resolver, Type } from 'avsc/types';
import { Serializer } from 'tree-key-cache';

export class AvroSerializer<TValue extends object>
	implements Serializer<TValue, Buffer>
{
	protected constructor(
		private readonly type: Type,
		private readonly resolvers: Resolver[],
	) {}

	serialize(a: TValue): Buffer {
		return this.type.toBuffer(a);
	}

	deserialize(b: Buffer): TValue {
		let result = this.type.decode(b).value as TValue | undefined;
		let { length: idx } = this.resolvers;
		while (result === undefined && idx > 0) {
			idx--;
			result = this.type.decode(b, 0, this.resolvers[idx]).value as
				| TValue
				| undefined;
		}
		if (result === undefined) {
			throw new Error('Could not deserialize buffer');
		}
		return result;
	}
}

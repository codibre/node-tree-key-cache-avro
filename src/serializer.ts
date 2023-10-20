import { Resolver, Type } from 'avsc/types';
import { Serializer } from 'tree-key-cache';

export class AvroSerializer<TValue extends object>
	implements Serializer<TValue, Buffer>
{
	protected constructor(
		private readonly type: Type,
		private readonly resolver?: Resolver,
	) {}

	serialize(a: TValue): Buffer {
		return this.type.toBuffer(a);
	}

	deserialize(b: Buffer): TValue {
		return this.type.decode(b, 0, this.resolver).value as TValue;
	}
}

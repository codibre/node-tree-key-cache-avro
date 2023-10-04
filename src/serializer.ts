import { Type } from 'avsc/types';
import { Serializer } from 'tree-key-cache';

export class AvroSerializer<TValue extends object>
	implements Serializer<TValue, Buffer>
{
	protected constructor(private readonly type: Type) {}

	serialize(a: TValue): Buffer {
		return this.type.toBuffer(a);
	}

	deserialize(b: Buffer): TValue {
		return this.type.decode(b).value as TValue;
	}
}

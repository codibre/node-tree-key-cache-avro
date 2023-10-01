import { Type } from 'avsc/types';
import { Serializer } from 'tree-key-cache';

export class AvroSerializer<TValue extends object>
	implements Serializer<TValue, string>
{
	protected constructor(private readonly type: Type) {}

	serialize(a: TValue): string {
		return this.type.toString(a);
	}

	deserialize(b: string): TValue {
		return this.type.fromString(b) as TValue;
	}
}

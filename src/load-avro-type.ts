import avro, { Schema } from 'avsc';

export function loadAvroType(avroSchema: Schema) {
	return avro.Type.forSchema(avroSchema);
}

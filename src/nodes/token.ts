import type { CebolLexicalTokenEnum, CebolTokenInterface } from "@/nodes/types";

export class CebolToken implements CebolTokenInterface {
	public readonly type: CebolLexicalTokenEnum;
	public readonly value: string;
	public readonly line: number;
	public readonly column: number;

	constructor(
		_type: CebolLexicalTokenEnum,
		_value: string,
		_line: number,
		_column: number,
	) {
		this.type = _type;
		this.value = _value;
		this.line = _line;
		this.column = _column;
	}

	public toObject(): object {
		return {
			type: "CebolToken",
			lexicalType: this.type,
			value: this.value,
			line: this.line,
			column: this.column,
		};
	}

	public toString(): string {
		return `CebolToken(${this.type}, "${this.value}", ${this.line}, ${this.column})`;
	}
}

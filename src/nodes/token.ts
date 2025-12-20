import {
	type CebolLexicalTokenEnum,
	CebolNodeNameEnum,
	type CebolTokenInterface,
} from "@/nodes/types";

export class CebolToken implements CebolTokenInterface {
	public name = CebolNodeNameEnum.TOKEN_NODE;
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
			name: this.name,
			lexicalType: this.type,
			value: this.value,
			line: this.line,
			column: this.column,
		};
	}

	public toString(): string {
		return `${this.name}(${this.type}, "${this.value}", ${this.line}, ${this.column})`;
	}
}

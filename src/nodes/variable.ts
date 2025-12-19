import type {
	CebolASTNode,
	CebolLexicalTokenEnum,
	CebolVariableNodeInterface,
} from "./types";

export class CebolVariableNode implements CebolVariableNodeInterface {
	public name = "CebolVariableNode";
	public readonly varName: string;
	public readonly varType:
		| CebolLexicalTokenEnum.NUMBER
		| CebolLexicalTokenEnum.STRING;
	public readonly value: CebolASTNode;

	constructor(
		_name: string,
		_varType: CebolLexicalTokenEnum.NUMBER | CebolLexicalTokenEnum.STRING,
		_value: CebolASTNode,
	) {
		this.varName = _name;
		this.varType = _varType;
		this.value = _value;
	}

	public toObject(): object {
		return {
			name: this.name,
			varName: this.varName,
			varType: this.varType,
			value: this.value.toObject(),
		};
	}

	public toString(): string {
		return `${this.name}(varName=${this.varName}, varType=${this.varType}, value=${this.value.toString()})`;
	}
}

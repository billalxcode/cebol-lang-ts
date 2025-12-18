import type {
	CebolASTNode,
	CebolLexicalTokenEnum,
	CebolVariableNodeInterface,
} from "./types";

export class CebolVariableNode implements CebolVariableNodeInterface {
	public readonly name: string;
	public readonly varType:
		| CebolLexicalTokenEnum.NUMBER
		| CebolLexicalTokenEnum.STRING;
	public readonly value: CebolASTNode;

	constructor(
		_name: string,
		_varType: CebolLexicalTokenEnum.NUMBER | CebolLexicalTokenEnum.STRING,
		_value: CebolASTNode,
	) {
		this.name = _name;
		this.varType = _varType;
		this.value = _value;
	}

	public toObject(): object {
		return {
			type: "CebolVariableNode",
			name: this.name,
			varType: this.varType,
			value: this.value.toObject(),
		};
	}

	public toString(): string {
		return `CebolVariableNode(name=${this.name}, varType=${this.varType}, value=${this.value.toString()})`;
	}
}

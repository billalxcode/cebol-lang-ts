import {
	CebolNodeNameEnum,
	type CebolVariableNodeInterface,
} from "./types";

export class CebolVariableNode implements CebolVariableNodeInterface {
	public name = CebolNodeNameEnum.VARIABLE_NODE;
	public readonly varName: string;

	constructor(
		_name: string,
	) {
		this.varName = _name;
	}

	public toObject(): object {
		return {
			name: this.name,
			varName: this.varName,
		};
	}

	public toString(): string {
		return `${this.name}(varName=${this.varName})`;
	}
}

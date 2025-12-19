import {
	CebolNodeNameEnum,
	type CebolAssignNodeInterface,
	type CebolBaseNodeInterface,
} from "@/nodes/types";

export class CebolAssignNode implements CebolAssignNodeInterface {
	public name = CebolNodeNameEnum.ASSIGN_NODE;

	public readonly variable: CebolBaseNodeInterface;
	public readonly value: CebolBaseNodeInterface;

	constructor(
		_variable: CebolBaseNodeInterface,
		_value: CebolBaseNodeInterface,
	) {
		this.variable = _variable;
		this.value = _value;
	}

	public toObject(): object {
		return {
			name: this.name,
			variable: this.variable.toObject(),
			value: this.value.toObject(),
		};
	}

	public toString(): string {
		return `${this.name}(${this.variable.toString()}, ${this.value.toString()})`;
	}
}

import {
	CebolNodeNameEnum,
	type CebolAssignmentType,
	type CebolAssignNodeInterface,
	type CebolBaseNodeInterface,
} from "@/nodes/types";

export class CebolAssignNode implements CebolAssignNodeInterface {
	public name = CebolNodeNameEnum.ASSIGN_NODE;

	public readonly variable: CebolBaseNodeInterface;
	public readonly value: CebolBaseNodeInterface;
	public readonly type: CebolAssignmentType

	constructor(
		_variable: CebolBaseNodeInterface,
		_value: CebolBaseNodeInterface,
		_type: CebolAssignmentType
	) {
		this.variable = _variable;
		this.value = _value;
		this.type = _type;
	}

	public toObject(): object {
		return {
			name: this.name,
			variable: this.variable.toObject(),
			value: this.value.toObject(),
			type: this.type,
		};
	}

	public toString(): string {
		return `${this.name}(${this.variable.toString()}, ${this.value.toString()})`;
	}
}

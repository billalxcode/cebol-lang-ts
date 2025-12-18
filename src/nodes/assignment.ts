import type { CebolAssignNodeInterface, CebolBaseNodeInterface } from "@/nodes/types";

export class CebolAssignNode implements CebolAssignNodeInterface {
	public readonly variable: CebolBaseNodeInterface;
	public readonly value: CebolBaseNodeInterface;
	constructor(_variable: CebolBaseNodeInterface, _value: CebolBaseNodeInterface) {
		this.variable = _variable;
		this.value = _value;
	}

	public toString(): string {
		return `CebolAssignNode(${this.variable.toString()}, ${this.value.toString()})`;
	}
}
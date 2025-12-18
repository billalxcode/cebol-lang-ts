import type { CebolNumberNodeInterface } from "@/nodes/types";

export class CebolNumberNode implements CebolNumberNodeInterface {
	public readonly value: number;

	constructor(_value: number) {
		this.value = _value;
	}

	public toString(): string {
		return `CebolNumberNode(${this.value})`;
	}
}
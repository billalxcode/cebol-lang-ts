import type { CebolBaseNodeInterface, CebolPrintNodeInterface } from "@/nodes/types";

export class CebolPrintNode implements CebolPrintNodeInterface {
	public readonly expression: CebolBaseNodeInterface;

	constructor(_expression: CebolBaseNodeInterface) {
		this.expression = _expression;
	}

	public toString(): string {
		return `CebolPrintNode(${this.expression.toString()})`;
	}
}
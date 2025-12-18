import type { CebolBaseNodeInterface, CebolBinaryOpNodeInterface } from "@/nodes/types";

export class CebolBinaryOpNode implements CebolBinaryOpNodeInterface {
	public readonly left: CebolBaseNodeInterface;
	public readonly operator: CebolBaseNodeInterface;
	public readonly right: CebolBaseNodeInterface;

	constructor(_left: CebolBaseNodeInterface, _operator: CebolBaseNodeInterface, _right: CebolBaseNodeInterface) {
		this.left = _left;
		this.operator = _operator;
		this.right = _right;
	}

	public toString(): string {
		return `CebolBinaryOpNode(${this.left.toString()}, ${this.operator.toString()}, ${this.right.toString()})`;
	}
}
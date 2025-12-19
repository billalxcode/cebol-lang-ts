import type {
	CebolBaseNodeInterface,
	CebolBinaryOpNodeInterface,
} from "@/nodes/types";

export class CebolBinaryOpNode implements CebolBinaryOpNodeInterface {
	public name = "CebolBinaryOpNode";
	public readonly left: CebolBaseNodeInterface;
	public readonly operator: CebolBaseNodeInterface;
	public readonly right: CebolBaseNodeInterface;

	constructor(
		_left: CebolBaseNodeInterface,
		_operator: CebolBaseNodeInterface,
		_right: CebolBaseNodeInterface,
	) {
		this.left = _left;
		this.operator = _operator;
		this.right = _right;
	}

	public toObject(): object {
		return {
			name: this.name,
			left: this.left.toObject(),
			operator: this.operator.toObject(),
			right: this.right.toObject(),
		};
	}

	public toString(): string {
		return `${this.name}(${this.left.toString()}, ${this.operator.toString()}, ${this.right.toString()})`;
	}
}

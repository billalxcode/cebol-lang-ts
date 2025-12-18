import type {
	CebolBaseNodeInterface,
	CebolConditionNodeInterface,
} from "./types";

export class CebolConditionNode implements CebolConditionNodeInterface {
	public readonly condition: CebolBaseNodeInterface;
	public readonly trueBranch: CebolBaseNodeInterface[];
	public readonly falseBranch: CebolBaseNodeInterface[] | null;

	constructor(
		_condition: CebolBaseNodeInterface,
		_trueBranch: CebolBaseNodeInterface[],
		_falseBranch: CebolBaseNodeInterface[] | null = null,
	) {
		this.condition = _condition;
		this.trueBranch = _trueBranch;
		this.falseBranch = _falseBranch;
	}

	public toObject(): object {
		return {
			type: "CebolConditionNode",
			condition: this.condition.toObject(),
			trueBranch: this.trueBranch.map((node) => node.toObject()),
			falseBranch: this.falseBranch
				? this.falseBranch.map((node) => node.toObject())
				: null,
		};
	}

	public toString(): string {
		return `CebolConditionNode(${this.condition.toString()}, [${this.trueBranch
			.map((node) => node.toString())
			.join(
				", ",
			)}], [${this.falseBranch ? this.falseBranch.map((node) => node.toString()).join(", ") : ""}])`;
	}
}

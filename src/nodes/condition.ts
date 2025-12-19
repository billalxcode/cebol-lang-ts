import {
	CebolNodeNameEnum,
	type CebolBaseNodeInterface,
	type CebolConditionNodeInterface,
} from "./types";

export class CebolConditionNode implements CebolConditionNodeInterface {
	public name = CebolNodeNameEnum.CONDITION_NODE;
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
			name: this.name,
			condition: this.condition.toObject(),
			trueBranch: this.trueBranch.map((node) => node.toObject()),
			falseBranch: this.falseBranch
				? this.falseBranch.map((node) => node.toObject())
				: null,
		};
	}

	public toString(): string {
		return `${this.name}(${this.condition.toString()}, [${this.trueBranch
			.map((node) => node.toString())
			.join(
				", ",
			)}], [${this.falseBranch ? this.falseBranch.map((node) => node.toString()).join(", ") : ""}])`;
	}
}

import {
	CebolNodeNameEnum,
	type CebolASTNode,
	type CebolBaseNodeInterface,
	type CebolPrintNodeInterface,
} from "@/nodes/types";

export class CebolPrintNode implements CebolPrintNodeInterface {
	public name = CebolNodeNameEnum.PRINT_NODE;
	public readonly expressions: CebolBaseNodeInterface[];
	public readonly variables: CebolASTNode[] = [];

	constructor(
		_expressions: CebolBaseNodeInterface[],
		_variables: CebolASTNode[] = [],
	) {
		this.expressions = _expressions;
		this.variables = _variables;
	}

	public toObject(): object {
		return {
			name: this.name,
			expressions: this.expressions.map((expr) => expr.toObject()),
		};
	}

	public toString(): string {
		return `${this.name}(${this.expressions.map((expr) => expr.toString()).join(", ")})`;
	}
}

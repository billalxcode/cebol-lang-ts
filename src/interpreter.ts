import { CebolAssignNode } from "./nodes/assignment";
import { CebolBinaryOpNode } from "./nodes/binary";
import { CebolNumberNode } from "./nodes/number";
import { CebolPrintNode } from "./nodes/print";
import { CebolProgramNode } from "./nodes/program";
import { CebolStringNode } from "./nodes/string";
import type { CebolASTNode } from "./nodes/types";

export class CebolInterpreter {
	private globals: Record<string, any>;

	constructor() {
		this.globals = {};
	}

	// biome-ignore lint: disable any type usage temporarily
	public visit(node: CebolASTNode): any {
		if (node instanceof CebolNumberNode) return node.value;
		if (node instanceof CebolStringNode)
			return this.globals[node.value] ?? node.value;
		if (node instanceof CebolBinaryOpNode) {
			const left = this.visit(node.left);
			const right = this.visit(node.right);
			switch (node.operator.value) {
				case "+":
					return left + right;
				case "-":
					return left - right;
				case "*":
					return left * right;
				case "/":
					return left / right;
				default:
					throw new Error(`Unknown operator: ${node.operator.value}`);
			}
		}
		if (node instanceof CebolAssignNode) {
			const value = this.visit(node.value);
			this.globals[node.variable.value] = value;
			return value;
		}
		if (node instanceof CebolPrintNode) {
			const value = this.visit(node.expression);
			console.log(value);
			return value;
		}
		if (node instanceof CebolProgramNode) {
			for (const stmt of node.bodies) {
				this.visit(stmt);
			}
			return null;
		}
	}

	// biome-ignore lint: disable any type usage temporarily
	public interpret(ast: CebolASTNode[]): any {
		for (const node of ast) {
			this.visit(node);
		}
	}
}

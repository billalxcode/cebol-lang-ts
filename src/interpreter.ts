import { OPERATOR_DIVIDE, OPERATOR_MINUS, OPERATOR_MODULO, OPERATOR_MULTIPLY, OPERATOR_PLUS, OPERATOR_POWER } from "./constants";
import { logger } from "./logger";
import { CebolAssignNode } from "./nodes/assignment";
import { CebolBinaryOpNode } from "./nodes/binary";
import { CebolNumberNode } from "./nodes/number";
import { CebolPrintNode } from "./nodes/print";
import { CebolProgramNode } from "./nodes/program";
import { CebolStringNode } from "./nodes/string";
import { CebolNodeNameEnum, type CebolASTNode, type CebolTokenInterface } from "./nodes/types";
import { CebolVariableNode } from "./nodes/variable";

export class CebolInterpreter {
	private globals: Record<string, any>;

	constructor() {
		this.globals = {};
	}

	// biome-ignore lint: disable any type usage temporarily
	public visit(node: CebolASTNode): any {
		switch (node.name) {
			case CebolNodeNameEnum.NUMBER_NODE:
				const numberNode = node as CebolNumberNode;
				return numberNode.value
			case CebolNodeNameEnum.STRING_NODE:
				const stringNode = node as CebolStringNode;
				return this.globals[stringNode.value] ?? stringNode.value
			case CebolNodeNameEnum.BINARY_OP_NODE:
				const binaryOpNode = node as CebolBinaryOpNode

				const left = this.visit(binaryOpNode.left as CebolASTNode);
				const right = this.visit(binaryOpNode.right as CebolASTNode);

				const operator = binaryOpNode.operator as CebolTokenInterface;

				let output
				switch (operator.value) {
					case OPERATOR_PLUS:
						output = left + right;
						break;
					case OPERATOR_MINUS:
						output = left - right;
						break;
					case OPERATOR_MULTIPLY:
						output = left * right;
						break;
					case OPERATOR_DIVIDE:
						output = left / right;
						break;
					case OPERATOR_MODULO:
						output = left % right;
						break;
					case OPERATOR_POWER:
						output = Math.pow(left, right);
						break;
					default:
						throw new Error(`Unknown operator: ${operator.value}`);
				}
				return output
			case CebolNodeNameEnum.ASSIGN_NODE:
				const assignNode = node as CebolAssignNode;
				if (!assignNode.value || typeof assignNode.value.name !== "string") {
					throw new Error(`Invalid assignment value`);
				}
				const value = this.visit(assignNode.value as CebolASTNode);
				const variableNode = assignNode.variable as CebolVariableNode;
				this.globals[variableNode.value.name] = value;
				return value
			case CebolNodeNameEnum.VARIABLE_NODE:
				const variableNodeLookup = node as CebolVariableNode;
				if (!variableNodeLookup.value || typeof variableNodeLookup.value.name !== "string") {
					throw new Error(`Invalid variable reference`);
				}
				const varName = variableNodeLookup.varName;
				if (this.globals.hasOwnProperty(varName)) {
					return this.globals[varName];
				} else {
					throw new Error(`Undefined variable: ${varName}`);
				}
			case CebolNodeNameEnum.PRINT_NODE:
				const printNode = node as CebolPrintNode;
				for (const expr of printNode.expressions) {
					const value = this.visit(expr as CebolASTNode);
					console.log(value);
				}
				return null
			case CebolNodeNameEnum.PROGRAM_NODE:
				const programNode = node as CebolProgramNode;
				for (const stmt of programNode.bodies) {
					this.visit(stmt as CebolASTNode);
				}
				return null
			default:
				throw new Error(`Unknown node type: ${node.name}`);
		}
	}

	// biome-ignore lint: disable any type usage temporarily
	public interpret(ast: CebolASTNode[]): any {
		for (const node of ast) {
			logger.info(`Interpreting node: ${JSON.stringify(node)}`);
			this.visit(node);
		}
	}
}

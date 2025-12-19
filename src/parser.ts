import { ARITHMETIC_OPERATORS } from "./constants";
import { logger } from "./logger";
import { CebolBinaryOpNode } from "./nodes/binary";
import { CebolNumberNode } from "./nodes/number";
import { CebolStringNode } from "./nodes/string";
import type { CebolASTNode, CebolTokenInterface } from "./nodes/types";
import { CebolLexicalTokenEnum } from "./nodes/types";
import { CebolStatementManager } from "./statements/manager";
import type {
	CebolBasicStatementInterface,
	CebolLexerInterface,
	CebolParserInterface,
} from "./types/nodes";

export class CebolParser implements CebolParserInterface {
	public lexer: CebolLexerInterface;
	public current_token: CebolTokenInterface;

	private state_manager: CebolBasicStatementInterface;

	constructor(_lexer: CebolLexerInterface) {
		this.lexer = _lexer;

		this.current_token = this.lexer.getNextToken();

		this.state_manager = new CebolStatementManager(this);
	}

	public eat(tokenType: CebolLexicalTokenEnum): void {
		logger.info(
			`Eating token: expected ${tokenType}, got ${this.current_token.type}`,
		);
		logger.info(`Current token value: "${this.current_token.value}"`);
		if (this.current_token.type === tokenType) {
			this.current_token = this.lexer.getNextToken();
		} else {
			throw new Error(
				`Unexpected token: expected ${tokenType}, got ${this.current_token.type}`,
			);
		}
	}

	public get can_factor(): boolean {
		const token = this.current_token;
		return (
			token.type === CebolLexicalTokenEnum.NUMBER ||
			token.type === CebolLexicalTokenEnum.STRING
		);
	}

	public get can_term(): boolean {
		return this.can_factor;
	}

	public get can_expr(): boolean {
		return this.can_term;
	}

	public get valid_arithmetic_operator(): boolean {
		const token = this.current_token;
		return (
			token.type === CebolLexicalTokenEnum.OPERATOR &&
			ARITHMETIC_OPERATORS.includes(token.value)
		);
	}

	public factor(): CebolASTNode {
		const token = this.current_token;
		logger.info(`Parsing factor, current token: ${token.toString()}`);

		let factor_node: CebolASTNode

		switch (token.type) {
			case CebolLexicalTokenEnum.NUMBER:
				this.eat(CebolLexicalTokenEnum.NUMBER);
				factor_node = new CebolNumberNode(Number(token.value));
				break;
			case CebolLexicalTokenEnum.STRING:
				this.eat(CebolLexicalTokenEnum.STRING);
				factor_node = new CebolStringNode(token.value);
				break;
			case CebolLexicalTokenEnum.IDENTIFIER:
				this.eat(CebolLexicalTokenEnum.IDENTIFIER);
				// i dont know what to do here yet haha
				factor_node = new CebolStringNode(token.value);
				break;
			case CebolLexicalTokenEnum.LPARENTHESES:
				this.eat(CebolLexicalTokenEnum.LPARENTHESES);
				factor_node = this.expr();
				this.eat(CebolLexicalTokenEnum.RPARENTHESES);
				break;
			default:
				throw new Error(`Unexpected token in factor: ${token.toString()}`);
		}
		return factor_node
	}

	public term(): CebolASTNode {
		let node = this.factor();

		while (
			this.current_token.type === CebolLexicalTokenEnum.OPERATOR &&
			(this.current_token.value === "*" || this.current_token.value === "/")
		) {
			const token = this.current_token;
			this.eat(CebolLexicalTokenEnum.OPERATOR);

			const left = node
			const operator = token
			const right = this.factor()

			logger.info(
				`Creating binary operation node: ${left.toString()} ${operator.value} ${right.toString()}`,
			);
			node = new CebolBinaryOpNode(left, operator, right);
		}

		return node;
	}

	public expr(): CebolASTNode {
		let node = this.term();

		while (
			this.current_token.type === CebolLexicalTokenEnum.OPERATOR &&
			this.valid_arithmetic_operator
		) {
			const token = this.current_token;
			this.eat(CebolLexicalTokenEnum.OPERATOR);

			node = new CebolBinaryOpNode(node, token, this.term());
		}

		return node;
	}

	public parse(): CebolASTNode[] {
		const nodes: CebolASTNode[] = [];

		while (this.current_token.type !== CebolLexicalTokenEnum.EOF) {
			const current_line = this.lexer.currentLine;
			logger.info(
				`Parsing at line ${current_line}, current token: ${this.current_token.toString()}`,
			);

			const node = this.state_manager.statement();
			nodes.push(node);
		}

		logger.info(`Parsing complete, total nodes: ${nodes.length}`);
		// Write parsed nodes to nodes.json for debugging
		const nodesData = nodes.map((node) => node.toObject());
		Bun.write("nodes.json", JSON.stringify(nodesData, null, 4));

		logger.info(`Wrote ${nodes.length} nodes to nodes.json`);
		return nodes;
	}
}

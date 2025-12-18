import { logger } from "./logger";
import { CebolBinaryOpNode } from "./nodes/binary";
import { CebolNumberNode } from "./nodes/number";
import { CebolStringNode } from "./nodes/string";
import type { CebolASTNode, CebolTokenInterface } from "./nodes/types";
import { CebolLexicalTokenEnum } from "./nodes/types";
import { CebolStatementManager } from "./statements/manager";
import type { CebolBasicStatementInterface, CebolLexerInterface, CebolParserInterface } from "./types/nodes";

export class CebolParser implements CebolParserInterface {
	public lexer: CebolLexerInterface;
	public current_token: CebolTokenInterface;

	private state_manager: CebolBasicStatementInterface

	constructor(_lexer: CebolLexerInterface) {
		this.lexer = _lexer;

		this.current_token = this.lexer.getNextToken();

		this.state_manager = new CebolStatementManager(this)
	}

	public eat(tokenType: CebolLexicalTokenEnum): void {
		logger.info(
			`Eating token: expected ${tokenType}, got ${this.current_token.type}`,
		)
		logger.info(`Current token value: "${this.current_token.value}"`);
		if (this.current_token.type === tokenType) {
			this.current_token = this.lexer.getNextToken();
		} else {
			throw new Error(
				`Unexpected token: expected ${tokenType}, got ${this.current_token.type}`,
			);
		}
	}

	public factor(): CebolASTNode {
		const token = this.current_token;
		logger.info(`Parsing factor, current token: ${token.toString()}`);
		if (token.type === CebolLexicalTokenEnum.NUMBER) {
			this.eat(CebolLexicalTokenEnum.NUMBER);
			return new CebolNumberNode(Number(token.value));
		} else if (token.type === CebolLexicalTokenEnum.STRING) {
			this.eat(CebolLexicalTokenEnum.STRING);
			return new CebolStringNode(token.value);
		} else {
			throw new Error(`Unexpected token in factor: ${token.toString()}`);
		}
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

			logger.info(`Creating binary operation node: ${left.toString()} ${operator.value} ${right.toString()}`);
			node = new CebolBinaryOpNode(left, operator, right);
		}

		return node;
	}

	public expr(): CebolASTNode {
		let node = this.term();

		while (
			this.current_token.type === CebolLexicalTokenEnum.OPERATOR &&
			(this.current_token.value === "+" || this.current_token.value === "-")
		) {
			const token = this.current_token;
			this.eat(CebolLexicalTokenEnum.OPERATOR);

			node = new CebolBinaryOpNode(node, token, this.term());
		}

		return node;
	}

	// public programStatement(): CebolASTNode {
	// 	this.eat(CebolLexicalTokenEnum.KEYWORD); // 'program'

	// 	const nameToken = this.current_token;
	// 	logger.info(`Parsing program name, current token: ${nameToken.toString()}`);
	// 	this.eat(CebolLexicalTokenEnum.IDENTIFIER);

	// 	logger.info(
	// 		`Parsing program body, current token: ${this.current_token.toString()}`,
	// 	);
	// 	this.eat(CebolLexicalTokenEnum.LBRACE); // '{'

	// 	logger.info(
	// 		`Entering program body parsing loop, current token: ${this.current_token.toString()}`,
	// 	);
	// 	const body: CebolASTNode[] = [];
	// 	while (this.current_token.type !== CebolLexicalTokenEnum.RBRACE) {
	// 		logger.info(
	// 			`Parsing statement in program body, current token: ${this.current_token.toString()}`,
	// 		);
	// 		body.push(this.statement());
	// 	}

	// 	logger.info(
	// 		`Exiting program body parsing loop, current token: ${this.current_token.toString()}`,
	// 	);
	// 	this.eat(CebolLexicalTokenEnum.RBRACE); // '}'

	// 	logger.info(`Completed parsing program: ${nameToken.value}`);
	// 	logger.info(`Program body contains ${body.length} statements.`);
	// 	logger.info(
	// 		`Current token after program body: ${this.current_token.toString()}`,
	// 	);
	// 	return new CebolProgramNode(nameToken.value, body);
	// }

	// public printStatement(): CebolASTNode {
	// 	this.eat(CebolLexicalTokenEnum.KEYWORD); // 'cetak'
	// 	this.eat(CebolLexicalTokenEnum.LPARENTHESES); // '('
	// 	const exprNode = this.expr();
	// 	this.eat(CebolLexicalTokenEnum.RPARENTHESES); // ')'
	// 	return new CebolPrintNode(exprNode);
	// }

	// public isProgramDefinition(): boolean {
	// 	return (
	// 		this.current_token.type === CebolLexicalTokenEnum.KEYWORD &&
	// 		this.current_token.value === KEYWORD_FUNCTION_DEFINE
	// 	);
	// }

	// public isPrintStatement(): boolean {
	// 	return (
	// 		this.current_token.type === CebolLexicalTokenEnum.KEYWORD &&
	// 		this.current_token.value === KEYWORD_FUNCTION_PRINT
	// 	);
	// }

	// public statement(): CebolASTNode {
	// 	const token = this.current_token;
	// 	logger.info(`Parsing statement, current token: ${token.toString()}`);

	// 	if (
	// 		token.type === CebolLexicalTokenEnum.KEYWORD
	// 	) {
	// 		if (this.isProgramDefinition()) {
	// 			return this.programStatement();
	// 		} else if (this.isPrintStatement()) {
	// 			return this.printStatement();
	// 		}
	// 		this.eat(CebolLexicalTokenEnum.KEYWORD);
	// 		const varToken = this.current_token;
	// 		this.eat(CebolLexicalTokenEnum.IDENTIFIER);
	// 		this.eat(CebolLexicalTokenEnum.ASSIGNMENT);
	// 		const exprNode = this.expr();
	// 		return new CebolAssignNode(new CebolStringNode(varToken.value), exprNode);
	// 	} else if (token.type === CebolLexicalTokenEnum.IDENTIFIER) {
	// 		const varToken = this.current_token;
	// 		this.eat(CebolLexicalTokenEnum.IDENTIFIER);
	// 		this.eat(CebolLexicalTokenEnum.ASSIGNMENT);
	// 		const exprNode = this.expr();
	// 		return new CebolAssignNode(new CebolStringNode(varToken.value), exprNode);

	// 		// } else if (
	// 		// 	token.type === CebolLexicalTokenEnum.KEYWORD &&
	// 		// 	token.value === KEYWORD_FUNCTION_PRINT
	// 		// ) {
	// 		// 	this.eat(CebolLexicalTokenEnum.KEYWORD);
	// 		// 	this.eat(CebolLexicalTokenEnum.LPARENTHESES);
	// 		// 	const exprNode = this.expr();
	// 		// 	this.eat(CebolLexicalTokenEnum.RPARENTHESES);
	// 		// 	return new CebolPrintNode(exprNode);
	// 	} else {
	// 		throw new Error(`Unexpected token in statement: ${token.toString()}`);
	// 	}
	// }

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

		return nodes;
	}
}

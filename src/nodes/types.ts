export enum CebolLexicalTokenEnum {
	KEYWORD = "KEYWORD",
	IDENTIFIER = "IDENTIFIER",
	NUMBER = "NUMBER",
	STRING = "STRING",
	ASSIGNMENT = "ASSIGNMENT",
	OPERATOR = "OPERATOR",
	PUNCTUATION = "PUNCTUATION",
	WHITESPACE = "WHITESPACE",
	COMMENT = "COMMENT",
	LBRACE = "LBRACE",
	RBRACE = "RBRACE",
	COLON = "COLON",
	COMMA = "COMMA",
	LPARENTHESES = "LPARENTHESES",
	RPARENTHESES = "RPARENTHESES",
	EOF = "EOF",
}

export interface CebolBaseNodeInterface {
	name: string;
	toObject(): object;
	toString(): string;
}

export interface CebolNumberNodeInterface extends CebolBaseNodeInterface {
	readonly value: number;
}

export interface CebolAssignNodeInterface extends CebolBaseNodeInterface {
	readonly variable: CebolBaseNodeInterface;
	readonly value: CebolBaseNodeInterface;
}

export interface CebolBinaryOpNodeInterface extends CebolBaseNodeInterface {
	readonly left: CebolBaseNodeInterface;
	readonly operator: CebolBaseNodeInterface;
	readonly right: CebolBaseNodeInterface;
}

export interface CebolStringNodeInterface extends CebolBaseNodeInterface {
	readonly value: string;
}

export interface CebolProgramNodeInterface extends CebolBaseNodeInterface {
	readonly name: string;
	readonly bodies: CebolBaseNodeInterface[];
	readonly params: string[];
}

export interface CebolConditionNodeInterface extends CebolBaseNodeInterface {
	readonly condition: CebolBaseNodeInterface;
	readonly trueBranch: CebolBaseNodeInterface[];
	readonly falseBranch: CebolBaseNodeInterface[] | null;
}

export interface CebolPrintNodeInterface extends CebolBaseNodeInterface {
	readonly expressions: CebolBaseNodeInterface[];
}

export interface CebolTokenInterface extends CebolBaseNodeInterface {
	readonly type: CebolLexicalTokenEnum;
	readonly value: string;
	readonly line: number;
	readonly column: number;
}

export interface CebolVariableNodeInterface extends CebolBaseNodeInterface {
	readonly varName: string;
	readonly varType: CebolLexicalTokenEnum.NUMBER | CebolLexicalTokenEnum.STRING;
	readonly value: CebolASTNode;
}

export interface CebolMathNodeInterface extends CebolBaseNodeInterface {
	readonly expression: string;
}

export type CebolASTNode =
	| CebolNumberNodeInterface
	| CebolStringNodeInterface
	| CebolBinaryOpNodeInterface
	| CebolAssignNodeInterface
	| CebolPrintNodeInterface
	| CebolProgramNodeInterface
	| CebolConditionNodeInterface
	| CebolVariableNodeInterface;

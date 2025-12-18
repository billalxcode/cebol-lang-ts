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
	LPARENTHESES = "LPARENTHESES",
	RPARENTHESES = "RPARENTHESES",
	EOF = "EOF",
}

export interface CebolBaseNodeInterface {
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
    readonly body: CebolBaseNodeInterface[];
}

export interface CebolPrintNodeInterface extends CebolBaseNodeInterface {
    readonly expression: CebolBaseNodeInterface;
}

export interface CebolTokenInterface extends CebolBaseNodeInterface {
    readonly type: CebolLexicalTokenEnum;
    readonly value: string;
    readonly line: number;
    readonly column: number;
}

export type CebolASTNode =
    | CebolNumberNodeInterface
    | CebolStringNodeInterface
    | CebolBinaryOpNodeInterface
    | CebolAssignNodeInterface
    | CebolPrintNodeInterface
    | CebolProgramNodeInterface;
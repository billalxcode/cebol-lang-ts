import type { CebolASTNode, CebolLexicalTokenEnum, CebolTokenInterface } from "@/nodes/types";

export interface CebolLexerInterface {
    readonly source: string;

    currentLine: number;
    currentColumn: number;

    advance(): void;
    skipWhitespaceAndComments(): void;
    number(): CebolTokenInterface;
    identifier(): CebolTokenInterface;
    keywordOrIdentifier(): CebolTokenInterface;
    getNextToken(): CebolTokenInterface;
    getCurrentChar(): string | null;
}

export interface CebolBasicParserInterface {
    current_token: CebolTokenInterface
}

export interface CebolBasicStatementInterface {
    parent: CebolBasicParserInterface;

    valid(): boolean;
    statement(): CebolASTNode;
}

export interface CebolParserInterface extends CebolBasicParserInterface {
    lexer: CebolLexerInterface;

    eat(tokenType: CebolLexicalTokenEnum): void;
    factor(): CebolASTNode;
    term(): CebolASTNode;
    expr(): CebolASTNode;
    parse(): CebolASTNode[];
}


export interface CebolKeywordSatementInterface extends CebolBasicStatementInterface {
    program: CebolBasicStatementInterface;
}
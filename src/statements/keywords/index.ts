import { type CebolASTNode, CebolLexicalTokenEnum } from "@/nodes/types";
import type { CebolBasicStatementInterface, CebolKeywordSatementInterface, CebolParserInterface } from "@/types/nodes";
import { CebolPrintStatement } from "./print";
import { CebolProgramStatement } from "./program";

export class CebolKeywordStatement implements CebolKeywordSatementInterface {
    public parent: CebolParserInterface
    public program: CebolBasicStatementInterface
    public print: CebolBasicStatementInterface

    constructor(_parent: CebolParserInterface) {
        this.parent = _parent

        this.program = new CebolProgramStatement(this.parent, this)
        this.print = new CebolPrintStatement(this.parent)
    }

    public valid(): boolean {
        const currentToken = this.parent.current_token;

        return currentToken.type === CebolLexicalTokenEnum.KEYWORD
    }

    public statement(): CebolASTNode {
        const token = this.parent.current_token;

        if (this.program.valid()) {
            return this.program.statement()
        } else if (this.print.valid()) {
            return this.print.statement()
        } else {
            throw new Error(`Unknown keyword statement: ${token.toString()}`);
        }
    }
}
import { KEYWORD_FUNCTION_PRINT } from "@/constants";
import { CebolPrintNode } from "@/nodes/print";
import { type CebolASTNode, CebolLexicalTokenEnum } from "@/nodes/types";
import type { CebolBasicStatementInterface, CebolParserInterface } from "@/types/nodes";

export class CebolPrintStatement implements CebolBasicStatementInterface {
    public parent: CebolParserInterface;

    constructor(_parent: CebolParserInterface) {
        this.parent = _parent;
    }

    public valid(): boolean {
        return this.parent.current_token.value === KEYWORD_FUNCTION_PRINT
    }

    public statement(): CebolASTNode {
        this.parent.eat(CebolLexicalTokenEnum.KEYWORD) // 'cetak'
        
        this.parent.eat(CebolLexicalTokenEnum.LPARENTHESES) // '('
        const exprNode = this.parent.expr()
        this.parent.eat(CebolLexicalTokenEnum.RPARENTHESES) // ')'
        
        return new CebolPrintNode(exprNode)
    }
}
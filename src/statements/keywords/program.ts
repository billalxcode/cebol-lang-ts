import { KEYWORD_FUNCTION_DEFINE } from "@/constants";
import { CebolProgramNode } from "@/nodes/program";
import { type CebolASTNode, CebolLexicalTokenEnum } from "@/nodes/types"
import type { CebolBasicStatementInterface, CebolParserInterface } from "@/types/nodes"

export class CebolProgramStatement implements CebolBasicStatementInterface {
    public parent: CebolParserInterface;
    private manager: CebolBasicStatementInterface;

    constructor(_parent: CebolParserInterface, _manager: CebolBasicStatementInterface) {
        this.parent = _parent;
        this.manager = _manager;
    }

    public valid(): boolean {
        return this.parent.current_token.value === KEYWORD_FUNCTION_DEFINE
    }

    public statement(): CebolASTNode {
        this.parent.eat(CebolLexicalTokenEnum.KEYWORD) // 'program'

        const nameToken = this.parent.current_token

        this.parent.eat(CebolLexicalTokenEnum.IDENTIFIER) // program name

        this.parent.eat(CebolLexicalTokenEnum.LBRACE) // '{'

        const body: CebolASTNode[] = []
        while (this.parent.current_token.type !== CebolLexicalTokenEnum.RBRACE) {
            body.push(this.manager.statement())
        }

        this.parent.eat(CebolLexicalTokenEnum.RBRACE) // '}'
    
        return new CebolProgramNode(nameToken.value, body)
    }
}
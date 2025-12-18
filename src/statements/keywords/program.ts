import { KEYWORD_FUNCTION_DEFINE } from "@/constants";
import { logger } from "@/logger";
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

	private get current_token() {
		return this.parent.current_token
	}

	private eat(tokenType: CebolLexicalTokenEnum): void {
		this.parent.eat(tokenType)
	}

	public valid(): boolean {
		return this.current_token.value === KEYWORD_FUNCTION_DEFINE
	}

	public statement(): CebolASTNode {
		this.eat(CebolLexicalTokenEnum.KEYWORD) // 'program'

		const nameToken = this.parent.current_token

		this.eat(CebolLexicalTokenEnum.IDENTIFIER) // program name

		this.eat(CebolLexicalTokenEnum.LPARENTHESES) // '('

		const params: string[] = [];
		if (this.current_token.type !== CebolLexicalTokenEnum.RPARENTHESES) {
			params.push(this.current_token.value);
			this.eat(CebolLexicalTokenEnum.IDENTIFIER); // param name

			while (this.current_token.type === CebolLexicalTokenEnum.PUNCTUATION && this.current_token.value === ",") {
				this.eat(CebolLexicalTokenEnum.PUNCTUATION); // ','
				params.push(this.current_token.value);
				this.eat(CebolLexicalTokenEnum.IDENTIFIER); // param name
			}
		}
		this.eat(CebolLexicalTokenEnum.RPARENTHESES) // ')'

		this.eat(CebolLexicalTokenEnum.LBRACE) // '{'

		const bodies: CebolASTNode[] = []
		while (this.current_token.type !== CebolLexicalTokenEnum.RBRACE) {
			bodies.push(this.manager.statement())
		}

		this.eat(CebolLexicalTokenEnum.RBRACE) // '}'

		logger.info(`Completed parsing program: ${nameToken.value} with params: [${params.join(", ")}]`)
		return new CebolProgramNode(nameToken.value, bodies, params)
	}
}

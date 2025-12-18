import { KEYWORD_ELSE, KEYWORD_IF } from "@/constants";
import { logger } from "@/logger";
import { CebolConditionNode } from "@/nodes/condition";
import { type CebolASTNode, CebolLexicalTokenEnum } from "@/nodes/types";
import type {
	CebolBasicStatementInterface,
	CebolParserInterface,
} from "@/types/nodes";

export class CebolConditionStatement implements CebolBasicStatementInterface {
	public parent: CebolParserInterface;
	private manager: CebolBasicStatementInterface;

	constructor(
		_parent: CebolParserInterface,
		_manager: CebolBasicStatementInterface,
	) {
		this.parent = _parent;
		this.manager = _manager;
	}

	private eat(tokenType: CebolLexicalTokenEnum): void {
		this.parent.eat(tokenType);
	}

	public valid(): boolean {
		const current_token = this.parent.current_token;

		return (
			current_token.value === KEYWORD_IF || current_token.value === KEYWORD_ELSE
		);
	}

	public statement(): CebolASTNode {
		this.eat(CebolLexicalTokenEnum.KEYWORD); // 'jika' or 'lainnya'
		const conditionToken = this.parent.current_token;

		const conditionNodes: CebolASTNode[] = [];
		// while (this.parent.current_token.type !== CebolLexicalTokenEnum.RPARENTHESES) {
		//     conditionNodes.push(this.manager.statement())
		// }
		logger.info(`Parsed condition expression for: ${conditionToken.value}`);

		this.eat(CebolLexicalTokenEnum.LBRACE); // '{'

		const body: CebolASTNode[] = [];
		while (this.parent.current_token.type !== CebolLexicalTokenEnum.RBRACE) {
			logger.info(
				`Parsing condition body, current token: ${this.parent.current_token.toString()}`,
			);
			body.push(this.manager.statement());
		}

		this.eat(CebolLexicalTokenEnum.RBRACE); // '}'
		logger.info(`Completed parsing condition: ${conditionToken.value}`);

		return new CebolConditionNode(conditionToken, conditionNodes, body);
	}
}

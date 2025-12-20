import { KEYWORD_VAR } from "@/constants";
import { logger } from "@/logger";
import { CebolAssignNode } from "@/nodes/assignment";
import { type CebolASTNode, CebolLexicalTokenEnum } from "@/nodes/types";
import { CebolVariableNode } from "@/nodes/variable";
import type {
	CebolBasicStatementInterface,
	CebolParserInterface,
} from "@/types/nodes";

export class CebolVariableStatement implements CebolBasicStatementInterface {
	public parent: CebolParserInterface;
	private manager: CebolBasicStatementInterface;

	constructor(
		_parent: CebolParserInterface,
		_manager: CebolBasicStatementInterface,
	) {
		this.parent = _parent;
		this.manager = _manager;
	}

	private get current_token() {
		return this.parent.current_token;
	}

	private eat(type: CebolLexicalTokenEnum): void {
		this.parent.eat(type);
	}

	public valid(): boolean {
		return this.current_token.value === KEYWORD_VAR;
	}

	public statement(): CebolASTNode {
		this.eat(CebolLexicalTokenEnum.KEYWORD); // 'atur'

		this.eat(CebolLexicalTokenEnum.COLON); // ':'

		const varIdentifierToken = this.current_token;
		logger.info(`Variable identifier token: ${varIdentifierToken.toString()}`);
		this.eat(CebolLexicalTokenEnum.IDENTIFIER); // variable identifier
		const varNameToken = this.current_token;
		logger.info(`Variable name token: ${varNameToken.toString()}`);
		this.eat(CebolLexicalTokenEnum.IDENTIFIER); // variable name

		this.eat(CebolLexicalTokenEnum.ASSIGNMENT); // '='

		logger.info(`Parsing variable assignment for: ${varNameToken.value}`);

		const last_token = this.current_token;

		logger.info(`Variable assignment last token: ${last_token.toString()}`);
		if (
			last_token.type === CebolLexicalTokenEnum.NUMBER ||
			last_token.type === CebolLexicalTokenEnum.STRING
		) {
			const expr = this.parent.expr();

			logger.info(`Variable value expression: ${expr.toString()}`);
			logger.info(`Variable assignment type: ${last_token.type}`);
			logger.info(`Creating assignment node for variable: ${varNameToken.value}`);

			return new CebolAssignNode(
				varNameToken,
				expr,
				last_token.type,
			);
		} else if (last_token.type === CebolLexicalTokenEnum.IDENTIFIER) {
			logger.info("Creating variable node assignment for identifier");
			logger.info(`Variable identifier token: ${last_token.toString()}`);
			const expr = this.parent.expr();

			logger.info(`Variable value expression: ${expr.toString()}`);

			return new CebolVariableNode(
				varNameToken.value
			);
		} else {
			throw new Error(`Invalid variable value type: ${last_token.toString()}`);
		}
	}
}

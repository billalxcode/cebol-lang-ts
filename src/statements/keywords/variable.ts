import { KEYWORD_VAR } from "@/constants";
import { logger } from "@/logger";
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

		logger.info(`Token after last eat: ${this.current_token.toString()}`);
		const last_token = this.current_token;

		if (
			last_token.type === CebolLexicalTokenEnum.NUMBER ||
			last_token.type === CebolLexicalTokenEnum.STRING
		) {
			this.eat(last_token.type);

			return new CebolVariableNode(
				varNameToken.value,
				last_token.type,
				last_token,
			);
		} else {
			throw new Error(`Invalid variable value type: ${last_token.toString()}`);
		}
	}
}

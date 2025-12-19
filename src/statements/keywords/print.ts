import { KEYWORD_FUNCTION_PRINT } from "@/constants";
import { logger } from "@/logger";
import { CebolPrintNode } from "@/nodes/print";
import { type CebolASTNode, CebolLexicalTokenEnum } from "@/nodes/types";
import type {
	CebolBasicStatementInterface,
	CebolParserInterface,
} from "@/types/nodes";

export class CebolPrintStatement implements CebolBasicStatementInterface {
	public parent: CebolParserInterface;

	constructor(_parent: CebolParserInterface) {
		this.parent = _parent;
	}

	private eat(type: CebolLexicalTokenEnum): void {
		this.parent.eat(type);
	}

	private get current_token() {
		return this.parent.current_token;
	}

	public valid(): boolean {
		return this.parent.current_token.value === KEYWORD_FUNCTION_PRINT;
	}

	public statement(): CebolASTNode {
		this.eat(CebolLexicalTokenEnum.KEYWORD); // 'cetak'

		this.eat(CebolLexicalTokenEnum.LPARENTHESES); // '('

		const bodies: CebolASTNode[] = [];

		while (this.current_token.type !== CebolLexicalTokenEnum.RPARENTHESES) {
			const last_token = this.current_token;
			logger.info(
				`Last token in print statement parsing: ${last_token.toString()}`,
			);
			if (this.parent.can_expr) {
			    const exprNode = this.parent.expr();
				logger.info(`Expression node parsed in print statement: ${exprNode.toString()}`);
			    bodies.push(exprNode);
			} else {
				bodies.push(this.current_token);
				this.eat(this.current_token.type);
			}
		}

		this.eat(CebolLexicalTokenEnum.RPARENTHESES); // ')'

		logger.info(
			`Print statement bodies: ${bodies.map((b) => b.toString()).join(", ")}`,
		);
		return new CebolPrintNode(bodies);
	}
}

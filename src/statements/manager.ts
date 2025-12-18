import type { CebolASTNode } from "@/nodes/types";
import type {
	CebolBasicStatementInterface,
	CebolParserInterface,
} from "@/types/nodes";
import { CebolKeywordStatement } from "./keywords";

export class CebolStatementManager implements CebolBasicStatementInterface {
	public parent: CebolParserInterface;

	private keyword_statement: CebolBasicStatementInterface;

	constructor(_parent: CebolParserInterface) {
		this.parent = _parent;

		this.keyword_statement = new CebolKeywordStatement(this.parent);
	}

	public valid(): boolean {
		return false;
	}

	public statement(): CebolASTNode {
		if (this.keyword_statement.valid()) {
			return this.keyword_statement.statement();
		} else {
			throw new Error(
				`Unknown statement: ${this.parent.current_token.toString()}`,
			);
		}
	}
}

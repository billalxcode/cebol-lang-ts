import { type CebolASTNode, CebolLexicalTokenEnum } from "@/nodes/types";
import type {
	CebolBasicStatementInterface,
	CebolKeywordSatementInterface,
	CebolParserInterface,
} from "@/types/nodes";
import { CebolConditionStatement } from "./condition";
import { CebolPrintStatement } from "./print";
import { CebolProgramStatement } from "./program";
import { CebolVariableStatement } from "./variable";

export class CebolKeywordStatement implements CebolKeywordSatementInterface {
	public parent: CebolParserInterface;
	private program: CebolBasicStatementInterface;
	private print: CebolBasicStatementInterface;
	private condition: CebolBasicStatementInterface;
	private variable: CebolBasicStatementInterface;

	constructor(_parent: CebolParserInterface) {
		this.parent = _parent;

		this.program = new CebolProgramStatement(this.parent, this);
		this.print = new CebolPrintStatement(this.parent);
		this.condition = new CebolConditionStatement(this.parent, this);
		this.variable = new CebolVariableStatement(this.parent, this);
	}

	public valid(): boolean {
		const currentToken = this.parent.current_token;

		return currentToken.type === CebolLexicalTokenEnum.KEYWORD;
	}

	public statement(): CebolASTNode {
		const token = this.parent.current_token;

		if (this.program.valid()) {
			return this.program.statement();
		} else if (this.print.valid()) {
			return this.print.statement();
		} else if (this.condition.valid()) {
			return this.condition.statement();
		} else if (this.variable.valid()) {
			return this.variable.statement();
		} else {
			throw new Error(`Unknown keyword statement: ${token.toString()}`);
		}
	}
}

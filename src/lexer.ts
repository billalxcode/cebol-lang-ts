import {
	BREAKLINE,
	COMMENT_START,
	DIGITS,
	EQUALS,
	IDENTIFIER_CHARS,
	KEYWORDS,
	OPERATORS,
	PUNCTUATION_COLON,
	PUNCTUATION_LBRACE,
	PUNCTUATION_LPARENTHESES,
	PUNCTUATION_RBRACE,
	PUNCTUATION_RPARENTHESES,
	PUNCTUATIONS,
	STRING_DELIMITER,
	WHITESPACE_CHARS_SINGLE,
} from "@/constants";
import { CebolToken } from "@/nodes/token";
import { CebolLexicalTokenEnum, type CebolTokenInterface } from "@/nodes/types";
import type { CebolLexerInterface } from "./types/nodes";

export class CebolLexer implements CebolLexerInterface {
	public readonly source: string;
	private currentPosition: number;
	private currentChar: string | null = null;

	// TODO: implement line and column tracking
	public currentLine: number = 1;
	public currentColumn: number = 1;

	constructor(_source: string) {
		this.source = _source;
		this.currentPosition = 0;
		this.currentLine = 1;

		const _currentChar = this.source[this.currentPosition];
		if (_currentChar !== undefined) {
			this.currentChar = _currentChar;
		} else {
			this.currentChar = null;
		}
	}

	public advance(): void {
		this.currentPosition++;

		if (this.currentPosition < this.source.length) {
			const _currentChar = this.source[this.currentPosition];
			if (_currentChar !== undefined) {
				this.currentChar = _currentChar;
			} else {
				this.currentChar = null;
			}
		} else {
			this.currentChar = null;
		}
	}

	public skipWhitespaceAndComments(): void {
		while (
			this.currentChar !== null &&
			(WHITESPACE_CHARS_SINGLE.includes(this.currentChar) ||
				this.currentChar === COMMENT_START)
		) {
			this.advance();
		}
	}

	public number(): CebolTokenInterface {
		let result = "";
		while (this.currentChar !== null && DIGITS.includes(this.currentChar)) {
			result += this.currentChar;
			this.advance();
		}
		return new CebolToken(CebolLexicalTokenEnum.NUMBER, result, 0, 0);
	}

	public identifier(): CebolTokenInterface {
		let result = "";
		while (
			this.currentChar !== null &&
			IDENTIFIER_CHARS.includes(this.currentChar)
		) {
			result += this.currentChar;
			this.advance();
		}
		return new CebolToken(CebolLexicalTokenEnum.IDENTIFIER, result, 0, 0);
	}

	public keywordOrIdentifier(): CebolTokenInterface {
		const idToken = this.identifier();
		if (KEYWORDS.includes(idToken.value)) {
			return new CebolToken(
				CebolLexicalTokenEnum.KEYWORD,
				idToken.value,
				idToken.line,
				idToken.column,
			);
		}
		return idToken;
	}

	public getNextToken(): CebolTokenInterface {
		while (this.currentChar !== null) {
			if (
				WHITESPACE_CHARS_SINGLE.includes(this.currentChar) ||
				COMMENT_START === this.currentChar
			) {
				if (this.currentChar === BREAKLINE) {
					this.currentLine++;
					this.currentColumn = 1;
				}
				this.skipWhitespaceAndComments();
				continue;
			}

			if (DIGITS.includes(this.currentChar)) {
				return this.number();
			}

			if (IDENTIFIER_CHARS.includes(this.currentChar)) {
				return this.keywordOrIdentifier();
			}

			if (this.currentChar === EQUALS) {
				this.advance();
				return new CebolToken(CebolLexicalTokenEnum.ASSIGNMENT, EQUALS, 0, 0);
			}

			if (OPERATORS.includes(this.currentChar)) {
				const operator = this.currentChar;
				this.advance();
				return new CebolToken(CebolLexicalTokenEnum.OPERATOR, operator, 0, 0);
			}

			if (PUNCTUATIONS.includes(this.currentChar)) {
				const punctuation = this.currentChar;
				if (punctuation === PUNCTUATION_LBRACE) {
					this.advance();
					return new CebolToken(
						CebolLexicalTokenEnum.LBRACE,
						punctuation,
						0,
						0,
					);
				} else if (punctuation === PUNCTUATION_RBRACE) {
					this.advance();
					return new CebolToken(
						CebolLexicalTokenEnum.RBRACE,
						punctuation,
						0,
						0,
					);
				} else if (punctuation === PUNCTUATION_LPARENTHESES) {
					this.advance();
					return new CebolToken(
						CebolLexicalTokenEnum.LPARENTHESES,
						punctuation,
						0,
						0,
					);
				} else if (punctuation === PUNCTUATION_RPARENTHESES) {
					this.advance();
					return new CebolToken(
						CebolLexicalTokenEnum.RPARENTHESES,
						punctuation,
						0,
						0,
					);
				} else if (punctuation === PUNCTUATION_COLON) {
					this.advance()

					return new CebolToken(
						CebolLexicalTokenEnum.COLON,
						punctuation,
						0,
						0,
					)
				} else {
					this.advance();
					return new CebolToken(
						CebolLexicalTokenEnum.PUNCTUATION,
						punctuation,
						0,
						0,
					);
				}
			}

			if (this.currentChar === STRING_DELIMITER) {
				this.advance(); // skip opening quote
				let result = "";
				while (
					this.currentChar !== null &&
					this.currentChar !== STRING_DELIMITER
				) {
					result += this.currentChar;
					this.advance();
				}
				this.advance(); // skip closing quote
				return new CebolToken(CebolLexicalTokenEnum.STRING, result, 0, 0);
			}

			throw new Error(`Unknown character: ${this.currentChar}`);
		}

		return new CebolToken(CebolLexicalTokenEnum.EOF, "", 0, 0);
	}

	public getCurrentChar(): string | null {
		return this.currentChar;
	}
}

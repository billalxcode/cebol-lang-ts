// Basic characters
export const DIGITS: string = "0123456789";
export const LETTERS: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";
export const IDENTIFIER_START_CHARS: string = LETTERS;
export const IDENTIFIER_CHARS: string = LETTERS + DIGITS;
export const COMMA: string = ",";
export const SEMICOLON: string = ";";
export const COLON: string = ":";
export const BREAKLINE: string = "\n";
export const EQUALS: string = "=";
export const STRING_DELIMITER: string = '"';
export const COMMENT_START: string = "#";

// Operators
export const OPERATOR_PLUS: string = "+";
export const OPERATOR_MINUS: string = "-";
export const OPERATOR_MULTIPLY: string = "*";
export const OPERATOR_DIVIDE: string = "/";
export const OPERATOR_MODULO: string = "%";
export const OPERATOR_POWER: string = "^";
export const OPERATOR_ASSIGN: string = "==";
export const OPERATOR_NOT_EQUAL: string = "!=";
export const OPERATOR_LESS_THAN: string = "<";
export const OPERATOR_LESS_THAN_EQUAL: string = "<=";
export const OPERATOR_GREATER_THAN: string = ">";
export const OPERATOR_GREATER_THAN_EQUAL: string = ">=";
export const OPERATOR_AND: string = "dan";
export const OPERATOR_OR: string = "atau";
export const OPERATOR_NOT: string = "bukan";

// Keywords
export const KEYWORD_FUNCTION_PRINT: string = "cetak";
export const KEYWORD_FUNCTION_RETURN: string = "kembalikan";
export const KEYWORD_FUNCTION_DEFINE: string = "program";
export const KEYWORD_IF: string = "jika";
export const KEYWORD_ELSE: string = "lainnya";
export const KEYWORD_WHILE: string = "selama";
export const KEYWORD_VAR: string = "atur";
// Punctuations
export const PUNCTUATION_LPARENTHESES: string = "(";
export const PUNCTUATION_RPARENTHESES: string = ")";
export const PUNCTUATION_LBRACE: string = "{";
export const PUNCTUATION_RBRACE: string = "}";
export const PUNCTUATION_COMMA: string = COMMA;
export const PUNCTUATION_SEMICOLON: string = SEMICOLON;
export const PUNCTUATION_COLON: string = COLON;

// Whitespace characters
export const WHITESPACE_SPACE: string = " ";
export const WHITESPACE_TAB: string = "\t";
export const WHITESPACE_NEWLINE: string = "\n";
export const WHITESPACE_CARRIAGE_RETURN: string = "\r";

// Types Data
export const TYPE_NUMBER: string = "angka";
export const TYPE_STRING: string = "teks";

// Single collections
export const WHITESPACE_CHARS_SINGLE = [
	WHITESPACE_SPACE,
	WHITESPACE_TAB,
	WHITESPACE_NEWLINE,
	WHITESPACE_CARRIAGE_RETURN,
];

// Collections
export const KEYWORDS = [
	KEYWORD_FUNCTION_PRINT,
	KEYWORD_IF,
	KEYWORD_FUNCTION_DEFINE,
	KEYWORD_ELSE,
	KEYWORD_WHILE,
	KEYWORD_VAR,
	KEYWORD_FUNCTION_RETURN,
];

export const OPERATORS = [
	OPERATOR_PLUS,
	OPERATOR_MINUS,
	OPERATOR_MULTIPLY,
	OPERATOR_DIVIDE,
	OPERATOR_MODULO,
	OPERATOR_ASSIGN,
	OPERATOR_NOT_EQUAL,
	OPERATOR_LESS_THAN,
	OPERATOR_LESS_THAN_EQUAL,
	OPERATOR_GREATER_THAN,
	OPERATOR_GREATER_THAN_EQUAL,
	OPERATOR_AND,
	OPERATOR_OR,
	OPERATOR_NOT,
];

export const ARITHMETIC_OPERATORS = [
	OPERATOR_PLUS,
	OPERATOR_MINUS,
	OPERATOR_MULTIPLY,
	OPERATOR_DIVIDE,
	OPERATOR_MODULO,
	OPERATOR_POWER,
];

export const PUNCTUATIONS = [
	PUNCTUATION_LPARENTHESES,
	PUNCTUATION_RPARENTHESES,
	PUNCTUATION_LBRACE,
	PUNCTUATION_RBRACE,
	PUNCTUATION_COMMA,
	PUNCTUATION_SEMICOLON,
	PUNCTUATION_COLON,
];

export const TYPES_DATA = [TYPE_NUMBER, TYPE_STRING];

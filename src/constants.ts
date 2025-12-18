// Basic characters
export const DIGITS = "0123456789";
export const LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";
export const IDENTIFIER_START_CHARS = LETTERS;
export const IDENTIFIER_CHARS = LETTERS + DIGITS;
export const COMMA = ",";
export const SEMICOLON = ";";
export const BREAKLINE = "\n";
export const EQUALS = "=";
export const STRING_DELIMITER = '"';
export const COMMENT_START = "#";

// Operators
export const OPERATOR_PLUS = "+";
export const OPERATOR_MINUS = "-";
export const OPERATOR_MULTIPLY = "*";
export const OPERATOR_DIVIDE = "/";
export const OPERATOR_MODULO = "%";
export const OPERATOR_ASSIGN = "==";
export const OPERATOR_NOT_EQUAL = "!=";
export const OPERATOR_LESS_THAN = "<";
export const OPERATOR_LESS_THAN_EQUAL = "<=";
export const OPERATOR_GREATER_THAN = ">";
export const OPERATOR_GREATER_THAN_EQUAL = ">=";
export const OPERATOR_AND = "dan";
export const OPERATOR_OR = "atau";
export const OPERATOR_NOT = "bukan";

// Keywords
export const KEYWORD_FUNCTION_PRINT = "cetak";
export const KEYWORD_FUNCTION_RETURN = "kembalikan";
export const KEYWORD_FUNCTION_DEFINE = "program";
export const KEYWORD_IF = "jika";
export const KEYWORD_ELSE = "jika tidak";
export const KEYWORD_WHILE = "selama";
export const KEYWORD_VAR = "atur";

// Punctuations
export const PUNCTUATION_LPARENTHESES = "(";
export const PUNCTUATION_RPARENTHESES = ")";
export const PUNCTUATION_LBRACE = "{";
export const PUNCTUATION_RBRACE = "}";
export const PUNCTUATION_COMMA = COMMA;
export const PUNCTUATION_SEMICOLON = SEMICOLON;

// Whitespace characters
export const WHITESPACE_SPACE = " ";
export const WHITESPACE_TAB = "\t";
export const WHITESPACE_NEWLINE = "\n";
export const WHITESPACE_CARRIAGE_RETURN = "\r";

// Types Data
export const TYPE_NUMBER = "angka";
export const TYPE_STRING = "teks";
export const TYPE_BOOLEAN = "biner"; // TODO: implement boolean type
export const TYPE_VOID = "kosong"; // TODO: implement void type
export const TYPE_ARRAY = "larik"; // TODO: implement array type
export const TYPE_OBJECT = "objek"; // TODO: implement object type
export const TYPE_FUNCTION = "program"; // TODO: implement function type

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

export const PUNCTUATIONS = [
	PUNCTUATION_LPARENTHESES,
	PUNCTUATION_RPARENTHESES,
	PUNCTUATION_LBRACE,
	PUNCTUATION_RBRACE,
	PUNCTUATION_COMMA,
	PUNCTUATION_SEMICOLON,
];

export const TYPES_DATA = [
    TYPE_NUMBER,
    TYPE_STRING,
    TYPE_BOOLEAN,
    TYPE_VOID,
    TYPE_ARRAY,
    TYPE_OBJECT,
    TYPE_FUNCTION,
]
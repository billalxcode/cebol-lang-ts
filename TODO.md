# LEXER (Lexical Analyzer)
- [x] Definisikan enum TokenType
- [x] Number
- [x] String
- [ ] Boolean
- [x] Identifier
- [x] Keyword
- [x] Operator
- [x] Punctuation
- [x] EOF
- [x] Buat interface Token
- [x] type
- [x] value
- [x] line
- [x] column (sebagian - TODO: implement line and column tracking di lexer.ts:22)
- [x] Implementasi reader karakter (peek, advance)
- [x] Skip whitespace
- [x] Handle newline & update line/column
- [x] Parsing number literal
- [x] Parsing identifier
- [x] Keyword recognition (let, print, if, dll)
- [x] Operator recognition (+ - * / = == != < >)
- [x] Punctuation recognition (; , ( ) { })
- [x] Error invalid character
- [x] Support komentar satu baris (#)
- [ ] Support komentar multi baris (/* */)
- [x] Support string literal ("...")
- [ ] Escape sequence string (\n, \t, \")
- [ ] Lexer unit test

# PARSER (Syntax Analyzer)

Core Parser
- [x] Parser class
- [x] Consume token (eat method)
- [x] Peek token (current_token)
- [x] Expect token (error jika tidak cocok)
- [x] EOF handling

Expression Grammar
- [x] Parse expression (expr method)
- [ ] Parse equality (==, !=)
- [ ] Parse comparison (<, >, <=, >=)
- [x] Parse term (+, -)
- [x] Parse factor (*, /)
- [ ] Parse unary (!, -)
- [x] Parse primary
- [ ] Parentheses expression
- [x] Operator precedence (sebagian - hanya +, -, *, /)
- [ ] Associativity rules

Statement Grammar
- [x] Expression statement
- [ ] Variable declaration (let) - ADA ATUR keyword
- [x] Assignment statement (CebolAssignNode)
- [x] Print statement (CebolPrintNode)
- [x] Block statement { }
- [ ] Empty statement (;)

Control Flow
- [ ] If statement (syntax ada di condition.cebol tapi belum diimplement)
- [ ] Else clause
- [ ] While loop
- [ ] For loop

Advanced Statements
- [x] Program definition (CebolProgramStatement)
- [x] Program parameters
- [x] Program body parsing
- [ ] Program calls/invocation

Error Handling
- [x] Syntax error class (basic Error)
- [ ] Error recovery
- [ ] Line & column error reporting
- [x] Unexpected token message

# AST (Abstract Syntax Tree)

Base
- [x] ASTNode base interface (CebolBaseNodeInterface)
- [x] ExpressionNode base (melalui CebolASTNode type)
- [x] StatementNode base

Literal Nodes
- [x] NumberLiteralNode (CebolNumberNode)
- [x] StringLiteralNode (CebolStringNode)
- [ ] BooleanLiteralNode

Expression Nodes
- [ ] IdentifierNode (CebolStringNode dipakai sebagai identifier)
- [x] BinaryExpressionNode (CebolBinaryOpNode)
- [ ] UnaryExpressionNode
- [x] AssignmentExpressionNode (CebolAssignNode)
- [ ] CallExpressionNode

Statement Nodes
- [ ] VariableDeclarationNode (menggunakan assignment + keyword)
- [x] ExpressionStatementNode
- [x] PrintStatementNode (CebolPrintNode)
- [x] BlockStatementNode (dalam CebolProgramNode)
- [ ] IfStatementNode
- [ ] WhileStatementNode
- [ ] ForStatementNode
- [ ] ReturnStatementNode

Program Nodes
- [x] ProgramDefinitionNode (CebolProgramNode)
- [x] Program parameters
- [x] Program body

# INTERPRETER / EVALUATOR

Core Interpreter
- [x] Interpreter class (CebolInterpreter)
- [x] Visitor pattern implementation (visit method)
- [x] Evaluate expression
- [x] Execute statement
- [x] Program entry execution

Expression Evaluation
- [x] Number arithmetic
- [x] String concatenation (sebagian)
- [ ] Boolean logic
- [ ] Comparison evaluation
- [ ] Unary operation evaluation

Statement Execution
- [x] Variable declaration execution (melalui assignment)
- [x] Assignment execution
- [x] Print execution
- [x] Block execution (dalam program)
- [ ] Control flow execution

Program Execution
- [x] Program definition execution
- [ ] Program parameter passing
- [ ] Program call/invocation
- [ ] Program return values
- [ ] Recursive program support

# ENVIRONMENT & SCOPE
- [x] Environment class (globals object)
- [x] Variable define (melalui assignment)
- [x] Variable get (dari globals)
- [x] Variable update
- [ ] Nested environment
- [ ] Scope enter
- [ ] Scope exit
- [ ] Variable shadowing
- [x] Undefined variable error (fallback to string value)

# FUNCTION SUPPORT
- [x] FunctionDeclarationNode (CebolProgramNode)
- [ ] FunctionCallNode
- [x] Parameter parsing (dalam program statement)
- [ ] Argument evaluation
- [ ] Local function scope
- [ ] Return value handling
- [ ] Recursive function support

# BUILT-IN FUNCTION
- [x] print() (cetak keyword)
- [ ] input()
- [ ] len()
- [ ] type()
- [ ] Math helper function

# RUNTIME & ERROR HANDLING
- [ ] RuntimeError class
- [ ] TypeError handling
- [ ] Division by zero check
- [x] Invalid operation error (basic Error)
- [ ] Call stack trace
- [ ] Error message with source context

# TESTING
- [ ] Lexer unit test
- [ ] Parser unit test
- [ ] AST snapshot test
- [ ] Interpreter test
- [ ] Invalid program test
- [ ] Edge case test
- [x] Basic program examples (4 cebol files)

# CLI & TOOLING
- [x] CLI entry (index.ts dengan Bun)
- [x] Run file command (bun run index.ts [file])
- [ ] REPL mode
- [x] Debug flag (logger)
- [ ] Print token list
- [ ] Print AST
- [ ] Pretty AST printer

# LANGUAGE DESIGN
- [ ] Grammar documentation
- [ ] EBNF specification
- [x] Language keyword list (constants.ts)
- [x] Operator precedence table (sebagian)

# ADVANCED (OPSIONAL)
- [ ] Static type checker
- [ ] Type inference sederhana
- [ ] Constant folding
- [ ] Dead code elimination
- [ ] Bytecode generator
- [ ] Virtual machine
- [ ] WASM target
- [ ] Performance benchmark

# DOCUMENTATION
- [x] README
- [ ] Language reference
- [x] Example programs (4 files)
- [ ] Contribution guide

# KNOWN ISSUES & BUGS
- [ ] Line/column tracking tidak berfungsi proper (TODO di lexer.ts:22)
- [ ] String interpolation tidak berfungsi (cetak("Angka x adalah", x) cetak terpisah)
- [ ] Boolean literals (true/false) tidak diimplement
- [ ] Comparison operators tidak berfungsi (==, !=, <, >, <=, >=)
- [ ] Conditional statements (jika/jika tidak) syntax ada tapi tidak diimplement parser
- [ ] Function calls tidak diimplement interpreter
- [ ] Type keywords (angka/teks) diabaikan
- [ ] Multi-line comments tidak didukung
- [ ] String escape sequences tidak didukung

# NEXT PRIORITY TASKS
1. **Fix line/column tracking** - Implement proper error reporting
2. **Implement comparison operators** - Tambahkan parser dan interpreter support
3. **Fix conditional statements** - Implementasi if/jika statement parsing
4. **Implement boolean literals** - Tambahkan true/false support
5. **Fix function calls** - Implementasi program invocation
6. **Add string escape sequences** - Support \n, \t, \" dalam strings
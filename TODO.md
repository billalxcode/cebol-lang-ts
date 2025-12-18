# 🧱 LEXER (Lexical Analyzer)
- [ ] Definisikan enum TokenType
- [ ] Number
- [ ] String
- [ ] Boolean
- [ ] Identifier
- [ ] Keyword
- [ ] Operator
- [ ] Punctuation
- [ ] EOF
- [ ] Buat interface Token
- [ ] type
- [ ] value
- [ ] line
- [ ] column
- [ ] Implementasi reader karakter (peek, advance)
- [ ] Skip whitespace
- [ ] Handle newline & update line/column
- [ ] Parsing number literal
- [ ] Parsing identifier
- [ ] Keyword recognition (let, print, if, dll)
- [ ] Operator recognition (+ - * / = == != < >)
- [ ] Punctuation recognition (; , ( ) { })
- [ ] Error invalid character
- [ ] Support komentar satu baris (//)
- [ ] Support komentar multi baris (/* */)
- [ ] Support string literal ("...")
- [ ] Escape sequence string (\n, \t, \")
- [ ] Lexer unit test

⸻

🌳 PARSER (Syntax Analyzer)

Core Parser
- [ ] Parser class
- [ ] Consume token
- [ ] Peek token
- [ ] Expect token (error jika tidak cocok)
- [ ] EOF handling

Expression Grammar
- [ ] Parse expression
- [ ] Parse equality (==, !=)
- [ ] Parse comparison (<, >, <=, >=)
- [ ] Parse term (+, -)
- [ ] Parse factor (*, /)
- [ ] Parse unary (!, -)
- [ ] Parse primary
- [ ] Parentheses expression
- [ ] Operator precedence
- [ ] Associativity rules

Statement Grammar
- [ ] Expression statement
- [ ] Variable declaration (let)
- [ ] Assignment statement
- [ ] Print statement
- [ ] Block statement { }
- [ ] Empty statement (;)

Control Flow
- [ ] If statement
- [ ] Else clause
- [ ] While loop
- [ ] For loop

Error Handling
- [ ] Syntax error class
- [ ] Error recovery
- [ ] Line & column error reporting
- [ ] Unexpected token message

⸻

🌲 AST (Abstract Syntax Tree)

Base
- [ ] ASTNode base interface
- [ ] ExpressionNode base
- [ ] StatementNode base

Literal Nodes
- [ ] NumberLiteralNode
- [ ] StringLiteralNode
- [ ] BooleanLiteralNode

Expression Nodes
- [ ] IdentifierNode
- [ ] BinaryExpressionNode
- [ ] UnaryExpressionNode
- [ ] AssignmentExpressionNode
- [ ] CallExpressionNode

Statement Nodes
- [ ] VariableDeclarationNode
- [ ] ExpressionStatementNode
- [ ] PrintStatementNode
- [ ] BlockStatementNode
- [ ] IfStatementNode
- [ ] WhileStatementNode
- [ ] ForStatementNode
- [ ] ReturnStatementNode

⸻

🧠 INTERPRETER / EVALUATOR

Core Interpreter
- [ ] Interpreter class
- [ ] Visitor pattern implementation
- [ ] Evaluate expression
- [ ] Execute statement
- [ ] Program entry execution

Expression Evaluation
- [ ] Number arithmetic
- [ ] String concatenation
- [ ] Boolean logic
- [ ] Comparison evaluation
- [ ] Unary operation evaluation

Statement Execution
- [ ] Variable declaration execution
- [ ] Assignment execution
- [ ] Print execution
- [ ] Block execution
- [ ] Control flow execution

⸻

🌍 ENVIRONMENT & SCOPE
- [ ] Environment class
- [ ] Variable define
- [ ] Variable get
- [ ] Variable update
- [ ] Nested environment
- [ ] Scope enter
- [ ] Scope exit
- [ ] Variable shadowing
- [ ] Undefined variable error

⸻

🔧 FUNCTION SUPPORT
- [ ] FunctionDeclarationNode
- [ ] FunctionCallNode
- [ ] Parameter parsing
- [ ] Argument evaluation
- [ ] Local function scope
- [ ] Return value handling
- [ ] Recursive function support

⸻

📦 BUILT-IN FUNCTION
- [ ] print()
- [ ] input()
- [ ] len()
- [ ] type()
- [ ] Math helper function

⸻

⚠️ RUNTIME & ERROR HANDLING
- [ ] RuntimeError class
- [ ] TypeError handling
- [ ] Division by zero check
- [ ] Invalid operation error
- [ ] Call stack trace
- [ ] Error message with source context

⸻

🧪 TESTING
- [ ] Lexer unit test
- [ ] Parser unit test
- [ ] AST snapshot test
- [ ] Interpreter test
- [ ] Invalid program test
- [ ] Edge case test

⸻

🛠️ CLI & TOOLING
- [ ] CLI entry (cebol)
- [ ] Run file command
- [ ] REPL mode
- [ ] Debug flag
- [ ] Print token list
- [ ] Print AST
- [ ] Pretty AST printer

⸻

📐 LANGUAGE DESIGN
- [ ] Grammar documentation
- [ ] EBNF specification
- [ ] Language keyword list
- [ ] Operator precedence table

⸻

🚀 ADVANCED (OPSIONAL)
- [ ] Static type checker
- [ ] Type inference sederhana
- [ ] Constant folding
- [ ] Dead code elimination
- [ ] Bytecode generator
- [ ] Virtual machine
- [ ] WASM target
- [ ] Performance benchmark

⸻

📄 DOCUMENTATION
- [ ] README
- [ ] Language reference
- [ ] Example programs
- [ ] Contribution guide
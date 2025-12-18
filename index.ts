import { positionals } from "./src/arguments";
import { CebolInterpreter } from "./src/interpreter";
import { CebolLexer } from "./src/lexer";
import { logger } from "./src/logger";
import { CebolParser } from "./src/parser";

const program_file = positionals[2] || "programs/hello.cebol";

const source = Bun.file(program_file);
const source_text = await source.text();
if (!source_text) {
	logger.error(`Error: Could not read file ${program_file}`);
	process.exit(1);
}
logger.info(`Reading source from ${program_file}...`);

try {
	logger.info("Source code loaded successfully.");
	const lexer = new CebolLexer(source_text);
	const parser = new CebolParser(lexer);
	const ast = parser.parse();

	const interpreter = new CebolInterpreter();
	interpreter.interpret(ast);
} catch (error) {
	if (error instanceof Error) {
		logger.error(`Error during parsing: ${error.message}`);
		process.exit(1);
	}
}

import { isRepl, positionals } from "./src/arguments";
import { CebolInterpreter } from "./src/interpreter";
import { CebolLexer } from "./src/lexer";
import { logger } from "./src/logger";
import { CebolParser } from "./src/parser";
import { version } from "./package.json"

function welcomeMessage() {
	console.log("Cebol Language REPL");
	console.log("Type 'exit' or 'quit' to leave the REPL.");
	console.log(`Cebol Language Version: ${version}`);
	console.log("-----------------------------------");
}

async function executeRepl() {
	welcomeMessage()

	while (true) {
		const input = prompt("cebol> ");
		if (input === null || input.toLowerCase() === "exit" || input.toLowerCase() === "quit") {
			console.log("Exiting REPL. Goodbye!");
			break;
		}

		try {
			const lexer = new CebolLexer(input);
			const parser = new CebolParser(lexer);
			const ast = parser.parse();

			const interpreter = new CebolInterpreter();
			interpreter.interpret(ast);
		} catch (error) {
			if (error instanceof Error) {
				logger.error(`RuntimeError: ${error.message}`);
			}
		}
	}
}

async function executeFile() {
	if (positionals.length < 3) {
		console.log("Error: No input file specified.");
		process.exit(1);
	}
	const program_file = positionals[2];

	if (!program_file) {
		console.log("Error: No input file specified.");
		process.exit(1);
	}

	if (!Bun.file(program_file).exists()) {
		console.log(`Error: File ${program_file} does not exist.`);
		process.exit(1);
	}

	const source = Bun.file(program_file);
	const source_text = await source.text();
	if (!source_text) {
		console.log(`Error: Could not read file ${program_file}`);
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
			logger.error(`RuntimeError: ${error.message}`);
			process.exit(1);
		}
	}
}

async function main() {
	if (isRepl) {
		await executeRepl()
	} else {
		await executeFile()
	}
}

await main()

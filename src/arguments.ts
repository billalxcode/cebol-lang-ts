import { parseArgs } from "node:util";

export const { values, positionals } = parseArgs({
	args: Bun.argv,
	options: {
		verbose: {
			type: "boolean",
			short: "v",
			default: false,
			description: "Enable verbose logging",
		},
		debug: {
			type: "boolean",
			short: "d",
			default: false,
			description: "Enable debug mode and write debug files",
		}
	},
	strict: true,
	allowPositionals: true,
});

export const isVerbose = values.verbose as boolean;
export const isDebug = values.debug as boolean;

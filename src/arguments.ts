import { parseArgs } from "util";

export const { values, positionals } = parseArgs({
	args: Bun.argv,
	options: {
		verbose: {
			type: "boolean",
			short: "v",
			default: false,
			description: "Enable verbose logging",
		},
	},
	strict: true,
	allowPositionals: true,
});

export const isVerbose = values.verbose as boolean;

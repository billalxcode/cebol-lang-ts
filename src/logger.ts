import pino from "pino";
import { isVerbose } from "./arguments";

export const logger = pino({
	level: process.env.LOG_LEVEL || "info",
	enabled: isVerbose,
	transport: {
		target: "pino-pretty",
	},
});

import winston from "winston";
import { isVerbose } from "./arguments";

export const logger = winston.createLogger({
	level: isVerbose ? "debug" : "info",
	silent: !isVerbose,
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
		winston.format.printf(
			({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`,
		),
	),
	transports: [new winston.transports.Console({})],
});

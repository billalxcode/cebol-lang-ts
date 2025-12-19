import pino from "pino";
import { isVerbose } from "./arguments";
import winston from "winston";

// export const logger = pino({
// 	level: process.env.LOG_LEVEL || "info",
// 	enabled: isVerbose,
// 	safe: true,
// 	transport: {
// 		target: "pino-pretty",
// 	},
// });

export const logger = winston.createLogger({
	level: isVerbose ? "debug" : "info",
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
		winston.format.printf(
			({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`,
		),
	),
	transports: [new winston.transports.Console({})],
})

import { format, createLogger, transports } from "winston";
const { timestamp, combine, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});
export const logger = createLogger({
  format: combine(
    colorize(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    myFormat
  ),
  transports: [new transports.Console()],
});

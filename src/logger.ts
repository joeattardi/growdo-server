import winston from 'winston';

const moduleFormat = winston.format.printf(({ level, message, timestamp, module }) => {
    const prefix = module ? `[${module}]` : '';
    return `${timestamp} ${level}: ${prefix} ${message}`;
});

const format = winston.format.combine(winston.format.timestamp(), winston.format.colorize(), moduleFormat);

const logger = winston.createLogger({
    level: 'info',
    format,
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format
        })
    );
}

export function createLogger(module: string) {
    return logger.child({ module });
}

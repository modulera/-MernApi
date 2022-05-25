import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import moment from 'moment';

let writeToConsole = true; // (process.argv.indexOf('--dev') >= 0);

const colours = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",

    fg: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        crimson: "\x1b[38m" // Scarlet
    },
    bg: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
        crimson: "\x1b[48m"
    }
};

const createLogger = (path, logStatus, message, writeConsole = true, writeLog = true) => {
    if (writeConsole && writeToConsole) { Logger[logStatus](message) }

    if (writeLog) {
        return winston.createLogger({
            transports: [
                new (winston.transports.DailyRotateFile)({
                    filename: `./logs/${path}/${logStatus}-%DATE%-.log`,
                    datePattern: 'YYYYMMDD',
                    zippedArchive: true,
                    maxSize: '20m',
                    // maxFiles: '14d'
                })
            ]
        })[logStatus]({ date: moment().format('YYYY-MM-DD HH:mm:ss'), message })
    }
};

class Logger {
    static info(message) { console.log(colours.fg.green, message, colours.reset) }
    static error(message) { console.log(colours.fg.red, message, colours.reset) }
    static warn(message) { console.log(colours.fg.yellow, message, colours.reset) }
}

// export default Logger;

// export const info = (message, ...rest) => {
//     console.log(message)
//     console.log(...rest);
// };

export default {
    info: (message, writeConsole, writeLog) => createLogger('test', 'info', message, writeConsole, writeLog),
    warn: (message, writeConsole, writeLog) => createLogger('test', 'warn', message, writeConsole, writeLog),
    error: (message, writeConsole, writeLog) => createLogger('test', 'error', message, writeConsole, writeLog),
}

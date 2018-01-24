const yargs = require('yargs');
const arg = yargs.argv._[0];

const { createLogger, transports, format, format: { combine, timestamp, prettyPrint, printf } } = require('winston');

const today = new Date()
let month = today.getMonth() + 1;
month = month < 10 ? '0' + month : month;
const fileDate = `${today.getFullYear()}-${month}-${today.getDate()}`;

const myFormat = printf(info => {
    return `${info.timestamp} - [${info.level}]: ${info.message}`;
});

const logger = createLogger({
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.File({ filename: `${fileDate}.log` })
    ]
})

switch (arg) {
    case 'add':
        logger.info('Is adding info')
        break;
    case 'remove':
        logger.info('Is removing info')
        break;
    default:
        logger.error('An error has occur')
        break;
}
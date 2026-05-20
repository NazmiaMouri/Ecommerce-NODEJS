import * as winston from 'winston';
const myCustomLevels = {
    levels: {
        error: 0,
        success: 1,
        warn: 2,
        info: 3
    },
    colors: {
        info: 'blue',
        warn: 'yellow',
        error: 'red',
        success: 'green'
    }
};
winston.addColors(myCustomLevels.colors);
export const logger = winston.createLogger({

    levels: myCustomLevels.levels,
    level: "info",
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.json(),
        
    ),
    transports: [

        // Also show in console (dev)
        new winston.transports.Console({
            format: winston.format.combine(
                
                winston.format.colorize({ all: true }),
                winston.format.simple()

            )
        })
    ]
},
);


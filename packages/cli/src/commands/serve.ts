import path from 'path';
import {Command} from 'commander';
import {serve} from '@react-and-md-editor/local-api';

const isProd = process.env.NODE_ENV === 'production';

interface IErrType {
    code: string;
}

export const serveCommand = new Command()
    .command('serve [filename]')
    .description('Open a file for editing')
    .option('-p, --port <number>', 'port to run server on', '4005')
    .action(async (filename = 'mynotes.js', options: {port: string}) => {
        let {port} = options;
        //small fix for NaN error, for the "-p=" command
        if (port.charAt(0) === '=') port = port.substring(1);
        try {
            const dir = path.join(process.cwd(), path.dirname(filename));
            await serve(parseInt(port), path.basename(filename), dir, !isProd);
            console.log(
                `Opended ${filename}. Navigate to http://localhost:${port} to edit the file.`,
            );
        } catch (err) {
            const hasErrCode = (e: any): e is IErrType => {
                return e.code;
            };
            if (hasErrCode(err) && err.code === 'EADDRINUSE') {
                console.log(
                    'Error: The Port is already in use. \nTry running on a different port by adding -p 1234 to the command',
                );
            } else {
                if (err instanceof Error) {
                    console.log('An Error occured:', err.message);
                }
            }
            //if starting the server fails => unsuccessful exit
            process.exit(1);
        }
    });

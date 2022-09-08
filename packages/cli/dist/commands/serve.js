"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
const path_1 = __importDefault(require("path"));
const commander_1 = require("commander");
const local_api_1 = require("@react-and-md-editor/local-api");
const isProd = process.env.NODE_ENV === 'production';
exports.serveCommand = new commander_1.Command()
    .command('serve [filename]')
    .description('Open a file for editing')
    .option('-p, --port <number>', 'port to run server on', '4005')
    .action((filename = 'mynotes.js', options) => __awaiter(void 0, void 0, void 0, function* () {
    let { port } = options;
    //small fix for NaN error, for the "-p=" command
    if (port.charAt(0) === '=')
        port = port.substring(1);
    try {
        const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
        yield (0, local_api_1.serve)(parseInt(port), path_1.default.basename(filename), dir, !isProd);
        console.log(`Opended ${filename}. Navigate to http://localhost:${port} to edit the file.`);
    }
    catch (err) {
        const hasErrCode = (e) => {
            return e.code;
        };
        if (hasErrCode(err) && err.code === 'EADDRINUSE') {
            console.log('Error: The Port is already in use. \nTry running on a different port by adding -p 1234 to the command');
        }
        else {
            if (err instanceof Error) {
                console.log('An Error occured:', err.message);
            }
        }
        //if starting the server fails => unsuccessful exit
        process.exit(1);
    }
}));

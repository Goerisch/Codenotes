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
exports.createCellsRouter = void 0;
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const createCellsRouter = (filename, dir) => {
    const router = express_1.default.Router();
    router.use(express_1.default.json());
    const fullPath = path_1.default.join(dir, filename);
    router.get('/cells', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const isLocalApiError = (err) => {
            return typeof err.code === 'string';
        };
        try {
            // Read the file
            const result = yield promises_1.default.readFile(fullPath, { encoding: 'utf8' });
            res.send(JSON.parse(result));
            next();
        }
        catch (err) {
            if (isLocalApiError(err)) {
                if (err.code === 'ENOENT') {
                    // Create new file with default cells
                    yield promises_1.default.writeFile(fullPath, '[]', 'utf8');
                    res.send([]);
                    next();
                }
                else {
                    throw err;
                }
            }
        }
        // If reading fails because of missing file
        // Parse a list of cells from file
        // Send a list of cells back to the browser
    }));
    router.post('/cells', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Take the list of cells from the request obj
        // serialize them
        const { cells } = req.body;
        // Write the cells into the file
        yield promises_1.default.writeFile(fullPath, JSON.stringify(cells), 'utf8');
        res.send({ status: 'ok' });
        next();
    }));
};
exports.createCellsRouter = createCellsRouter;

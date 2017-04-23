import * as fs from 'fs';
import {Console} from 'console';

//export const logger = new Console(process.stdout, process.stderr);

const output = fs.createWriteStream('./log/stdout.log');
export const logger = new Console(output);

import {fileURLToPath} from 'url';

export const filename = fileURLToPath(import.meta.url);

export const dirname = fileURLToPath(new URL('./../', import.meta.url));
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env'), quiet: true });

export const server = {
    config: {
        port: process.env.PORT ? +process.env.PORT : 3000,
        name: process.env.APP_NAME || 'Desafio Aposta Tudo',
    }
};
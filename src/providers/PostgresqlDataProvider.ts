import { IDataProvider, Feature } from 'underflag';
import { Pool, Client } from 'pg';

const DEFAULT_TABLE = 'features';

interface Options {
    /** Table name of data. Default: 'features' */
    tableName?: string,
    /** An instance of postgres connection */
    client: Client | Pool
}

export class PostgresqlDataProvider implements IDataProvider {
    private client: Client | Pool;
    private tableName: string;

    constructor(options: Options) {
        this.client = options.client;
        this.tableName = options.tableName || DEFAULT_TABLE;
    }

    async getAll(): Promise<Feature[]> {
        const { rows } = await this.client.query(`SELECT * FROM ${this.tableName}`);
        return rows as Feature[];
    }

    async get(key: string): Promise<Feature | undefined> {
        const { rows } = await this.client.query(`SELECT * FROM ${this.tableName} WHERE "key" = $1`, [key]);
        return rows.length ? rows[0] as Feature : undefined;
    }
}
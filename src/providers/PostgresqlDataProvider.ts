import { IDataProvider, BaseFeature } from 'underflag';
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

    async getAll(): Promise<BaseFeature[]> {
        const { rows } = await this.client.query(`SELECT * FROM ${this.tableName}`);
        return rows as BaseFeature[];
    }

    async get(key: string): Promise<BaseFeature | undefined> {
        const { rows } = await this.client.query(`SELECT * FROM ${this.tableName} WHERE "key" = $1`, [key]);
        return rows.length ? rows[0] as BaseFeature : undefined;
    }
}
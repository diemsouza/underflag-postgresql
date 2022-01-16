import { IDataProvider, DataModel } from 'underflag';
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

    async getAll(): Promise<DataModel[]> {
        const { rows } = await this.client.query(`SELECT * FROM ${this.tableName}`);
        return rows as DataModel[];
    }

    async get(key: string): Promise<DataModel | undefined> {
        const { rows } = await this.client.query(`SELECT * FROM ${this.tableName} WHERE "key" = $1`, [key]);
        return rows.length ? rows[0] as DataModel : undefined;
    }
}
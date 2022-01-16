import { Underflag, isOn } from 'underflag';
import { PostgresqlDataProvider } from '../../src/providers';
import { Client } from 'pg';
import config from './config.json';

/**
 * create postgres table
CREATE TABLE features (
    id serial4 NOT NULL,
    "key" varchar(200) NOT NULL,
    value varchar(1000) NULL,
    description varchar(200) NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT features_pkey PRIMARY KEY (id)
);
CREATE UNIQUE INDEX features_key_idx ON features USING btree (key);
 */

const print = async (underflag: Underflag, key: string) => {
    const data = await underflag.get(key);
    return {
        key,
        status: isOn(data) ? 'on' : 'off',
        value: data && data.value,
        origin: data && data.origin
    };
};

(async () => {
    // config data provider
    const client = new Client({
        host: config.host,
        user: config.user,
        password: config.pass,
        database: config.database
    });
    await client.connect();
    // use data privider
    const dataProvider = new PostgresqlDataProvider({ client });
    const feature = new Underflag({ dataProvider });

    try {
        // check feature flags
        const list: any[] = [];
        for (const key of config.features) {
            list.push(await print(feature, key));
        }
        list.push(await print(feature, 'other'));
        console.table(list);
    } finally {
        await client.end();
    }
})();
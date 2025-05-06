
# Postgresql Provider

This is a Postgresql provider for underflag (feature flag/feature toggle)

> ⚠️ This repository has been **archived** for visual organization on GitHub.  
> It is part of the [`underflag`](https://github.com/diemsouza/underflag) monorepo, where it's maintained and updated.  
> The package is still available on [NPM](https://www.npmjs.com/package/underflag-postgresql).

## Install

Using npm:

```bash
npm install underflag-postgresql
```

Using yarn:

```bash
yarn add underflag-postgresql
```

## How to use

Import the underflag and prepare to load data provider

```js
import { Underflag } from "underflag";
import { PostgresqlDataProvider } from "underflag-postgresql";
import { Client } from 'pg';

const client = new Client({/* config... */})
await client.connect();
const dataProvider = new PostgresqlDataProvider({ client });
const underflag = new Underflag({ dataProvider });
if (await underflag.isOn("feature")) {
    // ...
}
```

_Attention: Do not forget of create the features table in postgresql with the key and value columns._

Example of table:
```sql 
CREATE TABLE features (
    id serial4 NOT NULL,
    "key" varchar(200) NOT NULL,
    value varchar(1000) NULL,
    description varchar(200) NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT features_pkey PRIMARY KEY (id)
);
CREATE UNIQUE INDEX features_key_idx ON features USING btree (key);

```

Know more on [underflag npm page](https://www.npmjs.com/package/underflag)

### License

[MIT](LICENSE)

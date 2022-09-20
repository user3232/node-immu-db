

# Install & use

```sh
npm install immudb-node
```

```ts
import { Client } from 'immudb-node'

myShowcase()
.catch(console.error)
function myShowcase() {

    const defaultClient = new Client({
        host:       '127.0.0.1',
        port:       3322,
        user:       'immudb',
        password:   'immudb',
        database:   'defaultdb',
    })

    await client.setValEntries({
        kvs: [
            {key: Buffer.of(0), val: Buffer.of(0)},
            {key: Buffer.of(1), val: Buffer.of(1)},
        ]
    })

    console.log(await client.scanDbEntries({
        scanStartAtTxId: Long.fromInt(1, true)
    }))


    await defaultClient.close()
}
```


Remember to have server running:

First run immudb docker image with exposed ports:

```sh
docker run -d -it --rm -p 8080:8080 -p 3322:3322 -p 9497:9497 -p 5432:5432 --name immudb codenotary/immudb:latest
```

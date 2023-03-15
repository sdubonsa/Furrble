async function main() {
    const uri = "mongodb+srv://kavila1:zjGN7yicfCnHjO7Q@itcs4155.cy1wdke.mongodb.net/?retryWrites=true&w=majority";

    const client =  new MongoClient(uri);

    await client.connect();

    await listDatabases(client);

    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    }

    finally {
        await client.close();
    }
}

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases: ");
    console.log(databasesList);
}

main().catch(console.error);
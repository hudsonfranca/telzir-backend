import { createConnection, getConnectionOptions, getConnection } from 'typeorm';

const connection = {
    async create() {
        let name = 'default';
        if (process.env.NODE_ENV === 'test') {
            name = process.env.NODE_ENV;
        }

        const connectionOptions = await getConnectionOptions(name);
        await createConnection({ ...connectionOptions, name: 'default' });
    },

    async close() {
        await getConnection().close();
    },

    async clear() {
        const con = getConnection();
        const entities = con.entityMetadatas;

        entities.forEach(async entity => {
            const repository = con.getRepository(entity.name);
            await repository.query(`DELETE FROM ${entity.tableName}`);
        });
    },
};
export default connection;

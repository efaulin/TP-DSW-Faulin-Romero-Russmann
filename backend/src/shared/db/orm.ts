import { MikroORM } from "@mikro-orm/core";
import { MongoHighlighter } from "@mikro-orm/mongo-highlighter";

export const orm = await MikroORM.init({
    entities: ['dist/classes/**/*.entity.js'],
    entitiesTs: ['src/classes/**/*.entity.ts'],
    dbName: 'tp-dsw',
    type: 'mongo',
    clientUrl: 'mongodb+srv://system:GU9yZXXiyJeYidZN@octavioconlapochoclera.1bx6aqr.mongodb.net/',
    highlighter: new MongoHighlighter(),
    debug: true, // solo en fase de desarrollo
    schemaGenerator: {
        disableForeignKeys: true,
        createForeignKeyConstraints: true,
        ignoreSchema:[]
    }
})

export const syncSchema = async () => {
    const generator = orm.getSchemaGenerator()
    /*
    await generator.dropSchema()
    await generator.createSchema()
    */
    await generator.updateSchema()
}
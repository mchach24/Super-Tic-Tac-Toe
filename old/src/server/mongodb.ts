// @ts-ignore
import { parseConnectionString as parse } from 'mongodb-core';
import { MongoClient } from 'mongodb';
import { Application } from './declarations';
import logger from './logger';

export default function (app: Application) {
  const config = app.get('mongodb');
  const promise = MongoClient.connect(config, { useNewUrlParser: true }).then((client) => {
    // tslint:disable-next-line:no-empty
    const dbName = parse(config, () => {});
    return client.db(dbName);
  }).catch((error) => {
    logger.error(error);
  });

  app.set('mongoClient', promise);
}

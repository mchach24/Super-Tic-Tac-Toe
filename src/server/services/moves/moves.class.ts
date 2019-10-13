import { Db } from 'mongodb';
import { Service, MongoDBServiceOptions } from 'feathers-mongodb';
import { Application } from '../../declarations';
import { Params } from 'express-serve-static-core';

interface MoveData {
    player: Player;
    subboard: ISubBoard;
    square: ISquare;
}

export class Moves extends Service {
  constructor (options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get('mongoClient');

    client.then((db) => {
      this.Model = db.collection('moves');
    });
  }

  public create(data: MoveData, params?: Params) {

    const moveData = data;

    return super.create(moveData, params);
  }
}

import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Moves } from './moves.class';
import hooks from './moves.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'moves': Moves & ServiceAddons<any>;
  }
}

export default function (app: Application) {

  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  const movesService = new Moves(options, app);
  app.use('/moves', movesService);

  // Get our initialized service so that we can register hooks
  const service = app.service('moves');

  service.hooks(hooks);
}


// Configure Feathers app. (Can be re-generated.)
// !code: preface // !end
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as compress from 'compression';
import * as cors from 'cors';
import * as helmet from 'helmet';
import logger from './logger';

import feathers from '@feathersjs/feathers';
import configuration from '@feathersjs/configuration';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';

import middleware from './middleware';
import services from './services';
import appHooks from './app.hooks';
import channels from './channels';

import generatorSpecs from '../../feathers-gen-specs.json';

import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackConfig from '../../webpack.config';

// !code: imports // !end
// !code: init // !end

const app = express(feathers());
const compiler = webpack(webpackConfig);
// !code: use_start // !end

// Load app configuration
app.configure(configuration());
// !<DEFAULT> code: init_config
app.set('generatorSpecs', generatorSpecs);
// !end

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
}));

// Enable security, CORS, compression, favicon and body parsing
app.use(helmet(
  // !code: helmet_config // !end
));
app.use(cors(
  // !code: cors_config // !end
));
app.use(compress(
  // !code: compress_config // !end
));
app.use(express.json(
  // !code: json_config // !end
));
app.use(express.urlencoded(
  // !<DEFAULT> code: urlencoded_config
  { extended: true },
  // !end
));
// app.use(favicon(path.join(app.get('src/client/assets'), 'favicon.ico')));

// !code: use_end // !end

// Set up Plugins and providers
// !code: config_start // !end
app.configure(express.rest(
  // !code: express_rest // !end
));
app.configure(socketio(
  // !code: express_socketio // !end
));

// Configure other middleware (see `middleware/index.ts`)
app.configure(middleware);
// Set up our services (see `services/index.ts`)
app.configure(services);
// Set up event channels (see channels.ts)
app.configure(channels);
// !code: config_middle // !end

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));
// !code: config_end // !end

app.hooks(appHooks);

const moduleExports = app;
// !code: exports // !end
export default moduleExports;

// !code: funcs // !end
// !code: end // !end

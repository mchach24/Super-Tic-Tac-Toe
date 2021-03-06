import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as compress from 'compression';
import * as helmet from 'helmet';
import * as cors from 'cors';

import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
// @ts-ignore
import * as webpackConfig from '../../webpack.config';

import feathers from '@feathersjs/feathers';
import configuration from '@feathersjs/configuration';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';

import { Application } from './declarations';
import logger from './logger';
import middleware from './middleware';
import services from './services';
import appHooks from './app.hooks';
import channels from './channels';
import authentication from './authentication';
import mongodb from './mongodb';
// Don't remove this comment. It's needed to format import lines nicely.

const app: Application = express(feathers());
const compiler = webpack(webpackConfig as webpack.Configuration);

// Load app configuration
app.configure(configuration());

// Webpack
app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
}));

// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(mongodb);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger } as any));

app.hooks(appHooks);

export default app;

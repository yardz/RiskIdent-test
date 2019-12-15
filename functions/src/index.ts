import * as functions from 'firebase-functions';

import server from './server';
exports.api = functions.https.onRequest(server);

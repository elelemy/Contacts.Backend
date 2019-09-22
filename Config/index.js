const Path = require("path");
const env = typeof process.env.NODE_ENV === 'undefined' ? 'local' : process.env.NODE_ENV;
const config = require('./' + env);

//const config = require('./dev');

module.exports = {
	Backend: {
		host: config.BackendUrl,
		port: config.BackendPort,
		routes: {
			cors: { origin: ['*'] },
			validate: {
				failAction: async (request, h, err) => {
					if (process.env.NODE_ENV === 'production') {
						console.error('ValidationError:', err.message); // Better to use an actual logger here.
						throw Boom.badRequest(`Invalid request payload input`);
					} else {
						console.error(err);
						throw err;
					}
					
					console.log(err);
					throw Boom.badRequest(err.message);
					throw err;
				}
			}
		},
		debug: {
			request: ['error']
		}
	},
	SwaggerHostUrl: config.SwaggerHostUrl,
	FrontendUrl: config.FrontendUrl,
	DbHost: config.DbHost,
	DbName: config.DbName,
	DbUsername: config.DbUsername,
	DbPassword: config.DbPassword,
	// SendGridKey: config.SendGridKey,
	...config,
};

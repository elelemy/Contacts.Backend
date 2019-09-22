const Hapi = require('@hapi/hapi');
var config = require('./Config');
const jwt = require('hapi-auth-jwt2');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const Glob = require("glob");
const Path = require("path");
const fs = require('fs');
var Cron = require('node-cron');

const server = Hapi.server(config.Backend);

const validate = async function (decoded, request) {
	//let credentials = await request.server.app.sessionCache.get(decoded.Id);	
	let userId = decoded.UserId;
	let scope = decoded.RoleName;

	if (userId){
		return {
			isValid: true,
			credentials: {
				UserId: userId,
				scope: scope
			}
		}
	} else {
		return {
			isValid: false,
			credentials: {},
		}
	}
};

const setupJwt = async () => {
	await server.register(jwt);
	server.auth.strategy('jwt', 'jwt',
		{
			key: config.Secret || 'NeverShareYourSecret',
			validate: validate,
			verifyOptions: { algorithms: ['HS256'] }
		});
	server.auth.default('jwt');
};


const setupSessionCache = () => {
	const sessionCache = server.cache({
		segment: 'sessions',
		expiresIn: 30 * 60 * 1000,
	});
	server.app.sessionCache = sessionCache;
};

const setupSwagger = async () => {
	await server.register([
		Inert,
		Vision,
		{
			plugin: HapiSwagger,
			options: {
				info: {
					title: 'Tickit.Resive',
					version: '1.0.0',
				},
				grouping: 'tags',
				host: config.SwaggerHostUrl,
				securityDefinitions: {
					jwt: {
						type: 'apiKey',
						name: 'Authorization',
						in: 'header'
					}
				}
			}
		}
	]);
};

const setupStatsd = async () => {
	if (process.env.NODE_ENV) {
		await server.register({
			plugin: HapiStatsd,
			options: config.Statsd
		});
	}
};

const setupRoutes = () => {
	Glob.sync('Web/Routes/*.js', {
		root: __dirname
	}).forEach(file => {
		const route = require(Path.join(__dirname, file));
		server.route(route);
	});
};

const createStorageFolders = () => {
	if (!fs.existsSync(config.StorageFolder)) fs.mkdirSync(config.StorageFolder);
		
	if (!fs.existsSync(`${config.StorageFolder}/Events`)) {
		let eventsPath = Path.join(config.StorageFolder, 'Events');
		fs.mkdirSync(eventsPath);
	}

	if (!fs.existsSync(`${config.StorageFolder}/Users`)) {
		let usersPath = Path.join(config.StorageFolder, 'Users');
		fs.mkdirSync(usersPath);
	}
};


process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});

(async () => {
	await server.register(Inert);
	createStorageFolders();
	await setupJwt();
	setupSessionCache();
	if (process.env.NODE_ENV !='prod') {
		await setupSwagger();
	}
	// await setupSocialMediaAuth();
	setupRoutes();
	//logEndpointAccess();
	await server.start();
	await setupStatsd();

	Cron.schedule('*/2 * * * *', () => {
		//console.log(new Date());
		try {
			if (process.env.NODE_ENV) { // Disable it locally
				ProgramWizardService.CreateProgramInBlockchain();
			}
		} catch (e) {
			console.log('We got an issue creating the rabbit srever', e);
			throw new Error(404);
		}
	});

	Cron.schedule('*/30 * * * *', () => {
		//console.log(new Date());
		try {
			if (process.env.NODE_ENV) { // Disable it locally
				StudentProgramService.StakeEnrollment();
				StudentProgramService.StakeForLastCharge();
			}
		} catch (e) {
			console.log('We got an issue creating the rabbit srever', e);
			throw new Error(404);
		}
	});
	
	Cron.schedule('0 0 * * *', () => {
		try {
			if (process.env.NODE_ENV) { // Disable it locally
				StudentProgramService.SendPayBackEmail();
			}
		} catch (e) {
			console.log('We got an issue running the send pay back email job', e);
			throw new Error(404);
		}
	});

	console.log(`Server running at: ${server.info.uri}`);
})();

module.exports = server;
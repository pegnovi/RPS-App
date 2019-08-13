const pgp = require('pg-promise')({});
const pgpConfig = {
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	database: process.env.PG_DATABASE,
	host: process.env.PG_HOST,
	poolSize: 10, // max number of clients in pool
	idleTimeoutMillis: 1000,
	port: process.env.PG_PORT
};
const db = pgp(pgpConfig);

var changeCase = require('change-case')

var _ = require('lodash');

const bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var passport = require('passport');
var passportJwt = require('passport-jwt');

var JwtStrategy = passportJwt.Strategy;
var ExtractJwt = passportJwt.ExtractJwt;
var jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	// Use diff key and store in env var later
	secretOrKey: process.env.TOKEN_SECRET_OR_KEY || 'abc123'
};

var users = [
	{
		id: 1,
		name: 'jonathanmh',
		password: '%2yx4'
	},
	{
		id: 2,
		name: 'test',
		password: 'test'
	}
];

var startegy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
	console.log('payload received', jwtPayload);
	// ^^ payload will contain id (was hashed into jwt payload when generating token in login route)

	// DB call to check user
	var user = users[_.findIndex(users, {id: jwtPayload.id})];

	if(user) {
		next(null, user);
	}
	else {
		next(null, false);
	}
});

passport.use(startegy);

module.exports = function(app) {

	app.use(passport.initialize());

	app.post('/register', function(req, res) {
		if(req.body.name && req.body.password) {
			var name = req.body.name;
			var password = req.body.password;
		}

		// DB call
		db.task(t => {
			return t.any('SELECT * FROM users WHERE username = ${username}', {username: name})
			.then((targetUser) => {
				console.log(targetUser);
				// If no user with same username exists, create the new user
				if(_.isEmpty(targetUser)) {
					return hashPassword(password, 10)
					.then((hash) => {
						console.log('hash', hash);
						return db_createOne2(
							t,
							'users', 
							{username: name, passwordHash: hash},
							['id']
						);
					});
				}
				else {
					return null;
				}
			})
		})
		.then((createdUserId) => {
			console.log(createdUserId);
			if(createdUserId) {
				res.send(JSON.stringify({message:'Successfully Registered!'}));
			}
			else {
				res.send(JSON.stringify({message:'User already exists!'}));
			}
		})
		.catch((err) => {
			console.log(err);
		});

	});

	app.post('/login', function(req, res) {
		if(req.body.name && req.body.password) {
			var name = req.body.name;
			var password = req.body.password;
		}

		// DB call
		db.one('SELECT * FROM users where username = ${username}', {username: name})
		.then((targetUser) => {
			if(targetUser) {
				console.log(targetUser);
				return verifyPassword(password, targetUser.password_hash)
				.then((result) => {
					if(result) {
						var payload = {id: targetUser.id};
						var token = jwt.sign(payload, jwtOptions.secretOrKey);
						res.json({message: "ok", token: token});
					}
					else {
						res.status(401).json({message: 'login error'});
					}
				});
			}
			else {
				res.status(401).json({message: 'login error'});
			}
		})
		.catch((err) => {
			console.log(err);
		});


	});

	app.get('/secret',
		passport.authenticate('jwt', {session: false}),
		(req, res) => {
			res.json('Success! You can not see this without a token');
		}
	);

	function db_createOne2(dbOrTask, table, data, returnColumns) {

		const sortedKeys = Object.keys(data).sort();

		const queryColumnsString = sortedKeys
		.map((key) => {
			return changeCase.snakeCase(key);
		})
		.join(', ');

		const returningColumnsString = returnColumns.join(', ');

		const queryValuesString = sortedKeys
		.map((key) => {
			return ('${' + key + '}');
		})
		.join(', ');

		return dbOrTask.one('INSERT INTO ' + table +
			' (' + queryColumnsString + ') ' +
			'VALUES (' + queryValuesString + ') ' + 
			'RETURNING ' + returningColumnsString + ';',
			data
		);
	}

	function db_createOne(table, data) {

		const sortedKeys = Object.keys(data).sort();

		const queryColumnsString = sortedKeys
		.map((key) => {
			return changeCase.snakeCase(key);
		})
		.join(', ');

		const queryValuesString = sortedKeys
		.map((key) => {
			return ('${' + key + '}');
		})
		.join(', ');

		return db.one('INSERT INTO ' + table +
			' (' + queryColumnsString + ') ' +
			'VALUES (' + queryValuesString + ') RETURNING id',
			data
		);
	}

	function createOne(relation, targetKeys) {

		app.post(`/api/${relation}`, (req, res) => {

			var data = req.body;
			const filteredData = Object.keys(data)
			.filter(key => targetKeys.includes(key))
			.reduce((obj, key) => {
					obj[key] = data[key];
					return obj;
			}, {});

			db_createOne(relation, filteredData)
			.then((data) => {
				res.send(data);
			})
			.catch(function(err) {
				throw err;
			});
		});
	}

	createOne('users', ['username', 'passwordHash']);


};


//https://stackoverflow.com/questions/6832445/how-can-bcrypt-have-built-in-salts
const saltRounds = 10;
const plaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

function hashPassword(password, saltRounds) {
	return bcrypt.hash(password, saltRounds).then((hash) => {
		// Store hash in your password DB.
		return hash;
	});
}

function verifyPassword(password, passwordHash) {
	return bcrypt.compare(password, passwordHash).then((result) => {
		return result;
	});
}

// .then(function(hash) {
// 	return bcrypt.compare(myPlaintextPassword, hash).then(function(res) {
// 		// res == true
// 		console.log(res);

// 		return hash;
// 	});
// })
// .then(function(hash) {
// 	return bcrypt.compare(myPlaintextPassword, hash).then(function(res) {
// 		// res == false
// 		console.log(res);
// 	});
// })
// .catch(function(err) {
// 	console.log(err);
// });



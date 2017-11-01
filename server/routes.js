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

var jwt = require('jsonwebtoken');

var passport = require('passport');
var passportJwt = require('passport-jwt');

var JwtStrategy = passportJwt.Strategy;
var ExtractJwt = passportJwt.ExtractJwt;
var jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: 'abc123'
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

	app.post('/login', function(req, res) {
		if(req.body.name && req.body.password) {
			var name = req.body.name;
			var password = req.body.password;
		}
		// DB call
		var user = users[_.findIndex(users, {name, name})];
		if(!user) {
			res.status(401).json({message: 'no such user found'});
		}

		if(user.password === req.body.password) {
			// from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
			var payload = {id: user.id};
			var token = jwt.sign(payload, jwtOptions.secretOrKey);
			res.json({message: "ok", token: token});
		}
		else {
			res.status(401).json({message:"passwords did not match"});
		}
		
	});

	app.get('/secret',
		passport.authenticate('jwt', {session: false}),
		(req, res) => {
			res.json('Success! You can not see this without a token');
		}
	);

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

	createOne('users', ['username', 'password']);


};
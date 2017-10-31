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

module.exports = function(app) {
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
const app = require('./app');

const PORT = 9000;

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});
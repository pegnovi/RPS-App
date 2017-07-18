import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	clickHandler() {
		console.log('hello');
	}
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to React</h2>
				</div>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>

				<button onClick={this.clickHandler}>
					Test
				</button>

			</div>
		);
	}
}

export default App;

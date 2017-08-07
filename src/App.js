import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import GameContainer from './components/GameContainer';

const imageMap = {
	rock: {
		standard: require('./images/rockHandSign.gif'),
		flipped: require('./images/rockHandSignFlipped.gif')
	},
	scissor: {
		standard: require('./images/scissorHandSign.gif'),
		flipped: require('./images/scissorHandSignFlipped.gif')
	},
	paper: {
		standard: require('./images/paperHandSign.gif'),
		flipped: require('./images/paperHandSignFlipped.gif')
	}
}

class App extends Component {
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

				<img id="myImage" src={imageMap['scissor']['standard']}
				data-animated-source={imageMap['scissor']['standard']}
				width="360" height="360"
				data-autoplay="1"
				alt=""
				onLoad={() => console.log('LOADED')} />

				{
					document.getElementById('myImage')
				}

				<GameContainer />


			</div>
		);
	}
}

export default App;

import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import GameContainer from './components/GameContainer';

// const imageMap = {
// 	rock: {
// 		standard: require('./images/rockHandSign.gif'),
// 		flipped: require('./images/rockHandSignFlipped.gif')
// 	},
// 	scissor: {
// 		standard: require('./images/scissorHandSign.gif'),
// 		flipped: require('./images/scissorHandSignFlipped.gif')
// 	},
// 	paper: {
// 		standard: require('./images/paperHandSign.gif'),
// 		flipped: require('./images/paperHandSignFlipped.gif')
// 	}
// }

class App extends Component {
	render() {

		return (
			<div className="App">

				<MuiThemeProvider>
					<GameContainer />
				</MuiThemeProvider>

			</div>
		);
	}
}

export default App;

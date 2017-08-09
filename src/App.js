import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import GameContainer from './components/GameContainer';

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

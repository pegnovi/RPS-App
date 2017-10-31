import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import GameContainer from './components/GameContainer';
import LoginPanel from './components/LoginPanel';

class App extends Component {
	render() {

		return (
			<div className="App">
				<MuiThemeProvider>
					<div>
						<LoginPanel/>
						<GameContainer/>
					</div>
				</MuiThemeProvider>
			</div>
		);
	}
}

export default App;

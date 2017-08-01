import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

import * as gameStateActionCreators from '../actions/gameStateActions';
import Lobby from './Lobby';
import Play from './Play';

// Something to consider
// https://github.com/reactjs/redux/issues/419
class GameContainer extends Component {
	render(){
		return (
			<div>
				<Lobby gameState={this.props.gameState}
					joinGame={this.props.joinGame}
					roomComplete={this.props.roomComplete}
					allReady={this.props.allReady}
				/>

				<Play gameState={this.props.gameState} />

			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		gameState: state.gameState
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(gameStateActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);

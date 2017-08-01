import React, { Component } from 'react';
// import {connect} from 'react-redux'
// import {bindActionCreators} from 'redux';
// import * as gameStateActionCreators from '../actions/gameStateActions';

export default class Lobby extends Component {
	render() {
		const gameState = this.props.gameState;
		if(gameState === 'LOBBY') {
			return (
				<input type="button"
					name="join"
					value="join"
					onClick={() => this.props.joinGame()}
				/>
			);
		}
		else if(gameState === 'WAITING_FOR_OPPONENT') {
			return (
				<div>
					<p> Waiting... </p>
					{/* Temporary for testing */}
					<input type="button"
						name="joinOther"
						value="joinOther"
						onClick={() => this.props.roomComplete()}
					/>
				</div>
			);
		}
		else if(gameState === 'WAITING_FOR_READY') {
			return (
				<div>
					<input type="button"
						name="ready"
						value="ready"
						onClick={() => console.log('ready')}
					/>
					{/* Temporary for testing */}
					<input type="button"
						name="readyOther"
						value="readyOther"
						onClick={() => this.props.allReady()}
					/>
				</div>
			);
		}
		else {
			return (<div></div>);
		}

	}
}

// function mapStateToProps(state){
// 	return {
// 		gameState: state.gameState
// 	}
// }

// function mapDispatchToProps(dispatch){
// 	return bindActionCreators(gameStateActionCreators, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Lobby);

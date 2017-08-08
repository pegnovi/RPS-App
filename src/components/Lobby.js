import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';

export default class Lobby extends Component {
	render() {
		const gameState = this.props.state;
		if(gameState === 'LOBBY') {
			return (
				<RaisedButton
					label='join'
					onClick={() => this.props.joinGame()}
				/>
			);
		}
		else if(gameState === 'WAITING_FOR_OPPONENT') {
			return (
				<div>
					<p> Waiting... </p>
					{/* Temporary for testing */}
					<input type='button'
						name='joinOther'
						value='joinOther'
						onClick={() => this.props.roomComplete()}
					/>
				</div>
			);
		}
		else if(gameState === 'WAITING_FOR_READY') {
			return (
				<div>
					<RaisedButton
						label='ready'
						onClick={() => this.props.setReady()}
					/>
					{/* Temporary for testing */}
					<input type='button'
						name='readyOther'
						value='readyOther'
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

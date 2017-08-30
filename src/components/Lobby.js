import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';
import CircularProgress from 'material-ui/CircularProgress';

export default class Lobby extends Component {
	constructor(props) {
		super(props);
		this.state = {
			roomId: ''
		};
	}
	updateInputValue(evt) {
		this.setState({
			roomId: evt.target.value
		});
	}
	render() {
		const gameState = this.props.state;
		if(gameState === 'LOBBY' || gameState === 'LOBBY_JOIN_ROOM_FAILED') {
			return (
				<div>
					<input value={this.state.roomId} onChange={evt => this.updateInputValue(evt)}/>
					<RaisedButton
						label='join'
						onClick={() => this.props.joinGame(this.state.roomId)}
					/>
				</div>
			);
		}
		else if(gameState === 'WAITING_FOR_OPPONENT') {
			return (
				<div>
					<p> Waiting for an opponent... </p>
					<CircularProgress mode="indeterminate" />
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
					<p> Opponent found, ready? </p>
					<RaisedButton
						label='ready'
						onClick={() => this.props.setReady()}
					/>
				</div>
			);
		}
		else {
			return (<div></div>);
		}

	}
}

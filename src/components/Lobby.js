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
					<div>
						<span>
							<h1 className={'Title-letter'}>R</h1>
							<h3 className={'Title-text'}>ock - </h3>
							<h1 className={'Title-letter'}>P</h1>
							<h3 className={'Title-text'}>aper - </h3>
							<h1 className={'Title-letter'}>S</h1>
							<h3 className={'Title-text'}>cissors - </h3>
							<h1 className={'Title-letter'}>O</h1>
							<h3 className={'Title-text'}>nline</h3>
						</span>
					</div>
					<br/>
					<br/>
					<div>
						<input 
							value={this.state.roomId}
							onChange={evt => this.updateInputValue(evt)}
							placeholder={'Optional Room Id'}
						/>
						<RaisedButton
							label='start'
							onClick={() => this.props.joinGame(this.state.roomId)}
						/>
					</div>
				</div>
			);
		}
		else if(gameState === 'WAITING_FOR_OPPONENT') {
			return (
				<div>
					<h3> Waiting for an opponent... </h3>
					<CircularProgress mode="indeterminate" />
				</div>
			);
		}
		else if(gameState === 'WAITING_FOR_READY') {
			return (
				<div>
					<h3> Opponent found! </h3>
					<h4> Match will begin when both players are ready. </h4>
					{/* TODO: Add indicator that button has been pressed */}
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

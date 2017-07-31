import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

import { startGame } from '../actions/playerstateActions';

class GameContainer extends Component {
	render(){
		return (
			<div>
				<p>Testing</p>
				<input type="button" name="play" value="play" onClick={() => this.props.startGame('start')} />
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		playerstate: state.playerstate
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({ startGame: startGame }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);

import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import RockButton from './RockButton';

import {playRockHand} from '../actions/hangsignActions';

class HandsignContainer extends Component {

	render(){
		return (
			<div>
				<RockButton onRockClick={() => this.props.playRockHand('rock')} />
			</div>
		);
	}

}

function mapStateToProps(state){
	return {
		handsign: state.handsign
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({playRockHand: playRockHand}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HandsignContainer);

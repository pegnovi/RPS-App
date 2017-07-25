import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import RockButton from './RockButton';
import {playRockHand} from '../actions/hangsignActions';

class HandsignContainer extends Component {
	onRockSignClicked(){
		//dispatch action?
	}

	render(){
		return (
			<div>
				<RockButton />
			</div>
		);
	}

}

const mapStateToProps = state => {
  return {
    handsign: state.handsign
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({playRockHand: playRockHand}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HandsignContainer);

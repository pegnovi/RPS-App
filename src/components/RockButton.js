import React, {Component} from 'react';
import {connect} from 'react-redux';

class RockButton extends Component {
	onClick(){
		console.log('rock clicked');
	}

	render(){
		return (
			<input type='button' name='rock' value='rock' onClick={this.onClick.bind(this)} />
		);
	}
}

function mapStateToProps(state){
	console.log('map')
	return {
		handsign: state.handsign
	}
}

export default connect(mapStateToProps)(RockButton);

//list of things to do to make a rock button.
//
// markup - check
// connect store - check
// parent component - check
// click handler: bubble event/action up?
// handsign reducer - check
// handsign actions - check
// store handsigns
// all components aware of handsign state

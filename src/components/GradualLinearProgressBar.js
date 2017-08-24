import React, {Component} from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import PropTypes from 'prop-types';

/*
	progress bar that ticks by 1 point every second
	accepts max and min second values as props
 */
class GradualLinearProgressBar extends Component {
	intervalInstance;
	tickAmount = 1;

	constructor(props){
		super(props);
		this.state = {
			elapsedTime: 0
		};
	}

	componentDidMount(){
		this.intervalInstance = setInterval(() => {
			this.setState({elapsedTime: this.state.elapsedTime + this.tickAmount});
		}, 1000);
	}

	componentWillUnmount() {
		//clear the interval when the element is removed from the DOM
		clearInterval(this.intervalInstance);
	}

	render(){
		return (
			<LinearProgress
				mode='determinate'
				value={this.state.elapsedTime}
				min={this.props.minTime}
				max={this.props.maxTime}
			/>
		);
	}
}

// if no props passed use these
GradualLinearProgressBar.defaultProps = {
	minTime: 0,
	maxTime: 5
};

// props must be numbers
GradualLinearProgressBar.propTypes = {
	minTime: PropTypes.number,
	maxTime: PropTypes.number
};

export default GradualLinearProgressBar;

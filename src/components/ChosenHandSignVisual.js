import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

export default class ChosenHandSignVisual extends Component {
	render() {
		return (
			<div>
				<span className="fa-stack fa-3x">
					<FontAwesome
						name={'circle'}
						size='3x'
						style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
						stack='2x'
					/>
					<FontAwesome
						name={'hand-' + this.props.handSign + '-o'}
						size='lg'
						style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
						stack='1x'
						inverse={true}
						spin
					/>
				</span>
				<p>{this.props.handSign}</p>
			</div>
		);
	}
}


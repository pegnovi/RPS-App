export const playRockHand = (state) => {
	return {
		type: 'ROCK_SIGN_CLICKED',
		payload: state
	};
}

export const playScissorHand = (state) => {
	return {
		type: 'SCISSOR_SIGN_CLICKED',
		payload: state
	};
}

// is this bad practice? can handle unlimited number of handsigns
export const playHandSign = (state) => {
	const type = state.toUpperCase() + '_SIGN_CLICKED';
	return {
		type: type,
		payload: state
	};
}
//TODO implement scissor action
//TODO implement paper action

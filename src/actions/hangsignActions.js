// action creator for all handsign types
export const playHandSign = (state) => {
	const type = 'HANDSIGN_SELECTED';
	return {
		type: type,
		payload: state
	};
}

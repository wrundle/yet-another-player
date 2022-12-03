export const removeSpaces = str => str.split(' ').join('');


export const normalizeDuration = (durationInSeconds) => {
	const minutes = '' + Math.floor(durationInSeconds / 60);
	const seconds = '' + (durationInSeconds - minutes * 60);
	return `${minutes}:${seconds.length > 1 ? seconds : '0' + seconds}`;
};


export const getImageSrcFromBuffer = (arrayBuffer, onLoadCallback) => {
	const bytes = new Uint8Array(arrayBuffer);
	const blob = new Blob([bytes.buffer]);
	const reader = new FileReader();
	reader.onload = onLoadCallback;
	reader.readAsDataURL(blob);
};

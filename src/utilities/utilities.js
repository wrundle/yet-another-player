export const isObjectEmpty = (obj) => {
	for (const key in obj) return false;
	return true;
};

export const removeSpaces = str => str ? str.split(' ').join('') : '';

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

export const colorRangeSlider = (slider, isBeignHovered) => {
	const color = isBeignHovered ? '#1DB954' : '#FFF';
	const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
	slider.style.background = 'linear-gradient(to right, ' + color + ' 0%, ' + color + ' ' + value + '%, #5E5E5E ' + value + '%, #5E5E5E 100%)';
};

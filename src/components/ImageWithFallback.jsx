import React from 'react';

const DEFAULT_FALLBACK = 'https://placehold.co/600x400@2x.png';

const ImageWithFallback = ({ src, alt, className = '', fallbackSrc = DEFAULT_FALLBACK, onImageError, ...rest }) => {
	const [currentSrc, setCurrentSrc] = React.useState(src || fallbackSrc);
	const [hasError, setHasError] = React.useState(false);

	React.useEffect(() => {
		setCurrentSrc(src || fallbackSrc);
		setHasError(false);
	}, [src, fallbackSrc]);

	const handleError = () => {
		if (!hasError) {
			setCurrentSrc(fallbackSrc);
			setHasError(true);
			if (typeof onImageError === 'function') onImageError();
		}
	};

	return (
		<img src={currentSrc} alt={alt} className={className} onError={handleError} loading="lazy" {...rest} />
	);
};

export default ImageWithFallback; 
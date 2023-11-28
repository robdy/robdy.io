import React, { useState, useEffect } from 'react';

const ReadingProgress = () => {
	const [scrollProgress, setScrollProgress] = useState(0);

	const handleScroll = () => {
		const contentDiv = document.getElementById('blog-post-content');
		if (!contentDiv) return;
		
		const scrollWindow = window.scrollY;
		if (scrollWindow === 0) {
			setScrollProgress(0)
			return
		}

		const contentHeight = contentDiv.clientHeight;
		const contentPosition = contentDiv.offsetTop;
		const heightWindow = window.innerHeight;
		const scrollDiv = scrollWindow - contentPosition;
		const scrollPercentage = ((scrollDiv + heightWindow) / contentHeight) * 100;
		setScrollProgress(scrollPercentage);
	};

	useEffect(() => {
		const contentDiv = document.getElementById('blog-post-content');

		if (contentDiv) {
			window.addEventListener('scroll', handleScroll);

			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		}
	}, []);

	const progressBarStyle = {
		'width': `${scrollProgress}%`,

	};

	return (
		<div className="reading-progress-bar">
			<div className="reading-progress" style={progressBarStyle}></div>
		</div>
	);
};

export default ReadingProgress;
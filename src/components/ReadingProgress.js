import { reduce } from 'lodash';
import React, { useState, useEffect } from 'react';

const ReadingProgress = () => {
	const [scrollProgress, setScrollProgress] = useState(0);

	const handleScroll = () => {
		const contentDiv = document.getElementById('blog-post-content');
		if (!contentDiv) return;

		const contentHeight = contentDiv.clientHeight;
		const scrollTop = contentDiv.scrollTop;
		const scrollPercentage = (scrollTop / (contentHeight - contentDiv.clientHeight)) * 100;
		setScrollProgress(scrollPercentage);
	};

	useEffect(() => {
		const contentDiv = document.getElementById('content');

		if (contentDiv) {
			contentDiv.addEventListener('scroll', handleScroll);

			return () => {
				contentDiv.removeEventListener('scroll', handleScroll);
			};
		}
	}, []);

	const progressBarStyle = {
		width: `${scrollProgress}%`,
		'background-color': 'red',
		height: '10px',
	};

	return (
		<div className="reading-progress-bar">
			<div className="reading-progress" style={progressBarStyle}></div>
		</div>
	);
};

export default ReadingProgress;
export function onVisible(node: HTMLElement, callback: () => unknown) {
	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				callback();
				observer.disconnect(); // only fire once
			}
		},
		{ threshold: 0.5 } // 50% of the element must be visible
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}

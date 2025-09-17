{
	/* container-query */

	const wrapperNodes = document.querySelectorAll('#container-query .wrapper');
	for (const wrapperNode of wrapperNodes) {
		const nodeContent = wrapperNode.querySelector('.content');
		const nodeContainer = wrapperNode.querySelector('.container');
		nodeContent && nodeContainer?.style.setProperty('--content-height', `${nodeContent.clientHeight}px`);
	}
}
{
	/* transform-scale */

	/**
	 * chromium-gost не воспринимает calc для значений с единицами изменения,
	 *	работает только для целочисленных значений
	 */

	const contentElements = document.querySelectorAll('#transform-scale .content');
	for (const contentElement of contentElements) {
		contentElement?.style.setProperty('--content-height', `${contentElement.clientHeight}`);
	}
}
{
	/* container-query + transform-scale */

	/**
	 * chromium-gost не воспринимает calc для значений с единицами изменения,
	 *	работает только для целочисленных значений
	 */

	const wrapperNodes = document.querySelectorAll('#container-query-transform-scale .wrapper');
	for (const wrapperNode of wrapperNodes) {
		const nodeContent = wrapperNode.querySelector('.content');
		const nodeContainer = wrapperNode.querySelector('.container');
		nodeContent && nodeContainer?.style.setProperty('--content-height', `${nodeContent.clientHeight}`);
	}
}
{
	/* transform-scale to calculated ratio */

	/**
	 * chromium-gost не воспринимает calc для значений с единицами изменения,
	 *	работает только для целочисленных значений
	 */

	const contentElements = document.querySelectorAll('#transform-scale-to-calculated-ratio .content');
	for (const contentElement of contentElements) {
		const containerElement = contentElement.parentElement;
		const contentHeight = contentElement.clientHeight;
		const containerHeight = containerElement.clientHeight;
		const ratio = containerHeight / contentHeight;
		contentElement?.style.setProperty('--ratio', `${ratio > 1 ? 1 : ratio}`);
	}
}

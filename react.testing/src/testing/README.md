### Hi there

This are documentation and examples for accessibility testing utils;

#### Table of content

-   [AccessibilityContainer class](#accessibilitycontainer)
-   [checkAccessibility function](#checkaccessibility)

#### checkAccessibility()

It's a simple async testing function for simple components. U just run this function and then u get the results.

##### Arguments

-   element - React element to test or function that receives html container and returns react element.
-   action - optional function that receives testing enzyme container and does smth with it.

##### Example

```tsx
import * as React from 'react';
import { checkAccessibility } from './lib/checkAccessibility';

interface IButton {
	text?: string;
}

const Button: React.FC<IButton> = props => {
	const [state, setState] = React.useState<boolean>(false);

	return <button onClick={() => setState(prev => !prev)}>{state ? '' : props.text}</button>;
};

describe('<Button />', () => {
	it('is accessible', async done => {
		const results = await checkAccessibility(<Button text="Text" />, container => {
			container.find('button').simulate('click');
		});

		expect(results.violations).toEqual([]);
		done();
	});
});
```

The example above shows the error detection case for interactive components.

#### AccessibilityContainer

AccessibilityContainer class suited for step-by-step testing. It's perfect for components with complex logic and functionality. It has special [destroy()](#accessibilitycontainerdestroy) method, that u should run after all test ro prevent memory leaks.

##### Methods

-   [constructor](#accessibilitycontainerconstructor)
-   [action](#accessibilitycontaineraction)
-   [axeCheck](#accessibilitycontaineraxecheck)
-   [destroy](#accessibilitycontainerdestroy)

##### AccessibilityContainer.constructor()

###### Arguments:

-   component - react element or function that receives html container and returns react element.

##### AccessibilityContainer.action()

Use this method if u want just to interact with container. It's perfect to prepare the container for tests.

###### Arguments:

-   action - function that receives testing enzyme container and does smth with it.

###### Returns:

-   the result of the action

##### AccessibilityContainer.axeCheck()

This async method runs axe-core accessibility check.

###### Arguments:

-   action - optional function that receives testing enzyme container and does smth with it.

###### Returns:

-   the result of the test

##### AccessibilityContainer.destroy()

Destroy the container. Do not forget to run this method after all tests.

##### Example

```tsx
import * as React from 'react';
import { AccessibilityContainer } from './lib/AccessibilityContainer';

interface IButton {
	text?: string;
}

const Button: React.FC<IButton> = props => {
	const [state, setState] = React.useState<boolean>(false);

	return <button onClick={() => setState(prev => !prev)}>{state ? '' : props.text}</button>;
};

describe('<Button />', () => {
	it('is accessible', async done => {
		const wrapper = new AccessibilityContainer(<Button text="Text" />);
		wrapper.action(container => container.find('button').simulate('click'));

		const results = await wrapper.axeCheck(container => container.find('button').simulate('click'));

		wrapper.destroy();

		expect(results.violations).toEqual([]);

		done();
	});
});
```

# Component's test DoD

## Критерии эффективности тестов:

1.  **Защита от багов (Protection against bugs)**  
    Сколько ошибок способен выявить тест
2.  **Скорость обратной связи (Fast Feedback)**  
    Стоимость устранения бага увеличивается в зависимости от этапа жизненного цикла проекта, на котором был обнаружен баг:  
    Development ➤ Quality Assurance (QA) ➤ Production
3.  **Простота поддержки (Maintainability)**  
    – насколько сложно понять тест (размер и простота тестов)  
    – насколько сложно этот тест запускать (количество внешних зависимостей)
4.  **Устойчивость к рефакторингу (Resilience to Refactoring)**  
    Качество кода снижается с течением времени, требуется рефакторинг.  
    Если после рефакторинга тесты выдают много ложных срабатываний, доверие к ним теряется.

    **Хрупкие тесты**:  
    🚫 тесты деталей реализации (Structural inspection)  
    🚫 тесты исходного кода (Source code inspection)

    **Устойчивые тесты**:  
    ✅ тесты конечных результатов, а не деталей реализации

## Содержание теста компонента

1. a11y-test by [AXE](https://www.deque.com/axe/)

    - выявляет множество особенностей a11y-компонент
    - можно применять на любом этапе разработки компонента
    - прост в поддержке
    - устойчив к рефакторингу

2. Тест label компонента

    - компонент должен иметь возможность задать свой label (обычно при помощи `ariaLabel`-пропса)
    - можно применять на любом этапе разработки компонента
    - прост в поддержке
    - устойчив к рефакторингу

Пример верстки Selectbox:

```html
<div
	role="combobox"
	id="selectbox-anchor"
	aria-activedescendant=""
	aria-expanded="false"
	aria-haspopup="listbox"
	aria-labelledby="selectbox-anchor-label"
	aria-owns="selectbox-listbox"
>
	<span
		id="selectbox-anchor-label"
		class="visually-hidden"
		aria-hidden="true"
	>
		tested-component-aria-label
	</span>
	<div
		role="textbox"
		aria-controls="selectbox-listbox"
		aria-labelledby="selectbox-anchor-label"
		aria-readonly="true"
	>
		tested-component-placeholder
	</div>
</div>
```

Пример теста:

```tsx
const labelId = combobox.getAttribute('aria-labelledby') ?? '';
expect(labelId).not.toBe('');
const label = combobox.querySelector(`#${labelId}`);
expect(label).toBeInTheDocument();
expect(label).toHaveTextContent(propsDefault['aria-label']);
expect(textbox).toHaveAttribute('aria-labelledby', labelId);
```

4. Тест ref-пропса компонента

    UI-компоненты должны содержать ref-пропс для определения ссылки на "ключевой" dom-элемент компонента.
    Необходимо проверять совпадает ли dom-элемент из ref с соответствующим dom-элементом, извлеченным из структуры компонента.

    - проверяет работоспособность ref-пропса компонента
    - можно применять на любом этапе разработки компонента
    - прост в поддержке
    - устойчив к рефакторингу

```tsx
const ref = React.createRef<HTMLElement>();
const { element } = render(<TestedComponent innerRef={ref} />);
expect(ref.current).toBeInstanceOf(HTMLElement);
expect(ref.current).toBe(element);
```

5. Тесты состояний компонента

    Примеры возможных состояний компонента:

    - closed/opened
    - inactive/active
    - unfocused/focused
    - enabled/disabled
    - unhovered/hovered
    - empty/fulfilled

    В каждом состоянии компонента необходимо протестировать:

    - структуру (верстку, правильность значений атрибутов)
    - отображение/скрытие структурных элементов
    - установленное значение
    - контент

    Компоненты, созданные в соответствии с его a11y/UI-UX спецификациями, могут использовать различные реализации верстки - на это спецификациями не накладывается никаких ограничений.

    В силу этого тесты верстки компонента будут очень хрупкими - любое изменение верстки компонента будет приводить к рефакторингу тестов.

    С другой стороны, a11y-спецификации достаточно четко описывают структуру и семантику элементов компонента в соответствии с их ролями (roles) и связующими их aria-атрибутами, не вдаваясь в детали их реализации.

    Этим можно воспользоваться для создания устойчивых тестов.

6. Тесты смены состояний компонента

    Смена состояния компонента инициируется установкой значений его пропсов и/или имитацией внешних воздействий (события клавиатуры или мыши, а также их комбинации) на структурные элементы компонента.
    Управляющие клавиатурные комбинации, логика взаимодействия с мышью определяются a11y- и UI/UX-спецификациями компонента.

    Этот тест позволяет проконтролировать правильность функционирования компонента в динамике, а именно:

    - управление компонентом (клавиатурой, мышью, пропсами, таймерами, иными событиями, ...)
    - воздействие на какие структурные элементы приводит/не приводит к смене состояния
    - контролировать срабатывание кoллбеков компонента: количество срабатываний и правильность значений, передаваемых в функцию кoллбека

    Суть теста:

    - тестируется исходное состояние компонента
    - имитируется воздействие, переводящее компонент в следующее состояние
    - тестируется фаза изменения состояния
    - тестируется новое состояние компонента
    - имитируется воздействие, переводящее компонент в следующее состояние
    - и т.д.

    Структура теста:

    - рендеринг исходного состояния компонента, mocking его кoллбеков для последующего контроля их работы
    - тест исходного состояния компонента
    - перевод компонента из одного состояния в другое
    - тест фазы смены состояния
    - тест нового состояние компонента

    Примеры смены возможных состояний компонента:

    - opened/closed
    - active/inactive
    - focused/unfocused
    - enabled/disabled
    - hovered/unhovered
    - fulfilled/empty

## Примеры реализации теста компонента

### Исходные данные

Рассмотрим реализацию теста на примере компонента `Selectbox`

**Верстка `Selectbox` в opened/enabled/fulfilled/selected состоянии**:

```html
<div
	role="combobox"
	id="selectbox-anchor"
	aria-expanded="true"
	aria-haspopup="listbox"
	aria-owns="selectbox-listbox"
	aria-activedescendant="selectbox-option--second"
	aria-labelledby="selectbox-anchor-label"
>
	<span
		aria-hidden="true"
		class="visually-hidden"
		id="selectbox-anchor-label"
	>
		tested-component-aria-label
	</span>
	<div
		role="textbox"
		aria-controls="selectbox-listbox"
		aria-labelledby="selectbox-anchor-label"
		aria-readonly="true"
	>
		second
	</div>
</div>
<div role="presentation" data-for="selectbox-anchor" id="selectbox-popover">
	<ul
		role="listbox"
		aria-labelledby="selectbox-anchor-label"
		id="selectbox-listbox"
	>
		<li role="option" aria-selected="false" id="selectbox-option--first">
			first
		</li>
		<li role="option" aria-selected="true" id="selectbox-option--second">
			second
			<span class="visually-hidden"> Selected </span>
		</li>
		<li role="option" aria-selected="false" id="selectbox-option--third">
			third
		</li>
		<li role="option" aria-selected="false" id="selectbox-option--fourth">
			fourth
		</li>
		<li role="option" aria-selected="false" id="selectbox-option--fifth">
			fifth
		</li>
	</ul>
</div>
```

**a11y-структура компонента `Selectbox`**:

-   контейнер компонента `[role="combobox" id="selectbox-anchor"]` содержит:

    -   атрибут `aria-expanded=[true|false]`, отображает состояние `opened/closed`
    -   атрибут `aria-haspopup="listbox"`
    -   атрибут `aria-owns`, указывает на `[role="listbox"]`
    -   атрибут `aria-activedescendant`, в состоянии `selected` указывает на выбранный `[role="option" aria-selected="true"]` в `[role="listbox"]`
    -   атрибут `aria-labelledby`, указывает на label компонента `[id="selectbox-anchor-label"]`

    -   элемент `[role="textbox"]`, содержащий value компонента или placeholder, имеет:

        -   атрибут `aria-controls`, указывает на `[role="listbox"]`
        -   атрибут `aria-labelledby`, указывает на label компонента `[id="selectbox-anchor-label"]`

-   элемент `[id="selectbox-anchor-label"]`, содержит:

    -   в качестве контента label компонента
    -   атрибут `aria-hidden="true"`
    -   класс `visually-hidden`
    -   не отображается визуально

-   контейнер `[role="presentation"]` содержит:

    -   атрибут `data-for`, указывает на `[role="combobox"]`

    -   контейнер `[role="listbox"]` содержит:
        -   атрибут `aria-labelledby`, указывает на label компонента `[id="selectbox-anchor-label"]`
        -   возможные значения `[role="option"]` компонента
        -   один `[role="option" aria-selected="true"]` в состоянии `selected`

### Тестирование структуры компонента.

Пример теста компонента в состоянии "opened/selected/fulfilled":

```ts
const propsDefault = {'aria-label':'label', ...};
const value = valueSelected = 'second';
const values = ['first', value, 'third', 'fourth', 'fifth'];

const combobox = within(document).getByRole('combobox');
const textbox = within(combobox).getByRole('textbox');
const presentation = await screen.findByRole('presentation');
const listbox = within(presentation).getByRole('listbox');
const options = within(listbox).getAllByRole('option');
const [_, optionSecond] = options;

expect(combobox).toHaveFocus();

expect(combobox).toHaveAttribute('aria-expanded', 'true');
expect(combobox).toHaveAttribute('aria-haspopup', 'listbox');
expect(combobox).toHaveAttribute('aria-owns', listbox.id);
expect(combobox).toHaveAttribute('aria-activedescendant', optionSecond.id);

const labelId = combobox.getAttribute('aria-labelledby') ?? '';
expect(labelId).not.toBe('');
// eslint-disable-next-line testing-library/no-node-access
const label = combobox.querySelector(`#${labelId}`);
expect(label).toBeInTheDocument();
expect(label).toHaveTextContent(propsDefault['aria-label']);
expect(label).toHaveAttribute('aria-hidden', 'true');
expect(label).toHaveClass('visually-hidden');

expect(textbox).toHaveAttribute('aria-controls', listbox.id);
expect(textbox).toHaveAttribute('aria-labelledby', labelId);

expect(presentation).toHaveAttribute('data-for', combobox.id);

expect(listbox).toHaveAttribute('aria-labelledby', labelId);

expect(options.length === values.length).toBeTrue();
expect(
	pipe(
		a.zipWith(options, values, (option, value) => {
			const hasRightValue = within(option).queryByText(value) !== null;
			const hasRightSelected =
				option.getAttribute('aria-selected') ===
				(valueSelected !== undefined && value === valueSelected
					? 'true'
					: 'false');
			return hasRightValue && hasRightSelected;
		}),
		a.every(result => result === true),
	),
).toBeTrue();
```

### Тестирование смены состояний компонента

Структура теста (см. выше):

-   рендеринг исходного состояния компонента, mocking его кoллбеков для последующего контроля их работы
-   тест исходного состояния компонента
-   перевод компонента из одного состояния в другое
-   тест фазы смены состояния
-   тест нового состояние компонента

```ts
const combobox = within(document).getByRole('combobox');
const textbox = within(combobox).getByRole('textbox');

const onClick = jest.fn();
const onToggle = jest.fn();

// Сheck сlosed Selectbox
// ...

await userEvent.click(combobox);

// Сheck opened Selectbox
// ...

// Сheck callbacks
expect(onClick).toHaveBeenCalledTimes(1);
expect(onToggle).toHaveBeenCalledTimes(1);
expect(onToggle).toHaveBeenCalledWith(true);

jest.clearAllMocks();

// Repeat same for click on textbox element
await userEvent.click(textbox);

// Сheck opened Selectbox
// ...

// Сheck callbacks
// ...
```

Важно проверить управляющее воздействие на всех элементах компонента, в том числе и тех, воздействие на которые не должны приводить к смене состояния компонента.

## Респользуемые функции тестов

### Актуальность респользуемых функций

Учитывая возможное разнообразие состояний компонента, множество способов смены состояния компонента, множество элементов для "приложения" управляющего воздействия, а также множество сопутствующих проверок, написание "линейного" теста, обеспечивающего выполнение условий 1...4, становится весьма затруднительным в из-за большого числа дублирований кода.

Решением может стать выделение часто используемого функционала в респользуемые функции.

### Тестируемый компонент

Логично создать и переиспользовать компонент, создающий исследуемый компонент в его рабочем окружении.

```tsx
const propsDefault = {
	value: undefined,
    values: ['one', 'two', 'three']
	placeholder: 'tested-component-placeholder',
};

const TestedComponent: React.FC<TestedComponentProps> = ({
	children: _children,
    values,
	...props
}) => (
	<Selectbox {...props}>
		{values.map(value => (
			<MenuItem key={value} value={value}>
				{value}
			</MenuItem>
		))}
	</Selectbox>
);
```

### Функция рендера в Virtual DOM

Тестирование функционала UI-компонента предваряется его инициализацией. Среднестатистический компонент имеет несколько пропсов с данными и несколько пропсов с функциями. Компонент, построенный с учетом a11y-требований, оперирует большим количеством пропсов - к "среднестатистическим" добавляются пропсы aria-атрибутов.

Выделенная функция рендера должна:

-   устанавливать значения пропсов компонента
-   устанавливать мок-функции в кoллбек-пропсы компонента
-   осуществлять рендер компонента
-   возвращать dom-элементы контейнера и компонента, мок-функции, переданные в кoллбек-пропсы компонента

```tsx
type RenderedComponent = {
	element: HTMLElement;
	container: HTMLElement;
	values: string[];
	valueSelected?: string;
	valueDefault?: string;
	onClick: jest.Mock<any, any>;
	onToggle: jest.Mock<any, any>;
	onValueChange: jest.Mock<any, any>;
	onValueSelect: jest.Mock<any, any>;
};

const renderComponent = (props: TestedComponentProps): RenderedComponent => {
	const onClick = jest.fn();
	const onToggle = jest.fn();
	const { container, element } = render(
		<TestedComponent onClick={onClick} onToggle={onToggle} {...props} />,
	);
	return { container, element, onClick, onToggle };
};
```

### Функции декомпозиции компонента на составляющие элементы для каждого состояния компонента

```ts
type ClosedComponent = RenderedComponent && {
	combobox: HTMLElement;
	textbox: HTMLElement;
};

const parseClosedSelectbox = (
	component: RenderedComponent,
): ClosedComponent => {
	const combobox = within(component.container).getByRole('combobox');
	const textbox = within(combobox).getByRole('textbox');
	return { ...component, combobox, textbox };
};

type OpenedComponent = ClosedComponent && {
	presentation: HTMLElement;
	listbox: HTMLElement;
	options: HTMLElement[];
};

const parseOpenedSelectbox = (
	component: RenderedComponent,
): OpenedComponent => {
	const { combobox, textbox } = parseClosedSelectbox(container);
	const presentation = within(container).getByRole('presentation');
	const listbox = within(presentation).getByRole('listbox');
	const options = within(listbox).getAllByRole('option');
	return { ...component, combobox, textbox, presentation, listbox, options };
};
```

### Функции проверки состояний компонента

Код из раздела "[Тестирование структуры компонента](#тестирование-структуры-компонента)" можно выделить в функцию `checkOpenedSelectbox` для теста компонента в состоянии "opened", также создать `checkClosedSelectbox` для теста состояния "closed".

```ts
const checkClosedSelectbox = (component, valueSelected) => {
	const { combobox, textbox } = parseClosedSelectbox(component.container);
	// ...
};

const checkOpenedSelectbox = (component, valueSelected) => {
	const {
		combobox,
		textbox,
		presentation,
		listbox,
		options,
	} = parseOpenedSelectbox(component.container);
	// ...
};
```

### Функция изменения состояния

В разделе "[Тестирование смены состояний компонента](#тестирование смены состояний компонента)" приведена структура теста "динамики" компонента:

-   рендеринг исходного состояния компонента, mocking его кoллбеков для последующего контроля их работы
-   тест исходного состояния компонента
-   перевод компонента из одного состояния в другое
-   тест фазы смены состояния
-   тест нового состояние компонента

Повторяющиеся проверки можно выделить в функции:

```ts
const openByMouse = (
	component: RenderedComponent
	valueSelected: string;
	element: HTMLElement;
) => {
	jest.clearAllMocks();
	userEvent.click(element);

	checkOpenedSelectbox(component, valueSelected);
};

const closeByMouse = (
	component: RenderedComponent
	valueSelected: string;
	element: HTMLElement;
) => {
	jest.clearAllMocks();
	userEvent.click(element);

	checkClosedSelectbox(component, valueSelected);
};

const openByKey = (
	component: RenderedComponent
	valueSelected: string,
	key,
) => {
	jest.clearAllMocks();
	userEvent.keyboard(key);

	checkOpenedSelectbox(component, valueSelected);
};

const closeByKey = (
	component: RenderedComponent
	valueSelected: string,
	key,
) => {
	jest.clearAllMocks();
	userEvent.keyboard(key);

	checkClosedSelectbox(component, valueSelected);
};
```

С учетом этого громоздкие тесты можно записать гораздо компактнее:

```ts
it('check open by mouse', () => {
	const renderedComponent = renderComponent();
	const { combobox } = parseClosedSelectbox(renderedComponent);

	// open by click on combobox
	openByMouse(renderedComponent, valueSelected, combobox);
});

it('check open selectbox from keyboard', () => {
	const renderedComponent = renderComponent();
	const { combobox } = parseClosedSelectbox(renderedComponent);

	// set focus by press {Tab}
	userEvent.keyboard(KEY.Tab);
	expect(combobox).toHaveFocus();

	// open by press {ArrowDown}
	openByKey(renderedComponent, valueSelected, KEY.ArrowDown);
});
```

### Объединение тест-кейсов смежных состояний компонента в едином сценарии

Каждый тест-кейс описывается внутри кoллбека функции `it` или `test`.
В начале каждого кейса требуется провести инициализацию компонента и его окружения.
Приведем тест-кейсы компонента Selectbox для проверки его открытия/закрытия при помощи мыши:

```
Открытие компонента
- рендер закрытого компонента
- клик на внешнем контейнере компонента
- проверка открытого компонента
- рендер закрытого компонента
- клик по контейнеру с текущим значением
- проверка открытого компонента

Закрытие компонента
- рендер открытого компонента
- клик на внешнем контейнере компонента
- проверка закрытого компонента
- рендер открытого компонента
- клик по контейнеру с текущим значением
- проверка закрытого компонента
```

Чтобы уменьшить бойлерплейт-код тест-кейсы смежных состояний компонента можно описать единым сценарием:

```
Открытие/закрытие компонента
- рендер закрытого компонента
- клик на внешнем контейнере компонента
- проверка открытого компонента
- клик на внешнем контейнере компонента
- проверка закрытого компонента
- клик по контейнеру с текущим значением
- проверка открытого компонента
- клик по контейнеру с текущим значением
- рендер закрытого компонента
```

```ts
it('check open/close by mouse', () => {
	const renderedComponent = renderComponent();

	const { combobox, textbox } = parseClosedSelectbox(renderedComponent);

	// open by click on combobox
	openByMouse(renderedComponent, valueSelected, combobox);
	// close by click on combobox
	closeByMouse(renderedComponent, valueSelected, combobox);
	// open by click on textbox
	openByMouse(renderedComponent, valueSelected, textbox);
	// close by click on textbox
	closeByMouse(renderedComponent, valueSelected, textbox);
});

it('check open/close selectbox from keyboard', () => {
	const renderedComponent = renderComponent();

	const { combobox } = parseClosedSelectbox(renderedComponent);

	// set focus by press {Tab}
	userEvent.keyboard(KEY.Tab);
	expect(combobox).toHaveFocus();

	// open by press {Enter}
	openByKey(renderedComponent, valueSelected, KEY.Enter);
	// close by press {Enter}
	closeByKey(renderedComponent, valueSelected, KEY.Enter);
	// open by press {ArrowDown}
	openByKey(renderedComponent, valueSelected, KEY.ArrowDown);
	// close by press {Alt}{ArrowUp}
	closeByKey(renderedComponent, valueSelected, KEY.AltArrowUp);
});
```

**Недостаток**: все падения тестов происходят внутри реиспользуемых функций, нужна отладка чтобы определить тест-кейс, в котором произошло срабатывание теста.

**Решение**: реиспользуемые функции должны возвращать promise, которые должны проверяться в тест-кейсе.

```ts
it('check open/close by mouse', async () => {
	const renderedComponent = renderComponent();

	const { combobox, textbox } = parseClosedSelectbox(renderedComponent);

	// open by click on combobox
	await expect(
		openByMouse(renderedComponent, valueSelected, combobox),
	).toResolve();
	// close by click on combobox
	await expect(
		closeByMouse(renderedComponent, valueSelected, combobox),
	).toResolve();
	// open by click on textbox
	await expect(
		openByMouse(renderedComponent, valueSelected, textbox),
	).toResolve();
	// close by click on textbox
	await expect(
		closeByMouse(renderedComponent, valueSelected, textbox),
	).toResolve();
});
```

Объединение тест-кейсов в логичный сценарий, использование выделенных функций, позволяют выразить тест в виде хорошо структурированного кода, доступного для восприятия и анализа.

# DoD теста компонента

## Структура теста

Тест должен содержать:

1. функцию декомпозиции для каждого тестируемого состояния
2. функцию проверки компонента в каждом из тестируемых состояний
3. функцию перевода компонента из одного состояния в другое для каждого способа управления
4. a11y-axe-test для каждого состояния компонента
5. тест `aria-label` пропса компонента
6. тест `ref` пропса компонента
7. тест управления компонентом по сценарию для каждого способа управления
8. тест смены состояний компонента по сценарию и их проверки для каждого способа управления

## Пример теста компонента

```
it('check a11y by axe', () => { ... })
it('check mouse navigation', () => { ... })
it('check keyboard navigation', () => { ... })
it('check disabled state for mouse', () => { ... })
it('check disabled state for keyboard', () => { ... })
it('check open/close by mouse', () => { ... })
it('check open/close by keyboard', () => { ... })
it('check search options', () => { ... })
it('check Ref', () => { ... })
```

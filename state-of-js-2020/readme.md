# State of JavaScript 2020

Не так давно были опубликованы результаты некоторых опросов по итогам 2020г.  
Давайте рассмотрим результаты опроса [State of JavaScript 2020](https://2020.stateofjs.com/ru-RU/awards/) как одного из наиболее показательных.  
Его результаты уже стали темой выпусков подкастов Вебстандарты и Фронтенд-юность.

## [Награды](https://2020.stateofjs.com/ru-RU/awards/)
* самая используемая технология - [Typescript]
* наиболее интересная - [GraphQL]

## [Технологии](https://2020.stateofjs.com/ru-RU/technologies/)
* надо отметить безудержный рост [Typescript] в 2020г, его прямой конкурент [Flow] исчез с горизонта, остальные ([Reason], [Elm]) не существенны
* неудовлетворенность существующими state managers:
  - [Redux] - кривая популярности повернула в обратную сторону
  - [MobX] в аналогичной ситуации, теряет популярность не успев закрепиться в рейтингах
  - **происходит отказ от state managers** в пользу использования [React Context][ReactContext], [React Hooks][ReactHooks], других решений для стейт-менеджмента
* [GraphQL] в этом году обещает выйти в широкое использование проектами
  GraphQL-библиотеки ([Apollo], [Relay]) не пользуются особой популярностью - большинство использует собственные решения?

## [Фреймворки](https://2020.stateofjs.com/ru-RU/technologies/front-end-frameworks/)
* появилось много новых игроков, [Svelte] - фаворит
* тройка наиболее используемых не изменилась
* react+preact уверенно лидируют

## [Слой данных](https://2020.stateofjs.com/ru-RU/technologies/datalayer/)
* [GraphQL] по-праву занял прочное место в стеке, как и REST
* тройка [GraphQL]+[Relay]+[Apollo] без сомнений лидируют наравне с [Redux], который значительно сдал позиции относительно прошлого года
* мы неплохо ориентируемся в Redux-стеке, но пришла пора подбирать решения для [GraphQL-стека](https://landscape.graphql.org/)

## [Сборщики](https://2020.stateofjs.com/ru-RU/technologies/build-tools/)
* много новых сборщиков, преследуют разные цели:
  - скорость ([esbuild])
  - замена смежных инструментов ([Rome])
  - интеграция со смежными инструментами ([Webpack])
  - zero configuration ([parsel], [esbuild])
* в качестве сборщика стал выступать tsc (typescript cli) - как следствие отказа от использования бандлеров
  в пользу поддержания набора скриптов для сборки
* из интересных - [Rome]:
  - Rome is a linter, compiler, bundler, and more for JavaScript, [TypeScript], JSON, HTML, Markdown, and CSS.
  - Rome is designed to replace Babel, ESLint, webpack, Prettier, Jest, and others.

## [Инструменты](https://2020.stateofjs.com/ru-RU/other-tools/)
* в виду окончания развития MomentJS появились альтернативы
  - [date-fns](https://date-fns.org/)
  - [Day.js](https://day.js.org/)
  - [Luxon](https://moment.github.io/luxon) - преемник MomentJS
* держатся в списке underscore и lodash - как дань традиции
* присутствует [ramda] и [RxJS] - хороший знак, что идеи FP/RP находят своих поклонников
* ниже находим [fp-ts] и [io-ts], что подтверждает сказанное ранее о FP

## Тренды

Рост популярности Typescript и GraphQL не случаен:
* связка Typescript+GraphQL позволяет типизировать данные "последней мили" - решение сдерживающего фактора при внедрении TS
* отлично интегрирована с react
* при использовании GraphQL позволяет отказаться от Redux в пользу менее глобальных решений

Существует несколько решений для типизации данных, получаемых через сетевое соединение.  
Самые широкоиспользуемые - [GraphQL], [io-ts], есть собственные решения и комбинации вышеперечисленых.  
На Secon 2020 эта тема должна была раскрыться в серии из 3х докладов фронтенд-секции, планировалось проведение круглого стола с привлечением дукладчиков из бекенд-секции. 

## Итог

Не вызывает сомнения тот факт, что для реализации новых проектов в текущем году будет оправдан выбор TS.  
Стало стандартом включать тайпинги в состав npm-пакетов библиотек.  
Если ранее накладные расходы на написание тайпингов для сторонних библиотек останавливали внедрение TS, то теперь этот фактор практически устранился.

Мы должны увидеть более широкое применение практик ФП/РП/ФРП - это общая тенденция для всех языков программирования.

Стоит подготовиться к заходу проектов на GraphQL, уже это не единичные случаи.

## Опыт DX

3й год работаю над проектами питерской компании DevExperts.  
Предметная область проектов - финансовые приложения для биржевой торговли.  
Исходя из требований предметной области DX практикуют функциональное реактивное программирование на TS со 100% покрытием типами.

Стэк:
- TypeScript, ts-node для BFF, [Webpack], [RxJS], react
- алгебраические типы данных на базе функционального стека [fp-ts]: [remote-data], [io-ts], [swagger-codegen]

Квалифицированная команда платформы, платформа в опенсорсе: [dx-platform]  

Собственные опенсорс проекты:
* [remote-data]
* [swagger-codegen]

Участие в сторонних опенсорс проектах:  
* [fp-ts]
* [Most]

Техминутки - короткие и содержательные тематические live-coding митапы, в ходе которых тема разбирается на примерах.
Длительность варьируется, в среднем - около часа. Митап разбивается на сессии лайвкодинга по 15-20 минут, потом следует блок общения, где можно задать вопросы, выразить мнение, предложить свой подход.

Очень прогрессивная команда фронтендеров - хочется перенять лучшие практики, опыт, подходы.

Серию митапов хотелось бы начать с рассмотрения ADT как темы чисто практической - ADT можно применять в проектах не вдаваясь в тонкости FP.

[esbuild]: https://esbuild.github.io/
[Webpack]: https://webpack.js.org/
[Parsel]: https://parceljs.org/
[Rome]: https://rome.tools/

[GraphQL]: https://graphql.org/
[Apollo]: https://apollographql.com/client
[Relay]: https://relay.dev/
[Redux]: https://redux.js.org/
[MobX]: http://mobx.js.org/
[ReactContext]: https://ru.reactjs.org/docs/context.html
[ReactHooks]: https://ru.reactjs.org/docs/hooks-reference.html

[Svelte]: https://svelte.dev/

[Typescript]: https://www.typescriptlang.org/
[Reason]: https://reasonml.github.io/
[Elm]: https://elm-lang.org/
[Flow]: https://flow.org/

[ramda]: https://ramdajs.com/
[RxJS]: https://rxjs.dev/guide/overview

[fantasy-land]: https://github.com/fantasyland/fantasy-land
[fp-ts]: https://gcanti.github.io/fp-ts/
[io-ts]: ttps://gcanti.github.io/io-ts/
[swagger-codegen]: https://github.com/devexperts/swagger-codegen-ts
[remote-data]: https://github.com/devexperts/remote-data-ts
[Most]: https://github.com/mostjs/core

[dx-platform]: https://github.com/devexperts/dx-platform
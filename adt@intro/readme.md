# Algebraic Data Types (ADT): Intro

## От себя

Мои рассуждения относительно ADT, теории категорий и ФП в целом могут быть довольно спорны с точки зрения глубоких специалистов.
Цель встреч - не изложить каноническую теорию, а сделать введение в ФП с минимумом теории на конкретных практических примерах.

Может встретиться много неточностей и спорных моментов, многие их них будут сделаны умышлено 
с целью упростить понимание на этом этапе, некоторые в силу не полного владения темой.

Хочется диалога и обратной связи.
Пишите вопросы в чат, будем делать паузы для ответов на вопросы.

## Опыт

Несколько лет работаю над Fintech-проектами, где применяется функциональное реактивное программирование на TS.

* Технологический стек:
  - TypeScript, ts-node
  - алгебраические типы данных [функционального стека fp-ts][fp-ts-ecosystem]
* опенсорс FE платформа: [dx-platform]  
* слой сетевого взаимодействия на базе [remote-data], [io-ts], [swagger-codegen]
* стейт-менеджмент на [RxJS]
* ui-kit на react: [@devexperts/react-kit]
* применяются практики функционального реактивного программирования

Многое из этого можно эффективно применить в стандартных react/redux проектах.

## ООП и ФП

Современные высокоуровневые языки чаще всего являются мультипарадигменными - можно использовать как ООп, так и Фп, так и их сочетание.  
Конечно же есть и исключения - Haskell, Elm, Erlang (чаще Фп-языки отказываются от возможностей ООп, чем обратно).  
И наоборот, в языках ООп, стараются реализовать возможности для более удобного использования функциональных практик: **lambda** в Java, **Promise** в JS (Futures в Haskell, Dart, Java), **async/await** в JS (частный случай do-notation из Haskell).

**ООП:** инкапсуляция, полиморфизм и наследование  
**FP:** алгебраические типы данных и функции высших порядков

**OOП:**
- предметная область представляется в виде объектов произвольной структуры
- для реализации бизнес-логики объекты произвольно взаимодействуют друг с другом
- много свободы - легко писать как плохой код, так и хороший
- SOLID являются декларативными соглашениями для разумных ограничений этой свободы
- дизайн-паттерны для декларации популярных архитектурных решений на уровне соглашений

**FP:**
- предметная область и бизнес-логика выражаются в виде алгебраических типов данных и функций, отвечающих за композицию этих данных
- поставлены жесткие рамки - хороший код писать легче, чем плохой
- алгебраические структуры и алгебраические типы данных (как унифицированные, так и пользовательские) четко декларируют свое использование на уровне типов и кода 

Всем будет понятно как обработать данные, если речь идет о массиве или промисе, т.к. они обладают "стандартным api" (если говорить иначе мы знаем алгебраические операции или алгебру, реализованную для этих алгебраических типов данных).  

Также интуитивно-понятна ситуация если речь идет о стеке, очереди, потоке, дереве, графе, векторе, матрице - на уровне негласных соглашений (дизайн-паттернов) мы представляем как должны работать эти структуры данных, хотя для них нет "стандартного api".

Обычно "введения в FP" начинаются с рассмотрения теоретических моментов (чистые функции, функции высшего порядка, иммутабельность, композиция), практическое применение которых в начале выглядит весьма надумано из-за, на первый взгляд, неоправданной сложности и громоздкости. Часто это приводит к негативу относительно Фп.  

Поэтому хотелось бы начать с рассмотрения чего-то практического, что эффективно можно было применить в любом ООп проекте, не вдаваясь в тонкости Фп.  
Для этого подходит понятие алгебраических типов данных и их реализации.

Кто использует на практике чистые функции, функции высшего порядка, иммутабельность, композицию, ADT?

## Algebraic Data Types (ADT)

Часто ADT называют контейнерными, т.к. часто для хранения данных в этих типах используются специальные структуры - контейнеры.

Все мы пользуемся такими ADT как Array и Promise:

```ts
const array = [1,2,3,4];
console.log({ array });
const arrayChanged = array.map(value => value + 1);
console.log({ arrayChanged });

const promise = Promise.resolve(1);
console.log({ promise });
const promiseChanged = promise.then(value => value + 1)
console.log({ promiseChanged });
```
Промисы в JS появились совсем недавно и нельзя не заметить насколько выразительнее стал язык. Хотя надо заметить что есть более правильные реализации этого ADT с точки зрения Fp.

В мире ФП существует гораздо больше широко употребимых алгебраических типов данных и алгебраических структур, которые позволяют гибко и безопасно производить операции над данными.

Функтор, бифунктор, моноид, аппликатив, монада, [Option](https://gcanti.github.io/fp-ts/modules/Option.ts.html), Maybe, [Either](https://gcanti.github.io/fp-ts/modules/Either.ts.html), [RemoteData][remote-data] - названия этих алгебраических структур и типов данных для программиста несут в себе всю необходимую информацию чтобы понять как хранятся данные, какие есть способы их обработки.

Конечно же для этих ADT нет нативных реализаций в JS/TS, но самые широко употребимые реализованы в библиотеках.
Надо отметить, что реализовать ADT (контейнерный тип данных) можно используя как ООп, так и Фп.

Обычно подразумевают, что для ADT должна быть реализована алгебра - т.е. обеспечено выполнение набора законов.
Алгебраические структуры - это типы данных, на которых реализована какая-то часть из набора законов ADT

Если смотреть на примеры для Promise и Array - для этих ADT реализован функтор (.map для Array и .then для Promise), другими словами в алгебре этих ADT есть функтор.
Монада - "моноид в категории эндофункторов". Уже есть представление что такое функтор.

[fp-ts] - реализация алгебраических структур и типов данных в соответствии со спецификацией [fantasy-land] ([rus][fantasy-land-rus]), выполненная в Фп.  
На базе этой библиотеки развивается целая [экосистема][fp-ts-ecosystem]:
- [io-ts] - валидация данных при помощи type-guards
- [remote-data] - алгебраический тип данных для сетевых взаимодействий  

**Источники:**
* [Зоопарк Алгебрaических Типов Данных](https://habr.com/ru/post/207126/)  
* [Почему функциональное программирование такое сложное](https://habr.com/ru/post/505928/)
* [What is an algebraic structure?](https://jrsinclair.com/articles/2019/algebraic-structures-what-i-wish-someone-had-explained-about-functional-programming/)
* [What’s an algebraic data type?](https://jrsinclair.com/articles/2019/algebraic-data-types-what-i-wish-someone-had-explained-about-functional-programming/)

[RxJS]: https://rxjs.dev/guide/overview
[fantasy-land]: https://github.com/fantasyland/fantasy-land
[fantasy-land-rus]: https://medium.com/devschacht/%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F-fantasy-land-bf81121b58cb
[fp-ts]: https://gcanti.github.io/fp-ts/
[fp-ts-ecosystem]: https://gcanti.github.io/fp-ts/ecosystem/
[io-ts]: ttps://gcanti.github.io/io-ts/
[swagger-codegen]: https://github.com/devexperts/swagger-codegen-ts
[remote-data]: https://github.com/devexperts/remote-data-ts
[Most]: https://github.com/mostjs/core
[dx-platform]: https://github.com/devexperts/dx-platform
[@devexperts/react-kit]: https://github.com/devexperts/dx-platform/tree/master/packages/react-kit
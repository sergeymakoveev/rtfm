# Тайпчекинг json в monaco

Редактор monaco (далее просто "редактор") может работать в режиме typescript-ide-редактора с тайп-чекингом, подсветкой ошибок и код-комплитом на основе типов.

TS-типы уже написаны для CMS-компонент, они более оптимальны чем json-schema, сгенерированная на их базе и тайпчекинг ts-кода в редакторе работает гораздо быстрее, чем валидация json-исходника с помощью json-schema.
По-определению любой валидный JSON является корректным JS-объектом, значит при помощи TS ему можно назначить тип и использовать механизмы тайпчекинга редактора monaco:
JSON: `{ a:1, b:2 }`
TS (типизированный литерал объекта): `({ a:1, b:2 }) satisfies SomeType`
Для json-конфига страниц используем тип `PageContent`: `({ ...json }) satisfies PageContent`
Для json-конфига компонент используем тип `ComponentConfig` (!!! не реализовано !!!): `({ ...json }) satisfies ComponentConfig`

В редактор можно передать настройки `tsconfig` (`monaco.languages.typescript.typescriptDefaults.setCompilerOptions`), загрузить несколько файлов по-аналогии с IDE, наверняка они образуют `проект` - единое пространство TS-типов.
Типы, объявленные в ts-исходнике, загруженном в редактор тоже участвуют в проверке типов.
Кроме того, в редакторе есть "глобальная" область видимости (`monaco.languages.typescript.typescriptDefaults.setExtraLibs`), куда можно поместить исходники библиотек, описания типов, которые будут доступны TS-коду, загруженному в редактор, но при этом отображаться не будут.
Эта "глобальной" областью видимости используется в CMS-редакторе чтобы сделать доступными типы приложения для тайпчекинга кода, загруженного в редактор.

# Дамп типов приложения для тайпчекинга json

В cms-json-конфиге используются структуры данных, типы для которых "разбросаны" по всему исходному коду приложения, чтобы загрузить их в "глобальную" область видимости необходимо:
1. собрать типы в отдельный файл
1. убрать из типов пропсов поля, значения которых не задаются через json (например пропсы эвентов)
1. привести типы полей к json-совместимым (ReactNode -> string|object|array|...) т.е. к таким, которые можно будет использовать в json-конфиге

Эти функции выполняет [https://a.yandex-team.ru/arcadia/yandex360/frontend/services/tuning/admin/components/Editor/type-printer/type-printer.ts?rev=460d7f00bde997e03dc2509da7bf2708827971a3#L1](type-printer.ts), который генерирует дамп типов `type-printer.results.txt` на основе настроек `type-printer.config.ts`
Настройки:
- импортируем типы, которые надо включить в результирующий дамп из единого фасада типов `src/design-system/PageConstructor/types.cms`, в котором они экспортируется из различных частей приложения:
```
import type {
    PageContent as PageContentRAW,
    ComponentConfig as ComponentConfigRAW,
    ...
} from '../../../../src/design-system/PageConstructor/types.cms';
```

- объявляем локальные алиасы типов, которые в этом файле будет разбирать ts-интерпретатор:
```
type PageContent = PageContentRAW;
type ComponentConfig = ComponentConfigRAW;
```

- создаем кортеж имен алиасов из числа, объявленных выше, которые надо включить в дамп.
```
export const DUMPED_TYPES = [ 'PageContent', ... ]
```

- объявляем кортеж имен алиасов из объявленных в , для которых надо установить тип `any` в дампе:
```
export const SKIPPED_TYPES = [
    'JSONArray',
    'JSONObject',
    ...
] as const;
```
Такое нужно для того чтобы временно или на постоянной основе отключить проверку какого-то типа (если его дамп создается некорректно по каким-то причинам, если он "тянет" за собой массу зависимых типов, и надо прервать эту длинную цепочку зависимостей)

- здесь же можно искусственно установить любому алиасу любой нужный тип для его оверрайда в дампе
```
type FlexibleImageParameters = unknown;
type VideoMediaParameters = unknown;
type LottieMediaParameters = unknown;
type ImageGalleryParameters = unknown;
type LottieGalleryParameters = unknown;
```

# Файл фасада типов

`src/design-system/PageConstructor/types.cms.ts`
Представляет собой единый индексный файл типов для тайпчекинга, в который они экспортируется из различных частей приложения:
```
export { type AvailableDomain } from '../types';
export type {
    ...
    PageContent,
    ComponentConfig,
    ...
} from './types';
export { type Indent } from '../Block';
export { type TankerData } from './tanker';
```
# Фасад json-совместимых типов для пропсов компонента

Не всегда, но часто, дамп типов происходит некорректно, если для поля типа используется нетривиальный тип ( например ReactNode).
Есть лего-компоненты или компоненты на их базе с избыточным количеством пропсов, которые не выставляются в json-конфиг.
Поэтому надо:
- отбрасывать из типа лишние поля, которые не используются в json-конфиге (Pick/Omit)
- "приводить" сложные типы полей к json-совместимым

"Приведение" полей к json-совместимым можно сделать рекурсивным generic-типом наподобие `JSONCompatibleProps<T extends object>`, который рекурсивно обходит поля объекта и меняет json-НЕсовместимые типы на json-совместимые.
При использовании таких рекурсий дамп происходит некорректно.

Также (иногда) некорректно происходит дамп типа при его импорте из файла библиотеки или из файла с сложными зависимостями.

Выход:
- объявлять в отдельном файле, рядом с компонентом, тип-фасад для пропсов компонента, использующий json-совместимые типы пропсов
- в компоненте расширять тип-фасад, дополняя его пропсами, необходимыми для полноценного функционирования компонента как реакт-компонента (добавляем пропсы для эвентов, оверрайдим текстовые пропсы в тип ReactNode, добавляем реактовые children, и т.д.)

Например:
`src/orbita/FullWidthPanel/FullWidthPanel.types.ts`:
тип-фасад FullWidthPanelJsonProps для пропсов компонента FullWidthPanel, использующий json-совместимые типы пропсов

`src/orbita/FullWidthPanel/FullWidthPanel.tsx`
тип `Props` пропсов компонента `FullWidthPanel` расширяет json-безопасный тип `FullWidthPanelJsonProps`

Коммит, добавляющий поддержку тайпчекинга пропсов компонента OrbitaHero:
https://a.yandex-team.ru/review/9295149/files/460d7f00bde997e03dc2509da7bf2708827971a3

1. выносим json-безопасный тип OrbitaHeroJsonProps и его зависимые типы (OrbitaHeroVariant, OrbitaTextFontKind, HexOrToken, OrbitaTextFontKind, HexOrToken) в отдельный файл
https://a.yandex-team.ru/review/9295149/files/460d7f00bde997e03dc2509da7bf2708827971a3#file-yandex360/frontend/services/tuning/src/orbita/OrbitaHero/OrbitaHero.types.ts

2. переписываем тип OrbitaHeroProps как расширение OrbitaHeroJsonProps
https://a.yandex-team.ru/review/9295149/files/460d7f00bde997e03dc2509da7bf2708827971a3#file-yandex360/frontend/services/tuning/src/orbita/OrbitaHero/OrbitaHero.tsx

3. добавляем в тип `BlockTyped` типизацию пропсов для компонента `type: 'orbitaHero'`
https://a.yandex-team.ru/review/9295149/files/460d7f00bde997e03dc2509da7bf2708827971a3#file-yandex360/frontend/services/tuning/src/design-system/PageConstructor/types.ts

4. реэкспортируем тип `OrbitaHeroJsonProps` и его подтипы `OrbitaHeroVariant, OrbitaTextFontKind` в фасаде для последующего использования в настройках генерации дампа типов:
https://a.yandex-team.ru/review/9295149/files/460d7f00bde997e03dc2509da7bf2708827971a3#file-yandex360/frontend/services/tuning/src/design-system/PageConstructor/types.cms.ts

5. добавляем настройки дампа типов для компонента `OrbitaHero`
https://a.yandex-team.ru/review/9295149/files/460d7f00bde997e03dc2509da7bf2708827971a3#file-yandex360/frontend/services/tuning/admin/components/Editor/type-printer/type-printer.config.ts

- импортируем в настройках снятия дампа `type-printer.config.ts` тип `OrbitaHeroJsonProps` и его подтипы `OrbitaHeroVariant, OrbitaTextFontKind`
- объявляем алиасы типов:
```
type OrbitaHeroJsonProps = OrbitaHeroJsonPropsRAW;
type OrbitaHeroVariant = OrbitaHeroVariantRAW;
type OrbitaTextFontKind = OrbitaTextFontKindRAW;
```
- добавляем имена алиасов в кортеж `DUMPED_TYPES`
- запускаем генерацию дампа `pnpm storybook:generate-types`
- в файле результатов `type-printer.results.txt` обнаруживаем что дамп типа `OrbitaTextFontKind` создается некорректно
- в файле настроек `type-printer.config.ts` добавляем имя типа `OrbitaTextFontKind` в кортеж `SKIPPED_TYPES` чтобы в дампе присвоить для `OrbitaTextFontKind` тип `any`

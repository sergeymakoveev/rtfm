import React, { createContext, FC, ReactNode, useContext } from 'react';
import { PageConfig } from "../config/page-config";

export interface PageHeaderProps {
    pageConfig: PageConfig;
}
export interface PageFooterProps {
    pageConfig: PageConfig;
}
export interface HeaderContentProps {
}

export interface ComponentOverridingTypes {
    readonly PageHeader: FC<PageHeaderProps>;
    readonly PageFooter: FC<PageFooterProps>;
    readonly HeaderContent: FC<HeaderContentProps>;
}

export const DEFAULT_COMPONENTS = {
    PageHeader: () => null,
    PageFooter: () => null,
    HeaderContent: () => null,
};

/**
 * ComponentOverridingContext gives our clients a way to override our default components with the custom ones.
 * ComponentOverridingContext uses react context, so it works in the same way https://reactjs.org/docs/context.html.
 * There are two ways to use component overriding: for function components you can use {@link useComponentOverriding} hook,
 * const myFc = () => {
 *     const { ColorPicker } = useComponentOverriding();
 *     return <ColorPicker />
 * }
 * For class components you can use ComponentOverridingContext.Consumer
 * <ComponentOverridingContext.Consumer>
 {({ ColorPicker }) => (<ColorPicker/>)}
 </ComponentOverridingContext.Consumer>
 */
export const ComponentOverridingContext =
    createContext<ComponentOverridingTypes>(DEFAULT_COMPONENTS);

export const useComponentOverriding = () =>
    useContext(ComponentOverridingContext);

interface ComponentOverridingProps {
    overrides: Partial<ComponentOverridingTypes>;
    children: ReactNode[]|ReactNode;
}

export const ComponentOverriding = (props: ComponentOverridingProps) => {
    const { overrides, children } = props;
    const value: ComponentOverridingTypes = {
        ...DEFAULT_COMPONENTS,
        ...overrides,
    }
    return (
        <ComponentOverridingContext.Provider value={value}>
            {children}
        </ComponentOverridingContext.Provider>
    )
}

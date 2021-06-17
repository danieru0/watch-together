import 'styled-components';

declare module "styled-components" {
    export interface DefaultTheme {
        primary: string;
        primaryHover: string;
        primaryHoverLight: string;
        secondary: string;
        functional: string;
        functionalHover: string;
        fontColorPrimary: string;
        fontcolorSecondary: string;
        red: string;
        notSelected: string;
        fontFamily: string;
        fontSizeEm: string;
    }
}
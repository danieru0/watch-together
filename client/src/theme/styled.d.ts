import 'styled-components';

declare module "styled-components" {
    export interface DefaultTheme {
        primary: string;
        primaryHover: string;
        secondary: string;
        functional: string;
        fontColorPrimary: string;
        fontcolorSecondary: string;
        red: string;
        notSelected: string;
        fontFamily: string;
        fontSizeEm: string;
    }
}
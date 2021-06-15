import 'styled-components';

declare module "styled-components" {
    export interface DefaultTheme {
        primary: string;
        secondary: string;
        fontColorPrimary: string;
        fontcolorSecondary: string;
        red: string;
        fontFamily: string;
        fontSizeEm: string;
    }
}
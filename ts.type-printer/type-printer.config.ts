import type {
  CssVarsThemeOptions as CssVarsThemeOptionsRAW,
  ColorSystemOptions as ColorSystemOptionsRAW,
  PaletteOptions as PaletteOptionsRAW,
  PaletteColorOptions as PaletteColorOptionsRAW,
  SimplePaletteColorOptions as SimplePaletteColorOptionsRAW,
} from '@mui/material';
import type {
  TypographyOptions as TypographyOptionsRAW,
  TypographyStyleOptions as TypographyStyleOptionsRAW,
} from '@mui/material/styles/createTypography';

type CssVarsThemeOptions = CssVarsThemeOptionsRAW;
type components = CssVarsThemeOptions['components'];
type colorSchemes = CssVarsThemeOptions['colorSchemes'];
type ColorSystemOptions = ColorSystemOptionsRAW;
type PaletteOptions = PaletteOptionsRAW;
type PaletteColorOptions = PaletteColorOptionsRAW;
type SimplePaletteColorOptions = SimplePaletteColorOptionsRAW;
type TypographyOptions = TypographyOptionsRAW;
type TypographyStyleOptions = TypographyStyleOptionsRAW;

export const TYPES = [
  'CssVarsThemeOptions',
  'components',
  'colorSchemes',
  'ColorSystemOptions',
  'PaletteOptions',
  'PaletteColorOptions',
  'SimplePaletteColorOptions',
  'TypographyOptions',
  'TypographyStyleOptions',
];

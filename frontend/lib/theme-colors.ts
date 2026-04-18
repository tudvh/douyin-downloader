import colors from 'tailwindcss/colors'

export type ThemeColorName =
  | 'base'
  | Extract<
      keyof typeof colors,
      | 'amber'
      | 'blue'
      | 'cyan'
      | 'emerald'
      | 'fuchsia'
      | 'green'
      | 'indigo'
      | 'lime'
      | 'orange'
      | 'pink'
      | 'purple'
      | 'red'
      | 'rose'
      | 'sky'
      | 'teal'
      | 'violet'
      | 'yellow'
    >

interface ThemeColorConfig {
  name: ThemeColorName
  label: keyof IntlMessages
  light: Record<string, string>
  dark: Record<string, string>
}

function createColorConfig(name: ThemeColorName, label: keyof IntlMessages): ThemeColorConfig {
  const mistPalette = colors.mist
  const activePalette = name === 'base' ? mistPalette : colors[name]

  const chartColors = {
    '--chart-1': activePalette['300'],
    '--chart-2': activePalette['500'],
    '--chart-3': activePalette['600'],
    '--chart-4': activePalette['700'],
    '--chart-5': activePalette['800'],
  }

  if (name === 'base') {
    return {
      name,
      label,
      light: {
        '--primary': activePalette['900'],
        '--primary-foreground': activePalette['50'],
        ...chartColors,
      },
      dark: {
        '--primary': activePalette['200'],
        '--primary-foreground': activePalette['900'],
        ...chartColors,
      },
    }
  }

  if (name === 'yellow' || name === 'lime') {
    return {
      name,
      label,
      light: {
        '--primary': activePalette['400'],
        '--primary-foreground': activePalette['900'],
        ...chartColors,
      },
      dark: {
        '--primary': activePalette['500'],
        '--primary-foreground': activePalette['900'],
        ...chartColors,
      },
    }
  }

  return {
    name,
    label,
    light: {
      '--primary': activePalette['700'],
      '--primary-foreground': activePalette['50'],
      ...chartColors,
    },
    dark: {
      '--primary': activePalette['800'],
      '--primary-foreground': activePalette['50'],
      ...chartColors,
    },
  }
}

export const THEME_COLORS: Record<ThemeColorName, ThemeColorConfig> = {
  base: createColorConfig('base', 'color_base'),
  amber: createColorConfig('amber', 'color_amber'),
  blue: createColorConfig('blue', 'color_blue'),
  cyan: createColorConfig('cyan', 'color_cyan'),
  emerald: createColorConfig('emerald', 'color_emerald'),
  fuchsia: createColorConfig('fuchsia', 'color_fuchsia'),
  green: createColorConfig('green', 'color_green'),
  indigo: createColorConfig('indigo', 'color_indigo'),
  lime: createColorConfig('lime', 'color_lime'),
  orange: createColorConfig('orange', 'color_orange'),
  pink: createColorConfig('pink', 'color_pink'),
  purple: createColorConfig('purple', 'color_purple'),
  red: createColorConfig('red', 'color_red'),
  rose: createColorConfig('rose', 'color_rose'),
  sky: createColorConfig('sky', 'color_sky'),
  teal: createColorConfig('teal', 'color_teal'),
  violet: createColorConfig('violet', 'color_violet'),
  yellow: createColorConfig('yellow', 'color_yellow'),
}

export const THEME_COLOR_KEYS = Object.keys(THEME_COLORS) as ThemeColorName[]

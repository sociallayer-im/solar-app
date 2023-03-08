import { createTheme } from 'baseui'
import type { Primitives } from 'baseui/themes/types'

const primitives: Partial<Primitives> = {
    "primaryA": "#272928",
    "primaryB": "#9efedd",
    "primaryFontFamily":"'Poppins', sans-serif",
    "black": "#272928",
    "white": "#fff",
}

const overrides = {
    colors: {
        "inputFill": '#f8f9f8',
        "buttonPrimaryFill": '#9efedd',
        "buttonPrimaryHover": '#c3ffe4',
        "buttonPrimaryActive": "#93eacb"
    },

    border: {
        inputBorderRadius: '10px',
    }
}

const theme = createTheme(primitives, overrides)

export default theme

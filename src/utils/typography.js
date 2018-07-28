import Typography from "typography";

// import fairyGatesTheme from 'typography-theme-fairy-gates'

const typography = new Typography({
    googleFonts: [
        {
          name: 'Open Sans',
          styles: ['400', '400i', '700', '700i'],
        },
      ],
    bodyFontFamily: ['Open Sans', 'sans-serif']
});

export default typography;
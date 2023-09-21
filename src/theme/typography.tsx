// ----------------------------------------------------------------------

export function remToPx(value: any) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value: any) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }: any) {
  return {
    "@media (min-width:600px)": {
      fontSize: pxToRem(sm),
    },
    "@media (min-width:900px)": {
      fontSize: pxToRem(md),
    },
    "@media (min-width:1200px)": {
      fontSize: pxToRem(lg),
    },
  };
}

// ----------------------------------------------------------------------

// const FONT_PRIMARY = 'Public Sans, sans-serif'; // Google Font
// const FONT_SECONDARY = 'CircularStd, sans-serif'; // Local Font

const typography = {
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: "2.5rem",
  },
  h2: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: "2rem",
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: "1.5rem",
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: "1.375rem",
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: "1.25rem",
  },
  h6: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: "1.125rem",
  },
  subtitle1: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: "1rem",
  },
  subtitle2: {
    fontWeight: 500,
    lineHeight: 22 / 14,
    fontSize: "0.875rem",
  },
  body1: {
    lineHeight: 1.5,
    fontSize: "1rem",
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: "0.875rem",
  },
  caption: {
    lineHeight: 1.5,
    fontSize: "0.75rem",
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: "0.75rem",
    textTransform: "uppercase",
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: "0.875rem",
    textTransform: "capitalize",
  },
};

export default typography;

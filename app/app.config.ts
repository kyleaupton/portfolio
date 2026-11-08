export default defineAppConfig({
  ui: {
    colors: {
      primary: 'orange',
      neutral: 'stone',
    },
    prose: {
      img: {
        // Images without a width attribute would otherwise stretch to the full column
        variants: { width: { false: 'w-auto max-w-full max-h-[36rem]' } },
      },
      pre: {
        slots: { base: 'whitespace-pre wrap-normal' },
      },
    },
  },
})

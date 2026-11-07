import type { MaybeRefOrGetter } from 'vue'

// Share previews don't apply titleTemplate, so og:title needs the full title spelled out
export function usePageSeo(seo: {
  title: MaybeRefOrGetter<string | undefined>
  description: MaybeRefOrGetter<string | undefined>
}) {
  useSeoMeta({
    title: () => toValue(seo.title),
    description: () => toValue(seo.description),
    ogTitle: () => withSiteName(toValue(seo.title)),
    ogDescription: () => toValue(seo.description),
  })
}

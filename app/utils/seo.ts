export const SITE_NAME = 'Kyle Upton'

export function withSiteName(title?: string) {
  return title && title !== SITE_NAME ? `${title} · ${SITE_NAME}` : SITE_NAME
}

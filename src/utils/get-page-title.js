import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Task Manage Vue'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}

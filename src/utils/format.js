export function formatCurrency(value, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value)
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US').format(new Date(date))
}

export function formatDateTime(date) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date))
}

export function truncate(text, length) {
  return text.length > length ? text.substring(0, length) + '...' : text
}

export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}


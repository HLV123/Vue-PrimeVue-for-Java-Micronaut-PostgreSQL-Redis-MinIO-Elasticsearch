import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi'

dayjs.extend(relativeTime)
dayjs.locale('vi')

export function formatCurrency(value) {
  if (value == null) return '0₫'
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(value)
}

export function formatNumber(value) {
  if (value == null) return '0'
  return new Intl.NumberFormat('vi-VN').format(value)
}

export function formatDate(date, format = 'DD/MM/YYYY') {
  return dayjs(date).format(format)
}

export function formatDateTime(date) {
  return dayjs(date).format('DD/MM/YYYY HH:mm')
}

export function formatRelativeTime(date) {
  return dayjs(date).fromNow()
}

export function formatWeight(grams) {
  if (grams >= 1000) return `${(grams / 1000).toFixed(1)}kg`
  return `${grams}g`
}

export function formatDiscount(original, sale) {
  if (!original || !sale) return 0
  return Math.round(((original - sale) / original) * 100)
}

export function formatPhoneNumber(phone) {
  if (!phone) return ''
  return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')
}

export function slugify(text) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function truncate(text, length = 100) {
  if (!text || text.length <= length) return text
  return text.substring(0, length) + '...'
}

export function waLink(phone: string | null | undefined, message: string): string {
  if (!phone) return '#'
  const clean = phone.replace(/\D/g, '')
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`
}

export function buildMessage(
  template: string,
  vars: Record<string, string | number | null | undefined>
): string {
  return Object.entries(vars).reduce((msg, [key, val]) => {
    const value = val == null ? '' : String(val)
    return msg.replaceAll(`{{${key}}}`, value)
  }, template)
}

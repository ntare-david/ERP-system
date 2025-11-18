export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain an uppercase letter')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain a number')
  }

  return { valid: errors.length === 0, errors }
}

export function validateForm(data: Record<string, any>, schema: Record<string, any>): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {}

  for (const field in schema) {
    const value = data[field]
    const rules = schema[field]

    if (rules.required && !value) {
      errors[field] = `${field} is required`
    }

    if (rules.email && value && !validateEmail(value)) {
      errors[field] = 'Invalid email address'
    }

    if (rules.minLength && value && value.length < rules.minLength) {
      errors[field] = `${field} must be at least ${rules.minLength} characters`
    }
  }

  return { valid: Object.keys(errors).length === 0, errors }
}

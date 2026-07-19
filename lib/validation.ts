export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidMobile(mobile: string): boolean {
  return /^[0-9]{10}$/.test(mobile);
}

export function isValidName(name: string): boolean {
  return name.trim().length >= 2;
}

export function sanitizeString(input: string): string {
  return input.trim().replace(/<[^>]*>/g, "");
}

export function validateRequiredFields(data: Record<string, unknown>, fields: string[]): string | null {
  for (const field of fields) {
    const value = data[field];
    if (value === undefined || value === null || (typeof value === "string" && value.trim() === "")) {
      return `${field.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())} is required`;
    }
  }
  return null;
}

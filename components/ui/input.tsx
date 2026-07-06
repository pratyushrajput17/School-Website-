import type { ReactNode } from 'react'

interface InputProps {
  type?: 'text' | 'email' | 'tel'
  placeholder: string
  icon?: ReactNode
  ariaLabel: string
}

export function InputField({ type = 'text', placeholder, icon, ariaLabel }: InputProps) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-xl border border-border/60 bg-white py-3.5 ${
          icon ? 'pl-11' : 'pl-4'
        } pr-4 text-sm text-primary placeholder:text-muted-foreground focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
        aria-label={ariaLabel}
      />
    </div>
  )
}

interface SelectProps {
  placeholder: string
  icon?: ReactNode
  ariaLabel: string
  options: readonly { value: string; label: string }[]
}

export function SelectField({ placeholder, icon, ariaLabel, options }: SelectProps) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </div>
      )}
      <select
        className={`w-full appearance-none rounded-xl border border-border/60 bg-white py-3.5 ${
          icon ? 'pl-11' : 'pl-4'
        } pr-10 text-sm text-primary focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
        aria-label={ariaLabel}
        defaultValue=""
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}

interface TextAreaProps {
  placeholder: string
  icon?: ReactNode
  ariaLabel: string
  rows?: number
}

export function TextAreaField({ placeholder, icon, ariaLabel, rows = 4 }: TextAreaProps) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-6 text-muted-foreground">
          {icon}
        </div>
      )}
      <textarea
        placeholder={placeholder}
        rows={rows}
        className={`w-full rounded-xl border border-border/60 bg-white py-3.5 ${
          icon ? 'pl-11' : 'pl-4'
        } pr-4 text-sm text-primary placeholder:text-muted-foreground focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none`}
        aria-label={ariaLabel}
      />
    </div>
  )
}

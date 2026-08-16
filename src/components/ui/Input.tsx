import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export default function Input({ label, className = '', ...props }: InputProps) {
  return (
    <label className="flex w-full flex-col gap-2 text-sm text-slate-200">
      {label ? <span className="font-medium text-slate-300">{label}</span> : null}
      <input
        {...props}
        className={[
          'w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-slate-50 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30',
          className,
        ].join(' ')}
      />
    </label>
  )
}

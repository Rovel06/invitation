/** Art Deco double-line blue divider with optional label */
export default function DecoDivider({
  label,
  className = "my-8",
}: {
  label?: string
  className?: string
}) {
  return (
    <div className={`deco-divider px-4 ${className}`}>
      {label && (
        <span className="shrink-0 font-['Cormorant_Garamond'] text-xs tracking-[0.25em] uppercase text-accent">
          {label}
        </span>
      )}
    </div>
  )
}

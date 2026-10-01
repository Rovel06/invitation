/** Art Deco double-line blue divider with optional label */
export default function DecoDivider({ label }: { label?: string }) {
  return (
    <div className="deco-divider my-8 px-4">
      {label && (
        <span className="shrink-0 font-['Cormorant_Garamond'] text-xs tracking-[0.25em] uppercase text-accent">
          {label}
        </span>
      )}
    </div>
  )
}

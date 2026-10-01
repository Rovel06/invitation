import { useSectionReveal } from '@/hooks/useSectionReveal'

interface Props {
  children: React.ReactNode
  className?: string
  delay?: string
}

/** Wraps children in a scroll-triggered fade-up reveal container */
export default function SectionReveal({ children, className = '', delay = '0ms' }: Props) {
  const ref = useSectionReveal()
  return (
    <div
      ref={ref}
      className={`section-reveal ${className}`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  )
}

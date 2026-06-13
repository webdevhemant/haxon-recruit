import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'

export function WizardStep({
  stepKey,
  children,
}: {
  stepKey: number | string
  children: ReactNode
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -24 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

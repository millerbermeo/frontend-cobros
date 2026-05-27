import { Spinner as HeroSpinner, type SpinnerRootProps } from '@heroui/react'

export function Spinner(props: SpinnerRootProps) {
  return <HeroSpinner {...props} />
}

export function FullPageSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <HeroSpinner size="lg" color="accent" />
    </div>
  )
}

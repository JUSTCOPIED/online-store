import { Suspense } from 'react'
import AboutUsContent from './content'
import ScrollHandler from './Scroll'

export default function AboutUsPage() {
  return (
    <>
      <Suspense fallback={null}>
        <ScrollHandler />
      </Suspense>
      <AboutUsContent />
    </>
  )
}
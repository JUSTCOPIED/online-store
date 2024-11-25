'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
export default function ScrollHandler({ onSectionChange }) {
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if we need to scroll to FAQ
    const section = searchParams.get('section')
    if (section === 'faq') {
      const element = document.getElementById('faq')
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        })
      }
    }
  }, [searchParams])
  return null
}
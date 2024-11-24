'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Truck, Package, Plane, Sparkles, Box, PenTool, Mail, Phone, Home, MapPin, ChevronUp, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const navItems = [
  { id: 'about', label: 'About Us' },
  { id: 'faq', label: 'FAQ' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'size-guide', label: 'Size Guide' },
  { id: 'care', label: 'Care Instructions' },
]

const founders = [
  { name: 'vansh agarwal', title: 'Co-Founder & CTO', image: '/images/emma-johnson.jpg' },
  { name: 'Manu bhai', title: 'Co-Founder & Production manager', image: '/images/michael-chen.jpg' },
  { name: 'Pratham Bhai', title: 'Head of Operations', image: '/images/sophia-rodriguez.jpg' },
]

const faqs = [
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for all unworn and undamaged items. Please refer to our Returns page for more detailed information on the process and any exceptions."
  },
  {
    question: "How do I track my order?",
    answer: "Once your order is shipped, you'll receive a confirmation email with a tracking number. You can use this number on our website or the carrier's website to track your package's progress."
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and Apple Pay for secure and convenient transactions."
  },
]

const shippingPartners = [
  { name: 'DHL', logo: '/images/dhl-logo.png' },
  { name: 'FedEx', logo: '/images/fedex-logo.png' },
  { name: 'UPS', logo: '/images/ups-logo.png' },
]

const AnimatedIcon = ({ icon: Icon, ...props }) => (
  <motion.div
    initial={{ scale: 1 }}
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <Icon {...props} />
  </motion.div>
)

export default function AboutUsContent() {
  const [activeSection, setActiveSection] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY

      const sectionOffsets = navItems.map(item => {
        const element = document.getElementById(item.id)
        return {
          id: item.id,
          offset: element ? element.offsetTop - 100 : 0,
        }
      })

      const currentSection = sectionOffsets.reduce((acc, section) => {
        return scrollPosition >= section.offset ? section.id : acc
      }, '')

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)

    // Check if we need to scroll to FAQ
    const section = searchParams.get('section')
    if (section === 'faq') {
      scrollToSection('faq')
    }

    return () => window.removeEventListener('scroll', handleScroll)
  }, [searchParams])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      })
    }
    setMobileMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-md z-50 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors duration-300">
              <AnimatedIcon icon={Home} className="w-6 h-6" />
              <span className="font-semibold">Back to Home</span>
            </Link>
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
            <ul className="hidden md:flex space-x-6 items-center">
              {navItems.map((item) => (
                <li key={item.id}>
                  <motion.button
                    onClick={() => scrollToSection(item.id)}
                    className={`cursor-pointer transition-colors duration-300 hover:text-primary ${
                      activeSection === item.id ? 'text-primary font-semibold' : 'text-gray-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.button>
                </li>
              ))}
              <li>
                <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary hover:text-white">
                  Sign Up
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-14 bg-white shadow-md z-40 md:hidden"
          >
            <ul className="py-2 px-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left py-2 px-4 rounded-md transition-colors duration-300 ${
                      activeSection === item.id ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <Button variant="outline" size="sm" className="w-full mt-2 text-primary border-primary hover:bg-primary hover:text-white">
                  Sign Up
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20 pb-16">
        {/* About Us section */}
        <section id="about" className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-gray-800"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About Us
            </motion.h2>
            <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
              <motion.p 
                className="text-base md:text-lg mb-4 md:mb-6 text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Founded in 2010 in the heart of New York City, AXELS Jewelry has been crafting exquisite pieces that blend timeless elegance with modern sophistication. Our mission is to create jewelry that not only adorns but also tells a story, becoming a cherished part of your life's journey.
              </motion.p>
              <motion.p 
                className="text-base md:text-lg text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                What sets us apart is our commitment to ethical sourcing, innovative designs, and unparalleled craftsmanship. Each AXELS piece is a testament to our dedication to quality and our passion for creating jewelry that lasts a lifetime.
              </motion.p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {founders.map((founder, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mb-4"
                  >
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      width={200}
                      height={200}
                      className="rounded-full mx-auto shadow-lg transition-transform duration-300 hover:shadow-xl"
                    />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-800">{founder.name}</h3>
                  <p className="text-gray-600">{founder.title}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section id="faq" className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-gray-800"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Frequently Asked Questions
            </motion.h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-gray-700 hover:text-primary">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Shipping section */}
        <section id="shipping" className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-gray-800"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Shipping Information
            </motion.h2>
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">Our Shipping Process</h3>
                <ul className="list-none space-y-4">
                  <motion.li 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <AnimatedIcon icon={Package} className="w-6 h-6 mr-4 text-primary flex-shrink-0" />
                    <span className="text-gray-600">Order Confirmation: You'll receive an email once your order is placed.</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <AnimatedIcon icon={Box} className="w-6 h-6 mr-4 text-primary flex-shrink-0" />
                    <span className="text-gray-600">Packaging: Your jewelry is carefully packaged to ensure safe delivery.</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                <AnimatedIcon icon={Truck} className="w-6 h-6 mr-4 text-primary flex-shrink-0" />
                    <span className="text-gray-600">Shipment: Your package is handed over to our trusted shipping partners.</span>
                  </motion.li>
                  <motion.li 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <AnimatedIcon icon={Plane} className="w-6 h-6 mr-4 text-primary flex-shrink-0" />
                    <span className="text-gray-600">Delivery: Your package is on its way to you!</span>
                  </motion.li>
                </ul>
              </div>
              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">Our Shipping Partners</h3>
                <div className="flex flex-wrap justify-center gap-8">
                  {shippingPartners.map((partner, index) => (
                    <motion.div 
                      key={index} 
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          width={100}
                          height={50}
                          className="mb-2 transition-transform duration-300"
                        />
                      </motion.div>
                      <p className="text-sm text-gray-600">{partner.name}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">Estimated Delivery Times</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 text-left text-gray-700">Destination</th>
                        <th className="p-2 text-left text-gray-700">Standard Shipping</th>
                        <th className="p-2 text-left text-gray-700">Express Shipping</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 border-t text-gray-600">Domestic (US)</td>
                        <td className="p-2 border-t text-gray-600">3-5 business days</td>
                        <td className="p-2 border-t text-gray-600">1-2 business days</td>
                      </tr>
                      <tr>
                        <td className="p-2 border-t text-gray-600">International</td>
                        <td className="p-2 border-t text-gray-600">7-14 business days</td>
                        <td className="p-2 border-t text-gray-600">3-5 business days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Size Guide section */}
        <section id="size-guide" className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-gray-800"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Size Guide
            </motion.h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">Ring Size Guide</h3>
                  <p className="mb-4 text-gray-600">
                    To find your perfect ring size, follow these steps:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2 mb-4 text-gray-600">
                    <li>Wrap a piece of string or paper around your finger.</li>
                    <li>Mark where the ends meet with a pen.</li>
                    <li>Measure the length in millimeters.</li>
                    <li>Use our size chart to find your corresponding ring size.</li>
                  </ol>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image
                      src="/images/ring-size-chart.jpg"
                      alt="Ring Size Chart"
                      width={400}
                      height={300}
                      className="rounded-lg shadow-md transition-transform duration-300 hover:shadow-xl"
                    />
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">Necklace Length Guide</h3>
                  <p className="mb-4 text-gray-600">
                    Choose the perfect necklace length based on your style and neckline:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-600">
                    <li>Choker: 14-16 inches</li>
                    <li>Princess: 18-20 inches</li>
                    <li>Matinee: 22-24 inches</li>
                    <li>Opera: 30-36 inches</li>
                    <li>Rope: 36-42 inches</li>
                  </ul>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image
                      src="/images/necklace-length-guide.jpg"
                      alt="Necklace Length Guide"
                      width={400}
                      height={300}
                      className="rounded-lg shadow-md transition-transform duration-300 hover:shadow-xl"
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Care Instructions section */}
        <section id="care" className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-gray-800"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Care Instructions
            </motion.h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-gray-50 h-full">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-700">
                        <AnimatedIcon icon={Sparkles} className="w-6 h-6 mr-2 text-primary" />
                        Cleaning
                      </h3>
                      <ul className="list-disc pl-6 space-y-2 text-gray-600">
                        <li>Use a soft, lint-free cloth to gently polish your jewelry.</li>
                        <li>For gold and platinum, use warm water and mild soap.</li>
                        <li>Clean gemstones with a soft brush and soapy water.</li>
                        <li>Avoid harsh chemicals and ultrasonic cleaners.</li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="bg-gray-50 h-full">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-700">
                        <AnimatedIcon icon={Box} className="w-6 h-6 mr-2 text-primary" />
                        Storage
                      </h3>
                      <ul className="list-disc pl-6 space-y-2 text-gray-600">
                        <li>Store each piece separately to prevent scratching.</li>
                        <li>Use soft cloth pouches or a jewelry box with compartments.</li>
                        <li>Keep jewelry away from direct sunlight and heat.</li>
                        <li>Store necklaces flat to prevent tangling.</li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="bg-gray-50 h-full">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-700">
                        <AnimatedIcon icon={PenTool} className="w-6 h-6 mr-2 text-primary" />
                        Maintenance
                      </h3>
                      <ul className="list-disc pl-6 space-y-2 text-gray-600">
                        <li>Remove jewelry before swimming or bathing.</li>
                        <li>Apply cosmetics and perfumes before wearing jewelry.</li>
                        <li>Have your jewelry professionally inspected annually.</li>
                        <li>Re-string pearl necklaces every few years.</li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4">Still have questions?</h3>
              <p className="mb-4 text-gray-300">Our customer service team is here to help. Contact us today!</p>
              <div className="space-y-2">
                <motion.p 
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                >
                  <AnimatedIcon icon={Mail} className="w-5 h-5 mr-2 text-primary" />
                  <a href="mailto:support@axelsjewelry.com" className="hover:text-primary transition-colors duration-300">
                    support@axelsjewelry.com
                  </a>
                </motion.p>
                <motion.p 
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                >
                  <AnimatedIcon icon={Phone} className="w-5 h-5 mr-2 text-primary" />
                  <a href="tel:+1234567890" className="hover:text-primary transition-colors duration-300">
                    +1 (234) 567-890
                  </a>
                </motion.p>
              </div>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4">Visit Our Store</h3>
              <motion.p 
                className="mb-4 text-gray-300 flex items-start"
                whileHover={{ x: 5 }}
              >
                <AnimatedIcon icon={MapPin} className="w-5 h-5 mr-2 mt-1 text-primary" />
                123 Jewelry Lane, New York, NY 10001
              </motion.p>
              <div className="aspect-video rounded-lg overflow-hidden h-40">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095919565!2d-74.00601708459418!3d40.74076794379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9aeb1c6b5%3A0x35b1cfbc89a6097f!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1621959657043!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">&copy; 2024 AXELS Jewelry. All rights reserved.</p>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                onClick={scrollToTop}
                className="bg-primary hover:bg-primary-dark text-white"
                size="sm"
              >
                <ChevronUp className="w-4 h-4 mr-2" />
                Back to Top
              </Button>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  )
}
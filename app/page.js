'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ShoppingCart, Facebook, Instagram, Twitter, Phone, Diamond, Lock, Truck, RotateCcw, Watch, GemIcon, Menu, X, User, ArrowRight, Star, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

const products = [
  { id: 1, name: "Femme Chronos Watch", price: 199.99, image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=300&q=80" },
  { id: 2, name: "Vintage Cuff Ring", price: 79.99, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=300&q=80" },
  { id: 3, name: "Pearl Stud Earrings", price: 49.99, image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=300&q=80" },
  { id: 4, name: "Birthday Charm Bracelet", price: 69.99, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=300&q=80" },
  { id: 5, name: "Stack Diamond Ring", price: 199.99, originalPrice: 399.99, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=300&q=80" },
  { id: 6, name: "Diamond Drop Earrings", price: 199.99, originalPrice: 299.99, image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=300&q=80" },
]

const testimonials = [
  { id: 1, name: "Emma S.", comment: "AXELS's curation of vintage pieces is unparalleled. Each item tells a story.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80" },
  { id: 2, name: "James L.", comment: "As a collector, I trust AXELS for their authenticity and exceptional service.", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100&q=80" },
  { id: 3, name: "Sophia R.", comment: "AXELS has helped me find the most exquisite pieces for my collection.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80" },
]

const MotionLink = motion(Link)

const CustomButton = ({ children, ...props }) => (
  <Button {...props}>{children}</Button>
)

const CategoryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)

  const categories = [
    "Rings",
    "Necklaces",
    "Earrings",
    "Bracelets",
    "Watches",
    "Engagement",
    "Wedding",
    "Men's Jewelry"
  ]

  return (
    <div className="relative group">
      <button
        className="text-gray-600 hover:text-gray-900 flex items-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        CATEGORIES <ChevronDown className="ml-1 w-4 h-4" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
          >
            <ul className="py-1">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link
                    href="/auth"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-white">
      <nav className="py-4 border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-semibold"
          >
            AXELS
          </motion.div>
          <div className="hidden md:flex space-x-6">
            <CategoryDropdown />
            <Link href="/about-us" className="text-gray-600 hover:text-gray-900">ABOUT</Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative">
          <div className="grid md:grid-cols-2">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative h-[60vh] bg-cover bg-center" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80')" }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white">
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-4xl md:text-5xl font-light mb-4 text-center px-4"
                >
                  Discover Your Perfect Style
                </motion.h1>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <CustomButton href="/auth" size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                    SHOP NOW
                  </CustomButton>
                </motion.div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative h-[60vh] bg-cover bg-center" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1000&q=80')" }}
            >
              <div className="absolute inset-0 bg-white bg-opacity-70 flex flex-col justify-center p-8 md:p-12">
                <h2 className="text-3xl md:text-5xl font-light mb-4">Golden Memory</h2>
                <p className="mb-4 text-sm md:text-base">Indulge in the opulence of Golden Memory, a mesmerizing jewelry collection fit for a queen. Embrace your inner allure with exquisite designs exclusive in our store to your heart content.</p>
                <Link href="/auth" className="text-gray-900 hover:underline flex items-center text-sm md:text-base">
                  View Full Collection <ChevronDown className="ml-2 w-4 h-4 rotate-[-90deg]" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-center space-x-8 mb-12">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Watch className="w-16 h-16 text-gray-600" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <GemIcon className="w-16 h-16 text-gray-600" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Diamond className="w-16 h-16 text-gray-600" />
              </motion.div>
            
            </div>
            <h2 className="text-3xl font-light mb-8 text-center">Featured Collections</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden group">
                    <CardContent className="p-4">
                      <div className="relative overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 mt-4">{product.name}</h3>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        {product.originalPrice && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            -50%
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button href="/auth">
              <CustomButton variant="outline" size="lg" href="/auth">VIEW ALL PRODUCTS</CustomButton>
              </button>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Diamond, title: "Certified", description: "Available certificates of authenticity" },
                { icon: Lock, title: "Secure", description: "Certified marketplace since 2017" },
                { icon: Truck, title: "Shipping", description: "Free, fast, and reliable worldwide" },
                { icon: RotateCcw, title: "Transparent", description: "Hassle-free return policy" },
              ].map((item, index) => (
                <motion.div 
                  key={item.title}
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <item.icon className="w-10 h-10 text-gray-600" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12 ">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 ">About AXELS</h3>
              <p className="text-sm text-gray-400 mb-4">Crafting timeless elegance since 1920</p>
              <div className="flex space-x-4">
                {[
                  { Icon: Twitter, href: "https://twitter.com/axelsjewelry" },
                  { Icon: Instagram, href: "https://instagram.com/axelsjewelry" },
                  { Icon: Facebook, href: "https://facebook.com/axelsjewelry" },
                  {
                    Icon: () => (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    ),
                    href: "https://linkedin.com/company/axelsjewelry"
                  },
                ].map(({ Icon, href }, index) => (
                  <MotionLink
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <Icon />
                  </MotionLink>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="text-sm text-gray-400 space-y-2">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/auth" className="hover:text-white transition-colors">Shop</Link></li>
                <li><Link href="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
                <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-gray-400 flex items-center"
            >
              <Phone className="w-4 h-4 mr-2" />
              (+123) 456 7890
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-gray-400 flex items-center"
            >
              <Mail className="w-4 h-4 mr-2" />
              Customer Support ka mail
            </motion.div>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="text-sm text-gray-400 space-y-2 ">
                <li><Link href="/about-us?section=faq" className="hover:text-white transition-colors">FAQs</Link></li>
                <li><Link href="/about-us?section=shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                <li><Link href="/about-us?section=size-guide" className="hover:text-white transition-colors">Size Guide</Link></li>
                <li><Link href="/about-us?section=care" className="hover:text-white transition-colors">Care Instructions</Link></li>
              </ul>
            </div>
            <div className="lg:col-span-1 md:col-span-2 hover:text-white">
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-sm text-gray-400 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
              <form className="flex flex-col sm:flex-row">
                <Input type="email" placeholder="Enter your email" className="rounded-r-none sm:rounded-r-none mb-2 sm:mb-0 flex-grow" />
                <CustomButton type="submit" className="rounded-l-none sm:rounded-l-none w-full sm:w-auto">Subscribe</CustomButton>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-sm text-gray-400 hover:text-white">
            <p>&copy; 2024 AXELS Jewelry. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
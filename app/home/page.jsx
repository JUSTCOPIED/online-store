'use client'

import React, { useState, useEffect } from 'react'
import { BellIcon, HamburgerMenuIcon, Cross1Icon, PlusIcon, MinusIcon, ChevronLeftIcon, ChevronRightIcon, PersonIcon, StarIcon, MagnifyingGlassIcon, ExitIcon , ChevronDownIcon, ChevronUpIcon , FaShoppingCart} from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from "framer-motion"
import Image from 'next/image';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const dummyJewelry = [
  { 
    id: 1, 
    name: "Merriment Marquise Open Diamond Ring", 
    price: 23922, 
    rating: 4.9, 
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Rings", 
    likes: 1200, 
    isBestseller: false 
  },
  { 
    id: 2, 
    name: "Radiant Rivulet Diamond Rings", 
    price: 17017, 
    rating: 4.8, 
    images: [
      "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1612019461708-d1d9a4685eb9?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Rings", 
    likes: 980, 
    isBestseller: false 
  },
  {
    id: 3,
    name: "Celestial Sapphire Necklace",
    price: 45000,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80"
    ],
    category: "Necklaces",
    likes: 1500,
    isBestseller: true
  },
  {
  id: 4,
  name: "Emerald Elegance Earrings",
  price: 32500,
  rating: 4.6,
  images: [
    "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1000&q=80"
  ],
  category: "Earrings",
  likes: 890,
  isBestseller: false
},
{
  id: 5,
  name: "Royal Ruby Bracelet",
  price: 55000,
  rating: 4.9,
  images: [
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=1000&q=80"
  ],
  category: "Bracelets",
  likes: 2100,
  isBestseller: true
},
{
  id: 6,
  name: "Opulent Opal Ring",
  price: 28750,
  rating: 4.7,
  images: [
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
  ],
  category: "Rings",
  likes: 1350,
  isBestseller: false
}
]

export default function Component() {
  const router = useRouter()
  const [sortOption, setSortOption] = useState('default')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentImageIndices, setCurrentImageIndices] = useState(dummyJewelry.map(() => 0))
  const [isMobile, setIsMobile] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const filteredAndSortedJewelry = dummyJewelry
    .filter(item => 
      (categoryFilter === 'All' || item.category === categoryFilter) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'priceHighToLow') return b.price - a.price
      if (sortOption === 'priceLowToHigh') return a.price - b.price
      if (sortOption === 'ratingHighToLow') return b.rating - a.rating
      return 0
    })

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      }
      return [...prevItems, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const updateQuantity = (id, change) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    ))
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleImageNavigation = (direction, itemIndex) => {
    const item = filteredAndSortedJewelry[itemIndex]
    setCurrentImageIndices(prevIndices => {
      const newIndices = [...prevIndices]
      newIndices[itemIndex] = direction === 'next'
        ? (prevIndices[itemIndex] + 1) % item.images.length
        : (prevIndices[itemIndex] - 1 + item.images.length) % item.images.length
      return newIndices
    })
  }

  const handleUserIconClick = () => {
    router.push('/user')
  }

  const handleLogout = () => {
    // Implement logout logic here
    console.log('User logged out')
    setIsSidebarOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Search submitted:', searchTerm)
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="font-serif text-2xl text-gray-900">Luxe Jewels</Link>
            <div className="flex items-center space-x-4">
              {!isMobile && (
                <form onSubmit={handleSubmit} className="relative">
                  <Input
                    type="search"
                    placeholder="Search"
                    className="pl-10 pr-4 py-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </form>
              )}
              {!isMobile && (
                <Button variant="ghost" size="icon" onClick={handleUserIconClick}>
                  <PersonIcon className="h-5 w-5" />
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCartIcon className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Button>
              {isMobile && (
                <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
                      <HamburgerMenuIcon className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <div className="flex flex-col h-full">
                      <ScrollArea className="flex-grow">
                        <div className="py-4 px-2">
                          <h2 className="text-lg font-semibold mb-4">Menu</h2>
                          <div className="space-y-4">
                            <form onSubmit={handleSubmit} className="relative">
                              <Input
                                type="search"
                                placeholder="Search"
                                className="pl-10 pr-4 py-2 w-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                              />
                              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </form>
                            <Button variant="ghost" className="w-full justify-start" onClick={handleUserIconClick}>
                              <PersonIcon className="h-5 w-5 mr-2" />
                              Account
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                              <BellIcon className="h-5 w-5 mr-2" />
                              Notifications
                            </Button>
                          </div>
                        </div>
                      </ScrollArea>
                      <div className="p-4 border-t">
                        <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-100" onClick={handleLogout}>
                          <ExitIcon className="h-5 w-5 mr-2" />
                          Log out
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="sticky top-16 z-40 bg-gray-50 py-4 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <h2 className="text-2xl font-semibold mb-4 sm:mb-0">Our Collection</h2>
              <div className="flex flex-wrap gap-2">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-white border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  <option value="All">All Categories</option>
                  <option value="Rings">Rings</option>
                  <option value="Necklaces">Necklaces</option>
                  <option value="Earrings">Earrings</option>
                  <option value="Bracelets">Bracelets</option>
                </select>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-white border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  <option value="default">Sort by</option>
                  <option value="priceHighToLow">Price: High to Low</option>
                  <option value="priceLowToHigh">Price: Low to High</option>
                  <option value="ratingHighToLow">Rating: High to Low</option>
                </select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedJewelry.map((item, index) => (
              <Card key={item.id}>
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={item.images[currentImageIndices[index]]}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                    />
                    {item.isBestseller && (
                      <Badge className="absolute top-4 left-4 bg-yellow-400 text-black">
                        BESTSELLER
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1/2 left-2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 hover:bg-white text-gray-900"
                      onClick={() => handleImageNavigation('prev', index)}
                    >
                      <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 hover:bg-white text-gray-900"
                      onClick={() => handleImageNavigation('next', index)}
                    >
                      <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-lg mb-2">{item.name}</h3>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-2xl font-semibold">₹{item.price.toLocaleString()}</p>
                      <div className="flex items-center">
                        <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm">{item.rating}</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-gray-900 text-white hover:bg-gray-800"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent side="right">
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Your Cart</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
                  <Cross1Icon className="h-6 w-6" />
                </Button>
              </div>
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="ml-4">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-gray-500">₹{item.price.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <MinusIcon className="h-4 w-4" />
                          </Button>
                          <span className="mx-3">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="ml-2"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Cross1Icon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 border-t pt-6">
                    <div className="flex justify-between mb-4">
                      <span className="text-lg font-medium">Total</span>
                      <span className="text-2xl font-semibold">₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <Button className="w-full bg-gray-900 text-white hover:bg-gray-800">
                      Checkout
                    </Button>
                  </div>
                </>
              )}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}
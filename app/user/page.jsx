'use client'

import { useState, useRef } from 'react'
import { User, Package, Heart, LogOut, Trash2, Edit2, FileText, Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import React from 'react'
import { cn } from "@/lib/utils"
import Image from 'next/image';
// Mock data for demonstration
const userData = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Jewelry Lane, Gem City, 12345",
  avatar: "/placeholder.svg"
}

const orderHistory = [
  { id: "ORD001", date: "2023-05-15", total: 45000, status: "Delivered" },
  { id: "ORD002", date: "2023-06-22", total: 32500, status: "Processing" },
  { id: "ORD003", date: "2023-07-10", total: 28750, status: "Shipped" },
]

const wishlist = [
  { id: 1, name: "Celestial Sapphire Necklace", price: 45000, image: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=300&q=80" },
  { id: 2, name: "Emerald Elegance Earrings", price: 32500, image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=300&q=80" },
  { id: 3, name: "Royal Ruby Bracelet", price: 55000, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=300&q=80" },
]

const DummyBill = ({ orderId, onClose }) => (
  <div className="bg-white p-6 rounded-lg max-w-2xl mx-auto">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Invoice for Order {orderId}</h2>
      <Button variant="outline" onClick={onClose}>Close</Button>
    </div>
    <div className="mb-6">
      <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
      <p><strong>Customer:</strong> Jane Doe</p>
      <p><strong>Address:</strong> 123 Jewelry Lane, Gem City, 12345</p>
    </div>
    <table className="w-full mb-6">
      <thead>
        <tr className="border-b">
          <th className="text-left py-2">Item</th>
          <th className="text-right py-2">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b">
          <td className="py-2">Luxury Jewelry Item</td>
          <td className="text-right py-2">₹40,000</td>
        </tr>
        <tr className="border-b">
          <td className="py-2">Tax</td>
          <td className="text-right py-2">₹5,000</td>
        </tr>
        <tr>
          <td className="py-2 font-bold">Total</td>
          <td className="text-right py-2 font-bold">₹45,000</td>
        </tr>
      </tbody>
    </table>
    <p className="text-sm text-gray-500">Thank you for your purchase!</p>
  </div>
)

export default function UserPage() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isBillDialogOpen, setIsBillDialogOpen] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState(null)
  const [avatarSrc, setAvatarSrc] = useState(userData.avatar)
  const fileInputRef = useRef(null)

  const handleShowBill = (orderId) => {
    setSelectedOrderId(() => orderId)
    setIsBillDialogOpen(true)
  }

  const handleAvatarClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarSrc(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const CardContent = React.forwardRef(({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props}>
      {children}
    </div>
  ))
  CardContent.displayName = 'CardContent';

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">My Account</h1>
          <Link href="/home">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-20 w-20 cursor-pointer" onClick={handleAvatarClick}>
                <AvatarImage src={avatarSrc} alt={userData.name} />
                <AvatarFallback>{userData.name ? userData.name.split(' ').map(n => n[0]).join('') : 'User'}</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                <Upload className="h-4 w-4 text-gray-500" />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                aria-label="Upload avatar"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
              <p className="text-gray-500">{userData.email}</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
              <p className="mt-1 text-gray-500">{userData.phone}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Shipping Address</h3>
              <p className="mt-1 text-gray-500">{userData.address}</p>
            </div>
          </div>
          <div className="mt-6">
            <Button onClick={() => setIsEditDialogOpen(true)}>
              <Edit2 className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </div>

        <Tabs defaultValue="orders" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View your past orders and their status.</CardDescription>
              </CardHeader>
              <CardContent>
                {orderHistory.length > 0 ? (
                  orderHistory.map((order) => (
                    <div key={order.id} className="flex items-center justify-between py-4 border-b last:border-0">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{order.total.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{order.status}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleShowBill(order.id)}>
                        <FileText className="mr-2 h-4 w-4" />
                        Show Bill
                      </Button>
                    </div>
                  ))
                ) : (
                  <p>No orders found.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="wishlist">
          <Card>
            <CardHeader>
              <CardTitle>Wishlist</CardTitle>
              <CardDescription>Items you&apos;ve saved for later.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlist.length > 0 ? (
                  wishlist.map((item) => (
                    <div key={item.id} className="border rounded-lg overflow-hidden">
                      <div className="relative w-full h-48">
                        <Image
                          src={item.image}
                          alt={item.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-500">₹{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Your wishlist is empty.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

        <div className="flex justify-between items-center">
          <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50" onClick={() => setIsDeleteDialogOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Account
          </Button>
          <Button variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your account information here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" defaultValue={userData.name} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" defaultValue={userData.email} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input id="phone" defaultValue={userData.phone} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input id="address" defaultValue={userData.address} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => setIsEditDialogOpen(false)}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(false)}>Delete Account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isBillDialogOpen} onOpenChange={setIsBillDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Bill for Order {selectedOrderId}</DialogTitle>
          </DialogHeader>
          <DummyBill orderId={selectedOrderId} onClose={() => setIsBillDialogOpen(false)} />
          <DialogFooter>
            <Button onClick={() => setIsBillDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
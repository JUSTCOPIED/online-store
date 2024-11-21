'use client'
//need to convert
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { ArrowUpRight, DollarSign, Package, ShoppingCart, Users, AlertTriangle, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'

// Mock data for demonstration
const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
]

const revenueData = [
  { name: 'Jan', revenue: 10000, profit: 4000 },
  { name: 'Feb', revenue: 15000, profit: 6000 },
  { name: 'Mar', revenue: 20000, profit: 8000 },
  { name: 'Apr', revenue: 25000, profit: 10000 },
  { name: 'May', revenue: 30000, profit: 12000 },
  { name: 'Jun', revenue: 35000, profit: 14000 },
]

const categoryData = [
  { name: 'Necklaces', value: 400 },
  { name: 'Rings', value: 300 },
  { name: 'Earrings', value: 300 },
  { name: 'Bracelets', value: 200 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const lowStockProducts = [
  { id: 1, name: 'Diamond Necklace', stock: 3, reorderLevel: 5, image: '/placeholder.svg' },
  { id: 2, name: 'Sapphire Earrings', stock: 2, reorderLevel: 4, image: '/placeholder.svg' },
  { id: 3, name: 'Gold Bracelet', stock: 4, reorderLevel: 6, image: '/placeholder.svg' },
  { id: 4, name: 'Platinum Ring', stock: 1, reorderLevel: 3, image: '/placeholder.svg' },
]

const recentOrders = [
  { id: 'ORD001', customer: 'John Doe', total: 5000, status: 'Delivered', avatar: '/placeholder.svg' },
  { id: 'ORD002', customer: 'Jane Smith', total: 7500, status: 'Processing', avatar: '/placeholder.svg' },
  { id: 'ORD003', customer: 'Bob Johnson', total: 3200, status: 'Shipped', avatar: '/placeholder.svg' },
  { id: 'ORD004', customer: 'Alice Brown', total: 6800, status: 'Pending', avatar: '/placeholder.svg' },
]

export default function AdminPage() {
  const [timeRange, setTimeRange] = useState('This Month')

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <header className="flex-none p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
          <div className="flex flex-wrap items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setTimeRange('This Month')}>This Month</Button>
            <Button variant="outline" size="sm" onClick={() => setTimeRange('Last Quarter')}>Last Quarter</Button>
            <Button variant="outline" size="sm" onClick={() => setTimeRange('This Year')}>This Year</Button>
            <Link href="/">
              <Button variant="outline" size="sm">Back to Store</Button>
            </Link>
          </div>
        </div>
      </header>
      <ScrollArea className="flex-grow p-4 lg:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹45,231.89</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">+20.1%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2,350</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">+180.1%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profit</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹12,234</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">+19%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 font-medium">+201</span> since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>You made 265 sales this month.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={order.avatar} alt={order.customer} />
                            <AvatarFallback>{order.customer[0]}</AvatarFallback>
                          </Avatar>
                          {order.customer}
                        </div>
                      </TableCell>
                      <TableCell>₹{order.total.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                          {order.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Revenue & Profit</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                  <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Low Stock Alert</CardTitle>
            <CardDescription>Products that need to be restocked soon.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Product</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Reorder Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={product.image} alt={product.name} />
                          <AvatarFallback>{product.name[0]}</AvatarFallback>
                        </Avatar>
                        {product.name}
                      </div>
                    </TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.reorderLevel}</TableCell>
                    <TableCell>
                      <Badge variant="destructive">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Low Stock
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Reorder <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </ScrollArea>
    </div>
  )
}
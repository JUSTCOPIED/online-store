'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

// Simulated user database
const users = [
  { email: 'user@example.com', password: 'password123' },
  { email: 'user', password: 'user123', role: 'user' },
  { email: 'admin', password: 'admin123', role: 'admin' }
]

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const [signInForm, setSignInForm] = useState({ email: '', password: '' })
  const [signUpForm, setSignUpForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [activeTab, setActiveTab] = useState('signin')

  const [isSignInValid, setIsSignInValid] = useState(false)
  const [isSignUpValid, setIsSignUpValid] = useState(false)

  useEffect(() => {
    setIsSignInValid(signInForm.email.length > 0 && signInForm.password.length >= 6)
  }, [signInForm])

  useEffect(() => {
    setIsSignUpValid(
      signUpForm.name.length > 0 &&
      signUpForm.email.includes('@') &&
      signUpForm.password.length >= 6 &&
      signUpForm.password === signUpForm.confirmPassword
    )
  }, [signUpForm])

  const handleSignInSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    const user = users.find(u => u.email === signInForm.email && u.password === signInForm.password)

    if (user) {
      toast({
        title: "Success",
        description: "You have successfully signed in.",
      })
      // Redirect based on user role
      if (user.role === 'admin') {
        router.push('/admin')
      } else if (user.role === 'user') {
        router.push('/home')
      } else {
        router.push('/dashboard')
      }
    } else {
      toast({
        title: "Error",
        description: "Invalid email or password.",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  const handleSignUpSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (signUpForm.password !== signUpForm.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      })
    } else if (users.some(u => u.email === signUpForm.email)) {
      toast({
        title: "Error",
        description: "Email already in use.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Your account has been created.",
      })
      // Here you would typically add the user to your database and sign them in
      router.push('/dashboard')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome to Luxe Jewels</CardTitle>
          <CardDescription className="text-center">Sign in to your account or create a new one</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <TabsContent value="signin">
                  <form onSubmit={handleSignInSubmit}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signin-email">Email</Label>
                        <Input 
                          id="signin-email" 
                          type="text" 
                          placeholder="Enter your email"
                          value={signInForm.email}
                          onChange={(e) => setSignInForm({...signInForm, email: e.target.value})}
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signin-password">Password</Label>
                        <div className="relative">
                          <Input 
                            id="signin-password" 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Enter your password"
                            value={signInForm.password}
                            onChange={(e) => setSignInForm({...signInForm, password: e.target.value})}
                            required 
                          />
                          <button 
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full mt-6" type="submit" disabled={isLoading || !isSignInValid}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Please wait
                        </>
                      ) : (
                        'Sign In'
                      )}
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="signup">
                  <form onSubmit={handleSignUpSubmit}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Name</Label>
                        <Input 
                          id="signup-name" 
                          placeholder="Enter your name"
                          value={signUpForm.name}
                          onChange={(e) => setSignUpForm({...signUpForm, name: e.target.value})}
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input 
                          id="signup-email" 
                          type="email" 
                          placeholder="Enter your email"
                          value={signUpForm.email}
                          onChange={(e) => setSignUpForm({...signUpForm, email: e.target.value})}
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input 
                          id="signup-password" 
                          type="password" 
                          placeholder="Create a password"
                          value={signUpForm.password}
                          onChange={(e) => setSignUpForm({...signUpForm, password: e.target.value})}
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                        <Input 
                          id="signup-confirm-password" 
                          type="password" 
                          placeholder="Confirm your password"
                          value={signUpForm.confirmPassword}
                          onChange={(e) => setSignUpForm({...signUpForm, confirmPassword: e.target.value})}
                          required 
                        />
                      </div>
                    </div>
                    <Button className="w-full mt-6" type="submit" disabled={isLoading || !isSignUpValid}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Please wait
                        </>
                      ) : (
                        'Sign Up'
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            Back to Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
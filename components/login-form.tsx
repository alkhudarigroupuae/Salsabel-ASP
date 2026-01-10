"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "@/lib/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Mail, Lock, User, Github, Smartphone, Chrome } from "lucide-react"
import { Link } from "@/lib/navigation"
import { RecaptchaVerifier } from "firebase/auth"
import { auth } from "@/lib/firebase"

declare global {
  interface Window {
    recaptchaVerifier: any
  }
}

export function LoginForm() {
  const router = useRouter()
  const { login, register, loginWithGoogle, loginWithGithub, loginWithPhone } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Phone Auth State
  const [phoneMode, setPhoneMode] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [confirmationResult, setConfirmationResult] = useState<any>(null)
  const [otpSent, setOtpSent] = useState(false)

  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    if (phoneMode && !window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "normal",
          callback: () => {
            // reCAPTCHA solved
          },
        })
        window.recaptchaVerifier.render()
      } catch (e) {
        console.error("Recaptcha error:", e)
      }
    }
  }, [phoneMode])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const success = await login(loginData.email, loginData.password)
    if (success) {
      router.push("/account")
    } else {
      setError("Invalid email or password")
    }
    setIsLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (registerData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setIsLoading(true)
    const success = await register(
      registerData.email,
      registerData.password,
      registerData.firstName,
      registerData.lastName,
    )

    if (success) {
      router.push("/account")
    } else {
      setError("Registration failed. Please try again.")
    }
    setIsLoading(false)
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    const success = await loginWithGoogle()
    if (success) {
      router.push("/account")
    } else {
      setError("Google login failed")
    }
    setIsLoading(false)
  }

  const handleGithubLogin = async () => {
    setIsLoading(true)
    const success = await loginWithGithub()
    if (success) {
      router.push("/account")
    } else {
      setError("GitHub login failed")
    }
    setIsLoading(false)
  }

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      setError("Please enter a phone number")
      return
    }
    setError("")
    setIsLoading(true)
    
    const appVerifier = window.recaptchaVerifier
    const result = await loginWithPhone(phoneNumber, appVerifier)
    
    if (result) {
      setConfirmationResult(result)
      setOtpSent(true)
    } else {
      setError("Failed to send OTP. Try again.")
    }
    setIsLoading(false)
  }

  const handleVerifyOtp = async () => {
    if (!otp) return
    setIsLoading(true)
    try {
      await confirmationResult.confirm(otp)
      router.push("/account")
    } catch (e) {
      console.error(e)
      setError("Invalid OTP")
    }
    setIsLoading(false)
  }

  return (
    <Card className="max-w-md mx-auto bg-card border-border">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-foreground">Welcome</CardTitle>
        <CardDescription>Sign in to your account or create a new one</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" onValueChange={() => setPhoneMode(false)}>
          <TabsList className="grid w-full grid-cols-2 bg-secondary">
            <TabsTrigger value="login" className="data-[state=active]:bg-card">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-card">
              Register
            </TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login" className="mt-6">
            {!phoneMode ? (
              <>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-foreground">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className="pl-10 bg-secondary border-border"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-foreground">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="pl-10 pr-10 bg-secondary border-border"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  {error && <p className="text-sm text-destructive">{error}</p>}

                  <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-muted" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" onClick={handleGoogleLogin} disabled={isLoading}>
                    <Chrome className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                  <Button variant="outline" onClick={handleGithubLogin} disabled={isLoading}>
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                  <Button variant="outline" onClick={() => setPhoneMode(true)} disabled={isLoading}>
                    <Smartphone className="mr-2 h-4 w-4" />
                    Phone
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                 <Button variant="ghost" onClick={() => setPhoneMode(false)} className="mb-2 pl-0">
                    ← Back to Email Login
                 </Button>
                 
                 {!otpSent ? (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input 
                                id="phone" 
                                placeholder="+1234567890" 
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div id="recaptcha-container"></div>
                        <Button onClick={handleSendOtp} className="w-full" disabled={isLoading}>
                            {isLoading ? "Sending..." : "Send Code"}
                        </Button>
                    </div>
                 ) : (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="otp">Enter Code</Label>
                            <Input 
                                id="otp" 
                                placeholder="123456" 
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <Button onClick={handleVerifyOtp} className="w-full" disabled={isLoading}>
                            {isLoading ? "Verifying..." : "Verify & Sign In"}
                        </Button>
                    </div>
                 )}
                 {error && <p className="text-sm text-destructive">{error}</p>}
              </div>
            )}
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register" className="mt-6">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-foreground">
                    First Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      placeholder="John"
                      required
                      value={registerData.firstName}
                      onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                      className="pl-10 bg-secondary border-border"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-foreground">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    required
                    value={registerData.lastName}
                    onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email" className="text-foreground">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    className="pl-10 bg-secondary border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password" className="text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    className="pl-10 bg-secondary border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-foreground">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    className="pl-10 bg-secondary border-border"
                  />
                </div>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

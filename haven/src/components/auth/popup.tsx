"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { IoIosClose } from "react-icons/io";
import { useAuthContext } from "@/context/AuthContext"
import { motion } from "motion/react"
import { AnimatePresence } from "motion/react"
import { useLogin } from "@/hooks/auth/useLogin"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

export default function AuthPopup() {
  const [showPassword, setShowPassword] = useState(false)
  const { isLoggingIn, login } = useLogin();

  const { isLoginPopupOpen, closeLoginPopup } = useAuthContext()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const success = await login(values.email, values.password);
    if(success) {
      closeLoginPopup();
    }
  }
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeLoginPopup();
        }
        };

        if (isLoginPopupOpen) {
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [closeLoginPopup, isLoginPopupOpen]);

    // Prevent body scroll when popup is open
    useEffect(() => {
        if (isLoginPopupOpen) {
        document.body.style.overflow = 'hidden';
        } else {
        document.body.style.overflow = 'unset';
        }

        return () => {
        document.body.style.overflow = 'unset';
        };
    }, [isLoginPopupOpen]);


  return (
    <AnimatePresence>
        {isLoginPopupOpen && <motion.div 
            className="absolute inset-0 bg-black/50 backdrop-blur-md z-50 flex justify-center items-center h-screen w-full"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.2, ease: "easeInOut"}}
            exit={{opacity: 0}}
        >
            <motion.div 
                className="w-[28rem] mx-auto relative"
                initial={{scale: 0.7}}
                animate={{scale: 1}}
                transition={{duration: 0.2, ease: "easeInOut"}}
                exit={{scale: 0.5}}
            >
                <button 
                  className="absolute right-2 top-2"
                  onClick={closeLoginPopup}
                >
                  <IoIosClose size={28}/> 
                </button>
                <Card className="w-full max-w-md shadow-lg border bg-white">
                    <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center text-gray-900">Welcome back</CardTitle>
                    <CardDescription className="text-center text-gray-600">
                        Enter your credentials to access your account
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                <Input
                                    placeholder="Enter your email"
                                    type="email"
                                    {...field}
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                <div className="relative">
                                    <Input
                                    placeholder="Enter your password"
                                    type={showPassword ? "text" : "password"}
                                    {...field}
                                    />
                                    <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                    >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                    </Button>
                                </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-between">
                            <Link
                            href="/forgot-password"
                            className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
                            >
                            Forgot password?
                            </Link>
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoggingIn}>
                            {isLoggingIn ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing in...
                            </>
                            ) : (
                            "Sign in"
                            )}
                        </Button>
                        </form>
                    </Form>
                    <div className="mt-6 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link
                        href="/signup"
                        className="text-primary underline-offset-4 hover:underline"
                        >
                        Sign up
                        </Link>
                    </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>}
    </AnimatePresence>
    
  )
}


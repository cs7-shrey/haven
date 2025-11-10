"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IoIosClose } from "react-icons/io"
import { useAuthContext } from "@/context/AuthContext"
import { motion } from "motion/react"
import { AnimatePresence } from "motion/react"
import LoginForm from "./LoginForm"
import SignupForm from "./SignUpForm"

type AuthType = "login" | "signup";

export default function AuthPopup() {
  const { isLoginPopupOpen, closeLoginPopup } = useAuthContext()
  const [authType, setAuthType] = useState<AuthType>("login");

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
                        {authType === "login" && <LoginForm />}
                        {authType === "signup" && <SignupForm />}
                    <div className="mt-6 text-center text-sm">
                        {authType === "login" ? "New to Haven? " : "Already have an account? "}
                        <div
                        className="text-primary inline underline-offset-4 hover:underline"
                        onClick={() => {
                          if (authType === "login") {
                            setAuthType("signup");
                          } else {
                            setAuthType("login");
                          }
                        }}
                        >
                        {authType === "login" ? "Sign up" : "Log in"}
                        </div>
                    </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>}
    </AnimatePresence>
    
  )
}


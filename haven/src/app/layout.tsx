import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast'
import AuthPopup from "@/components/auth/popup";
import { AuthContextProvider } from "@/context/AuthContext";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Haven",
  description: "AI driven hotel search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [showSignup, setShowSignup] = useState<boolean>(false);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <AuthContextProvider>
          <Suspense fallback={<Loader2 className="animate-spin" />}>
            {children}
          </Suspense>
          <Toaster />
          <AuthPopup />
        </AuthContextProvider>
      </body>
    </html>
  );
}

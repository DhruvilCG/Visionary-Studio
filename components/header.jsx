"use client"
import { LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { useStoreUser } from "@/hooks/use-store-user"
import { BarLoader } from "react-spinners"
import { Authenticated, Unauthenticated } from "convex/react"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"

export default function Header() {
  const { isLoading } = useStoreUser()
  const path = usePathname()
  const [isClerkModalOpen, setIsClerkModalOpen] = useState(false)

  useEffect(() => {
    const checkClerkCheckout = () => {
      // Check for Clerk portal root specifically
      const clerkPortal = document.getElementById("clerk-portal-root")
      
      if (!clerkPortal) {
        setIsClerkModalOpen(false)
        return
      }
      
      // Check if portal has children (modal is rendered)
      const hasChildren = clerkPortal.children.length > 0
      const isVisible = window.getComputedStyle(clerkPortal).visibility !== "hidden" && 
                       window.getComputedStyle(clerkPortal).display !== "none"
      
      setIsClerkModalOpen(hasChildren && isVisible)
    }

    // Initial check
    checkClerkCheckout()

    // Watch for DOM changes
    const observer = new MutationObserver(() => {
      checkClerkCheckout()
    })
    
    observer.observe(document.body, { 
      subtree: true, 
      childList: true,
      attributes: true,
      attributeFilter: ["style", "class"]
    })
    
    return () => observer.disconnect()
  }, [])

  if (path.includes("/editor")) {
    return null
  }

  if (isClerkModalOpen) {
    return null
  }

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-30 text-nowrap">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-8 py-3 flex items-center justify-between gap-8">
        <Link href="/" className="mr-10 md:mr-20 flex items-center gap-2">
          <div className="relative">
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
            Visionary Studio
          </span>
        </Link>

        {path === "/" && (
          <div className="hidden md:flex space-x-6">
            <Link
              href="#features"
              className="text-white font-medium transition-all duration-300 hover:text-cyan-400 cursor-pointer"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-white font-medium transition-all duration-300 hover:text-cyan-400 cursor-pointer"
            >
              Pricing
            </Link>
            <Link
              href="#contact"
              className="text-white font-medium transition-all duration-300 hover:text-cyan-400 cursor-pointer"
            >
              Contact
            </Link>
          </div>
        )}

        {/* Auth Actions */}
        <div className="flex items-center gap-3 ml-10 md:ml-20">
          <Authenticated>
            <Link href="/dashboard">
              <Button variant="glass" className="hidden sm:flex">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:flex">Dashboard</span>
              </Button>
            </Link>

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 rounded-lg border border-white/20",
                  userButtonPopoverCard: "shadow-xl backdrop-blur-md bg-slate-900/90 border border-white/20",
                  userPreviewMainIdentifier: "font-semibold text-white",
                },
              }}
              afterSignOutUrl="/"
            />
          </Authenticated>

          <Unauthenticated>
            <SignInButton>
              <Button variant="glass" className="hidden sm:flex">
                Sign In
              </Button>
            </SignInButton>

            <SignUpButton>
              <Button variant="primary">Get Started</Button>
            </SignUpButton>
          </Unauthenticated>
        </div>
        {isLoading && (
          <div className="fixed bottom-0 left-0 w-full z-40 flex justify-center">
            <BarLoader width={"95%"} color="#06b6d4" />
          </div>
        )}
      </div>
    </header>
  )
}

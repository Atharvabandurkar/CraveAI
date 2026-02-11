// import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
// import React from 'react'
// import { Button } from "./ui/button";

// const Header = () => {
//   return (
//     <header className="fixed top-0 w-full border-b border-stone-200 bg-stone-50/80 backdrop-blur-md z-50 supports-backdrop-filter:bg-stone-50/60">
//     <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
//         logo
//         <div>Nav links</div>
//         <div className="flex items-center space-x-4">
//             <SignedIn>
//               <UserButton />
//             </SignedIn>
//         <SignedOut>
//               <SignInButton>
//                 <Button variant="ghost" className="h-10 sm:h-12 px-4 sm:px-5">
//                   Sign In
//                 </Button>
//               </SignInButton>
//               <SignUpButton>
//                 <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
//                   Sign Up
//                 </button>
//               </SignUpButton>
//             </SignedOut>

//             </div>
//         </nav>
//     </header>

//   )
// }

// export default Header


// import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
// import React from 'react'
// import { Button } from "./ui/button";
// import { Cookie, Refrigerator, Sparkles } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import UserDropdown from "./UserDropdown";
// import { checkUser } from "@/lib/checkUser";

// const Header = async () => {

//   const user = await checkUser(); // Replace with actual user fetching logic

//   return (
//     <header className="fixed top-0 w-full border-b border-border bg-background/80 backdrop-blur-md z-50">
//       <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
//         <Link href={user ? "/dashboard" : "/"} className="text-2xl font-bold">
//           <Image src="/logo.png" alt="CraveAI Logo" width={60}
//             height={60}
//             className="w-16" />
//         </Link>

//         {/* Navigation Links */}
//         <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-zinc-600">
//           <Link
//             href="/recipes"
//             className="hover:text-primary transition-colors flex gap-1.5 items-center group"
//           >
//             <Cookie className="w-4 h-4 transition-colors group-hover:text-primary" />
//             My Recipes
//           </Link>
//           <Link
//             href="/pantry"
//             className="hover:text-primary transition-colors flex gap-1.5 items-center group"
//           >
//             <Refrigerator className="w-4 h-4 transition-colors group-hover:text-primary" />
//             My Pantry
//           </Link>
//         </div>

//         {/* Auth Section */}
//         <div className="flex items-center space-x-4">
//           <SignedIn>
//             <UserDropdown />
//           </SignedIn>
//           <SignedOut>
//             <SignInButton mode="modal">
//               <Button
//                 variant="ghost"
//                 className="text-muted-foreground hover:text-primary hover:bg-primary/10 h-10 px-4 transition-all duration-200 active:scale-95"
//               >
//                 Sign In
//               </Button>
//             </SignInButton>

//             <SignUpButton mode="modal">
//               <button className="bg-primary text-primary-foreground rounded-full font-medium text-sm h-10 px-6 cursor-pointer transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:scale-95">
//                 Sign Up
//               </button>
//             </SignUpButton>
//           </SignedOut>
//         </div>
//       </nav>
//     </header>
//   )
// }

// export default Header

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Cookie, Refrigerator, Sparkle } from "lucide-react";
import { Button } from "./ui/button";
import UserDropdown from "./UserDropdown";
import { Badge } from "./ui/badge";
import { checkUser } from "@/lib/checkUser";
import PricingModal from "./PricingModal";

const Header = async () => {
  const user = await checkUser();

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/75 backdrop-blur">
      <nav className="container mx-auto h-16 px-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={user ? "/dashboard" : "/"}
          className="flex items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt="CraveAI Logo"
            width={36}
            height={36}
            className="rounded-sm"
          />
          <span className="text-lg font-semibold tracking-tight">
            CraveAI
          </span>
        </Link>

        {/* Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <Link
            href="/recipes"
            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Cookie className="w-4 h-4" />
            My Recipes
          </Link>
          <Link
            href="/pantry"
            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Refrigerator className="w-4 h-4" />
            My Pantry
          </Link>
        </div>

        {/* Auth */}
        <div className="flex items-center gap-2">
          <SignedIn>
            {user && (
              <PricingModal subscriptionTier={user.subscriptionTier}>
                <Badge
                  variant="outline"
                  className={`flex h-8 px-3 gap-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${user.subscriptionTier === "pro"
                      ? "bg-linear-to-r from-emerald-600 to-cyan-500 text-white border-none shadow-md shadow-emerald-500/20 hover:scale-105"
                      : "bg-zinc-200/50 text-zinc-600 border-zinc-200 hover:bg-zinc-200 hover:border-zinc-300"
                    }`}
                >
                  <Sparkle
                    className={`h-3.5 w-3.5 ${user.subscriptionTier === "pro"
                        ? "text-white fill-white/30 animate-pulse"
                        : "text-zinc-500"
                      }`}
                  />
                  <span>
                    {user.subscriptionTier === "pro" ? "Pro Chef" : "Free Plan"}
                  </span>
                </Badge>
              </PricingModal>
            )}
            <UserDropdown />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </SignInButton>

            <SignUpButton mode="modal">
              <Button size="sm" className="rounded-full px-5">
                Get started
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};

export default Header;

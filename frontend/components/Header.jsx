// // import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
// // import React from 'react'
// // import { Button } from "./ui/button";

// // const Header = () => {
// //   return (
// //     <header className="fixed top-0 w-full border-b border-stone-200 bg-stone-50/80 backdrop-blur-md z-50 supports-backdrop-filter:bg-stone-50/60">
// //     <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
// //         logo
// //         <div>Nav links</div>
// //         <div className="flex items-center space-x-4">
// //             <SignedIn>
// //               <UserButton />
// //             </SignedIn>
// //         <SignedOut>
// //               <SignInButton>
// //                 <Button variant="ghost" className="h-10 sm:h-12 px-4 sm:px-5">
// //                   Sign In
// //                 </Button>
// //               </SignInButton>
// //               <SignUpButton>
// //                 <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
// //                   Sign Up
// //                 </button>
// //               </SignUpButton>
// //             </SignedOut>
            
// //             </div>
// //         </nav>
// //     </header>

// //   )
// // }

// // export default Header


// import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
// import React from 'react'
// import { Button } from "./ui/button";

// const Header = () => {
//   return (
//     <header className="fixed top-0 w-full border-b border-border bg-background/80 backdrop-blur-md z-50">
//       <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
//         logo

//         {/* Nav Links */}
//         <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-muted-foreground">
//           <a href="#" className="transition-colors duration-200 hover:text-primary relative group">
//             Recipes
//             <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
//           </a>
//           <a href="#" className="transition-colors duration-200 hover:text-primary relative group">
//             Pantry
//             <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
//           </a>
//         </div>

//         {/* Auth Section */}
//         <div className="flex items-center space-x-4">
//           <SignedIn>
//             <UserButton 
//               appearance={{
//                 elements: {
//                   userButtonAvatarBox: "w-9 h-9 border border-border hover:border-primary transition-colors duration-200"
//                 }
//               }}
//             />
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

import React from "react";
import { Button } from "./ui/button";
import { Cookie, Refrigerator, Sparkles } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import HowToCookModal from "./HowToCookModal";
import PricingModal from "./PricingModal";
import Image from "next/image";
import { checkUser } from "@/lib/checkUser";
import { Badge } from "./ui/badge";
import UserDropdown from "./UserDropdown";

export default async function Header() {
  const user = await checkUser();

  return (
    <header className="fixed top-0 w-full border-b border-stone-200 bg-stone-50/80 backdrop-blur-md z-50 supports-backdrop-filter:bg-stone-50/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={user ? "/dashboard" : "/"}
          className="flex items-center gap-2 group"
        >
          <Image
            src="/orange-logo.png"
            alt="Servd Logo"
            width={60}
            height={60}
            className="w-16"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-stone-600">
          <Link
            href="/recipes"
            className="hover:text-orange-600 transition-colors flex gap-1.5 items-center"
          >
            <Cookie className="w-4 h-4" />
            My Recipes
          </Link>
          <Link
            href="/pantry"
            className="hover:text-orange-600 transition-colors flex gap-1.5 items-center"
          >
            <Refrigerator className="w-4 h-4" />
            My Pantry
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <HowToCookModal />

          <SignedIn>
            {/* Pricing Modal with Built-in Trigger */}
            {user && (
              <PricingModal subscriptionTier={user.subscriptionTier}>
                <Badge
                  variant="outline"
                  className={`flex h-8 px-3 gap-1.5 rounded-full text-xs font-semibold transition-all ${
                    user.subscriptionTier === "pro"
                      ? "bg-linear-to-r from-orange-600 to-amber-500 text-white border-none shadow-sm"
                      : "bg-stone-200/50 text-stone-600 border-stone-200 cursor-pointer hover:bg-stone-300/50 hover:border-stone-300"
                  }`}
                >
                  <Sparkles
                    className={`h-3 w-3 ${
                      user.subscriptionTier === "pro"
                        ? "text-white fill-white/20"
                        : "text-stone-500"
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
              <Button
                variant="ghost"
                className="text-stone-600 hover:text-orange-600 hover:bg-orange-50 font-medium"
              >
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="primary" className="rounded-full px-6">
                Get Started
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}

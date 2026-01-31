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


import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import React from 'react'
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 w-full border-b border-border bg-background/80 backdrop-blur-md z-50">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        logo

        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-muted-foreground">
          <a href="#" className="transition-colors duration-200 hover:text-primary relative group">
            Recipes
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#" className="transition-colors duration-200 hover:text-primary relative group">
            Pantry
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        {/* Auth Section */}
        <div className="flex items-center space-x-4">
          <SignedIn>
            <UserButton 
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-9 h-9 border border-border hover:border-primary transition-colors duration-200"
                }
              }}
            />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button 
                variant="ghost" 
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 h-10 px-4 transition-all duration-200 active:scale-95"
              >
                Sign In
              </Button>
            </SignInButton>
            
            <SignUpButton mode="modal">
              <button className="bg-primary text-primary-foreground rounded-full font-medium text-sm h-10 px-6 cursor-pointer transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:scale-95">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  )
}

export default Header
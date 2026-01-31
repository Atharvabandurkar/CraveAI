// import { Inter } from "next/font/google";
// import "./globals.css";

// const inter = Inter({
//   subsets: ["latin"]
// });

// export const metadata = {
//   title: "CraveAI",
//   description: "Your Intelligent Kitchen Companion",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" suppressContentEditableWarning>
//       <body
//         className={`${inter.className}`}>
//         <main className="min-h-screen">
//         {children}
//         </main>
//          <footer className="py-8 px-4 border-t">
//     <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
//       <p className="text-stone-500 text-sm">
//         Made with 💗 by Myth
//       </p>
//     </div>
//   </footer>


//       </body>
//     </html>
//   );
// }

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
// import { shadcn } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CraveAI",
  description: "Your Intelligent Kitchen Companion",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider  appearance={{
    baseTheme: 'simple',
  }}>
      <html lang="en" suppressContentEditableWarning>
        <body className={`${inter.className} min-h-screen flex flex-col`}>
          <Header />
          <main className="flex-1">
            {children}
          </main>

          <footer className="py-8 px-4 border-t">
            <div className="max-w-6xl mx-auto flex justify-center">
              <p className="text-stone-500 text-sm">
                Made with 💗 by Myth
              </p>
            </div>
          </footer>
        </body>
    </html >
    </ClerkProvider>
  );
}

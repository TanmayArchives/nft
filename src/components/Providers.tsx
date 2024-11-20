"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { WalletContextProvider } from "./WalletContextProvider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WalletContextProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </WalletContextProvider>
  )
} 
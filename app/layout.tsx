import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AIAssistant } from "@/components/ai-assistant"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "UniVerseAI - Student Platform",
  description: "Learn, Organize, Connect with AI",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <SidebarProvider defaultOpen={true}>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <main className="flex-1 overflow-auto bg-background">{children}</main>
              <AIAssistant />
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

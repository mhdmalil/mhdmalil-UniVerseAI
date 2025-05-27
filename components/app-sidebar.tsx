"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Home, BookOpen, Brain, Calendar, BarChart3, Users, MessageCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
  { title: "Learn Hub", url: "/learn-hub", icon: BookOpen },
  { title: "Quizzer", url: "/quizzer", icon: Brain },
  { title: "Task & Schedule", url: "/tasks", icon: Calendar },
  { title: "Insights", url: "/insights", icon: BarChart3 },
  { title: "Campus Connect", url: "/campus-connect", icon: Users },
  { title: "AI Assistant", url: "/ai-assistant", icon: MessageCircle },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r bg-card">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">UV</span>
          </div>
          <span className="text-lg font-bold text-foreground">UniVerseAI</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="transition-all duration-200 hover:scale-105 w-full"
                  >
                    <Link href={item.url} className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="text-xs text-muted-foreground text-center">© 2024 UniVerseAI</div>
      </SidebarFooter>
    </Sidebar>
  )
}

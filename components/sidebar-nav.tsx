"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { BarChart3, FileText, Home, Layers, Lock, Settings, User, Users } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function SidebarNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Sidebar
      className={`${theme === "dark" ? "text-white" : "text-gray-900"} border-r border-border`}
      variant="sidebar"
      defaultOpen={false} // Start collapsed on desktop
    >
      <SidebarHeader className="border-b border-border bg-background">
        <div className="flex h-16 items-center px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div
              className={`h-8 w-8 rounded-full ${theme === "dark" ? "bg-[#FFD166]" : "bg-[#FFD166]"} flex items-center justify-center`}
            >
              <span className="font-bold text-black">K</span>
            </div>
            <span className="font-bold text-xl">Kuria</span>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard"} tooltip="Dashboard">
              <Link href="/dashboard">
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard/market-force"} tooltip="Market Force">
              <Link href="/dashboard/market-force">
                <Layers className="h-5 w-5" />
                <span>Market Force</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard/m-pawa"} tooltip="M-pawa">
              <Link href="/dashboard/m-pawa">
                <FileText className="h-5 w-5" />
                <span>M-pawa</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard/chuuza"} tooltip="Chuuza (Locked)">
              <Link href="/dashboard/chuuza">
                <Lock className="h-5 w-5" />
                <span>Chuuza (NDA)</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Analytics">
              <Link href="#">
                <BarChart3 className="h-5 w-5" />
                <span>Analytics</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="About Me">
              <Link href="#">
                <Users className="h-5 w-5" />
                <span>About Me</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-border bg-background">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border">
              <Image 
                src="/images/ian.jpg" 
                alt="Profile" 
                fill 
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p className="text-sm font-medium">Ian Kuria</p>
              <p className="text-xs text-muted-foreground">UX Engineer</p>
            </div>
          </div>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href="#">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Profile">
              <Link href="#">
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

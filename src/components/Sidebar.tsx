import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Settings, FileText, Keyboard } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { useSystemType } from "@/hooks/useSystemType"
import { ThemeToggle } from "@/components/theme-toggle"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { systemType } = useSystemType()

  const menuItems = [
    {
      title: "配置管理",
      icon: Settings,
      path: "/"
    },
    {
      title: "日志查看",
      icon: FileText,
      path: "/logs"
    },
    {
      title: "快捷键设置",
      icon: Keyboard,
      path: "/shortcuts"
    }
  ]

  return (
    <div className={cn("flex flex-col h-full bg-background border-r", className)}>
      <div className="p-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">管理系统</h2>
          <p className="text-sm text-muted-foreground">当前系统: {systemType}</p>
        </div>
        <ThemeToggle />
      </div>
      <Separator />
      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => navigate(item.path)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </Button>
          ))}
        </nav>
      </div>
    </div>
  )
} 
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useSystemType } from '@/hooks/useSystemType'
import { cn } from '@/lib/utils'
import { FileText, Keyboard, Settings } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

interface SidebarProps {
  className?: string
  onClose?: () => void
}

export function Sidebar({ className, onClose }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { systemType } = useSystemType()

  const handleMenuClick = (path: string) => {
    navigate(path)
    onClose?.()
  }

  const menuItems = [
    {
      title: '配置管理',
      icon: Settings,
      path: '/',
    },
    {
      title: '日志查看',
      icon: FileText,
      path: '/logs',
    },
    {
      title: '快捷键设置(TBD)',
      icon: Keyboard,
      path: '/shortcuts',
    },
  ]

  return (
    <div className={cn('flex flex-col h-full bg-background', className)}>
      <div className="p-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight">HsMod</h2>
          <p className="text-sm text-muted-foreground">
            当前系统:
            {' '}
            {systemType}
          </p>
        </div>
      </div>
      <Separator />
      <div className="flex-1 px-4 py-6">
        <nav className="space-y-3">
          {menuItems.map(item => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? 'secondary' : 'ghost'}
              className="w-full justify-start h-11 px-4 hover:bg-accent hover:text-accent-foreground"
              onClick={() => handleMenuClick(item.path)}
            >
              <item.icon className="mr-3 h-5 w-5" />
              <span className="text-base">{item.title}</span>
            </Button>
          ))}
        </nav>
      </div>
      <div className="p-6 border-t">
        <ThemeToggle />
      </div>
    </div>
  )
}

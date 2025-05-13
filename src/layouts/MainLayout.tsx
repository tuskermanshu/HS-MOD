import { ProcessContentCheck } from '@/components/contentCheck'
// import { ProcessStatusCheck } from '@/components/ProcessStatusCheck'
import { Sidebar } from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useSystemType } from '@/hooks/useSystemType'
import { cn } from '@/lib/utils'
import { HelpDialog } from '@/pages/guide'
import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [open, setOpen] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const { systemType } = useSystemType()

  useEffect(() => {
    // 监听窗口大小变化
    const handleResize = () => {
      setShowSidebar(window.innerWidth >= 1280) // >= xl breakpoint
    }

    // 初始化
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex h-full">
      <ProcessContentCheck />
      {/* <ProcessStatusCheck /> */}
      {/* 移动端/平板侧边栏 */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed top-4 left-4 z-50 xl:hidden"
          >
            <Menu className="h-5 w-5 text-foreground" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>导航菜单</SheetTitle>
            <SheetDescription>
              应用程序的导航菜单，包含所有主要功能入口
            </SheetDescription>
          </SheetHeader>
          <Sidebar onClose={() => setOpen(false)} onHelp={() => setShowHelp(true)} />
        </SheetContent>
      </Sheet>

      {/* 大屏幕侧边栏 */}
      <div className={`hidden xl:block w-[280px] border-r ${showSidebar ? '' : 'xl:hidden'}`}>
        <Sidebar onClose={() => setShowSidebar(false)} onHelp={() => setShowHelp(true)} />
      </div>

      {/* 主内容区 */}
      <main className="flex-1">
        <div className="h-full w-full">
          {children}
        </div>
      </main>

      {/* 帮助对话框 */}
      <HelpDialog open={showHelp} onOpenChange={setShowHelp} />
    </div>
  )
}

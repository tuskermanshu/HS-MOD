import { Sidebar } from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { MenuIcon } from 'lucide-react'
import { useState } from 'react'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden lg:block w-64 shrink-0" />

      {/* Mobile Sidebar */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="lg:hidden fixed left-4 top-4">
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <Sidebar className="w-full" />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 w-full">
        <div className="h-full w-full">
          {children}
        </div>
      </main>
    </div>
  )
}

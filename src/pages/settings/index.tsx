// 主设置页面
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GlobalSettings } from "./tabs/GlobalSettings"
import { DevelopmentSettings } from "./tabs/DevelopmentSettings"
import { FriendsSettings } from "./tabs/FriendsSettings"
import { HearthstoneSettings } from "./tabs/HearthstoneSettings"
import { OptimizationSettings } from "./tabs/OptimizationSettings"
import { PackSettings } from "./tabs/PackSettings"
import { SkinSettings } from "./tabs/SkinSettings"

export function Settings() {
  return (
    <div className="h-full p-6 space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">配置管理</h2>
        <p className="text-muted-foreground">管理您的应用程序配置</p>
      </div>

      <Tabs defaultValue="global" className="flex flex-col flex-1 h-[calc(100%-5rem)]">
        <div className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <TabsList className="flex w-full overflow-x-auto space-x-2 p-2">
            <TabsTrigger value="global" className="flex-shrink-0 min-w-[120px] px-8 py-3 data-[state=active]:bg-background">基础设置</TabsTrigger>
            <TabsTrigger value="development" className="flex-shrink-0 min-w-[120px] px-8 py-3 data-[state=active]:bg-background">开发</TabsTrigger>
            <TabsTrigger value="friends" className="flex-shrink-0 min-w-[120px] px-8 py-3 data-[state=active]:bg-background">好友</TabsTrigger>
            <TabsTrigger value="hearthstone" className="flex-shrink-0 min-w-[120px] px-8 py-3 data-[state=active]:bg-background">炉石设置</TabsTrigger>
            <TabsTrigger value="optimization" className="flex-shrink-0 min-w-[120px] px-8 py-3 data-[state=active]:bg-background">优化</TabsTrigger>
            <TabsTrigger value="pack" className="flex-shrink-0 min-w-[120px] px-8 py-3 data-[state=active]:bg-background">开包设置</TabsTrigger>
            <TabsTrigger value="skin" className="flex-shrink-0 min-w-[120px] px-8 py-3 data-[state=active]:bg-background">皮肤</TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1 px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <TabsContent value="global" className="mt-0">
              <GlobalSettings />
            </TabsContent>
            <TabsContent value="development" className="mt-0">
              <DevelopmentSettings />
            </TabsContent>
            <TabsContent value="friends" className="mt-0">
              <FriendsSettings />
            </TabsContent>
            <TabsContent value="hearthstone" className="mt-0">
              <HearthstoneSettings />
            </TabsContent>
            <TabsContent value="optimization" className="mt-0">
              <OptimizationSettings />
            </TabsContent>
            <TabsContent value="pack" className="mt-0">
              <PackSettings />
            </TabsContent>
            <TabsContent value="skin" className="mt-0">
              <SkinSettings />
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  )
} 
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export function Logs() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">日志查看</h2>
        <p className="text-muted-foreground">查看系统运行日志</p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>时间</TableHead>
              <TableHead>级别</TableHead>
              <TableHead>消息</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* 添加日志数据 */}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

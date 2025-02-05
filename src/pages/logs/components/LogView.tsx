interface LogViewProps {
  content: string
}

export function LogView({ content }: LogViewProps) {
  const formatLog = (content: string) => {
    return content
      .replace(/<br \/>/g, '\n')
      .replace(/\[(Debug\s*:[\w\s.]+)\]/g, '<span class="text-blue-500">[$1]</span>')
      .replace(/\[(Error\s*:[\w\s.]+)\]/g, '<span class="text-red-500">[$1]</span>')
      .replace(/\[(Info\s*:[\w\s.]+)\]/g, '<span class="text-green-500">[$1]</span>')
      .replace(/\[(Warning\s*:[\w\s.]+)\]/g, '<span class="text-yellow-500">[$1]</span>')
      .replace(/\[(Warn\s*:[\w\s.]+)\]/g, '<span class="text-yellow-500">[$1]</span>')
  }

  return (
    <pre
      className="text-sm font-mono w-full"
      style={{
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
        overflowWrap: 'break-word',
        width: '100%',
        maxWidth: '100%',
        display: 'block',
      }}
      dangerouslySetInnerHTML={{
        __html: formatLog(content),
      }}
    />
  )
}

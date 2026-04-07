import '@fireside/tokens/css/doolit'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-brand="doolit" data-theme="light">
      <body className="bg-background text-foreground">{children}</body>
    </html>
  )
}

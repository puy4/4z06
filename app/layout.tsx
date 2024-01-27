import '@/app/ui/global.css';
import { Providers } from './providers';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="light text-foreground bg-background antialiased"><Providers>{children}</Providers></body>
    </html>
  )
}

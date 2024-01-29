import '@/app/ui/global.css';
import { Providers } from './providers';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (


    <html suppressHydrationWarning lang="en">
      <body className="text-foreground bg-background antialiased"><Providers>{children}</Providers></body>
    </html>
    
  )
}

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-chronicle antialiased">
        {children}
      </body>
    </html>
  );
}

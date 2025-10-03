export const metadata = {
  title: 'Web',
  description: 'Next.js + Supabase scaffold',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}



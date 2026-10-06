import './globals.css';

export const metadata = {
  title: 'Lumen',
  description: 'Your all-in-one academic companion',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

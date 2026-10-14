import './globals.css';

export const metadata = { title: 'Nova Infinity - ERP Artisans', description: 'Application de gestion et facturation pour artisans' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-slate-950 text-slate-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}

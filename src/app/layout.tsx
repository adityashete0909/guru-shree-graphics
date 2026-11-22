import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageContext';
import { AuthProvider } from '@/components/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloatingButton } from '@/components/WhatsAppFloatingButton';

export const metadata: Metadata = {
  title: 'Guru Shree Graphics | Printing & Graphic Designing in Akola',
  description:
    'Guru Shree Graphics is Akola’s premier destination for high-speed digital flex printing, visiting cards, royal wedding cards, offset pamphlets, bill books, and corporate branding. Kunal Complex, Jawahar Nagar Road, Akola.',
  keywords: [
    'Guru Shree Graphics',
    'Akola printing shop',
    'Flex printing Akola',
    'Visiting cards Akola',
    'Wedding cards Akola',
    'Digital printing Maharashtra',
    'Graphic design Akola',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white text-navy-900 selection:bg-brand-orange selection:text-white">
        <LanguageProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <WhatsAppFloatingButton />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

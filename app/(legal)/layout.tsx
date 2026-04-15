export default function LegalLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen">
            {/* Rejilla técnica de 32px */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.15]"
                style={{ backgroundImage: 'radial-gradient(#06b6d4 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <main className="relative z-10 max-w-4xl mx-auto px-8 py-28">
                {children}
            </main>
        </div>
    );
}
export default function LegalLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen bg-[#fefefe]">
            <main className="relative z-10 max-w-screen-2xl mx-auto px-4 py-24 md:px-8 lg:px-12 italic">
                {children}
            </main>
        </div>
    );
}
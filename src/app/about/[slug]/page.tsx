import React from 'react';

// Ye hamara data map hai jo slug ko ID se connect karega
const contentData: any = {
    'about-bptpia': { id: 1, title: 'About BPTPIA' },
    'mission-vision': { id: 2, title: 'Mission & Vision' },
    'chairman-message': { id: 3, title: 'Chairman Message' },
    'secretary-message': { id: 4, title: 'Secretary Message' },
};

export default async function WhoWeArePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const pageData = contentData[slug];

    if (!pageData) {
        return <div className="text-center py-20">Page Not Found</div>;
    }

    return (
        <main className="min-h-screen pt-20"> {/* pt-20 navbar ke space ke liye */}
            <section className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-blue-900 mb-6">
                    {pageData.title} (ID: {pageData.id})
                </h1>
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                    <p className="text-gray-600 leading-relaxed">
                        Yaha aapka premium content aayega...
                    </p>
                </div>
            </section>
        </main>
    );
}
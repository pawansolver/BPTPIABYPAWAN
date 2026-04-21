import React from 'react';
import Header from '@/components/header';
import GovernmentLetterClientDetails from '@/components/government-letter-client-details';
import { Footer } from '@/components/ui/footer-section';
import { getLetterById } from '@/app/actions/letterActions';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

const GovernmentLetterPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const result = await getLetterById(id);

  // Backend URL
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  let letter;

  // Agar backend se data successfully mil gaya
  console.log('[DEBUG] Page received result:', result);
  
  if (result && result.success && result.data) {
    const dbData = result.data;
    console.log('[DEBUG] Raw DB data:', dbData);
    console.log('[DEBUG] DB images:', dbData.images);
    console.log('[DEBUG] DB imageSrc:', dbData.imageSrc);

    // Date ko nicely format karna (e.g., "March 15, 2024")
    const formattedDate = new Date(dbData.date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: '2-digit'
    });

    // Parse images - backend sends JSON string or array
    let parsedImages: string[] = [];
    if (dbData.images) {
      if (typeof dbData.images === 'string') {
        try {
          parsedImages = JSON.parse(dbData.images);
        } catch (e) {
          console.log('[DEBUG] Failed to parse images JSON:', dbData.images);
          parsedImages = [dbData.images];
        }
      } else if (Array.isArray(dbData.images)) {
        parsedImages = dbData.images;
      }
    }
    
    // Prepare images array (multiple pages support)
    const rawImages = parsedImages.length > 0
      ? parsedImages
      : [dbData.imageSrc];
    
    // Filter valid images and only prepend API_BASE_URL if needed
    const images = rawImages
      .filter((img: string) => img && typeof img === 'string' && img.trim() !== '' && !img.includes('undefined'))
      .map((img: string) => {
        // Only skip prepending if it's already a full URL (starts with http)
        if (img.startsWith('http')) {
          return img;
        }
        // For relative paths (starting with / or not), prepend API_BASE_URL
        // Ensure no double slashes
        const normalizedImg = img.startsWith('/') ? img : `/${img}`;
        return `${API_BASE_URL}${normalizedImg}`;
      });

    letter = {
      id: dbData.id.toString(),
      title: dbData.title,
      refNumber: dbData.refNumber,
      date: formattedDate,
      subject: dbData.subject,
      description: dbData.description,
      imageSrc: dbData.imageSrc 
        ? (dbData.imageSrc.startsWith('http') 
            ? dbData.imageSrc 
            : `${API_BASE_URL}${dbData.imageSrc.startsWith('/') ? dbData.imageSrc : `/${dbData.imageSrc}`}`)
        : '', 
      images: images,
      category: dbData.category
    };
  } else {
    // Letter not found - show Not Found UI
    return (
      <div className="min-h-screen bg-slate-50 font-sans leading-relaxed text-slate-900">
        <Header />
        <main className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-4">📄</div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Letter Not Found</h1>
            <p className="text-slate-600 mb-2">The requested government letter could not be found.</p>
            <p className="text-slate-500 text-sm mb-8">ID: {id}</p>
            <div className="space-y-2">
              <p className="text-red-500 text-sm">{result?.message || 'No data available from backend'}</p>
              <p className="text-amber-600 text-sm font-medium">⚠️ Please restart backend server if you haven&apos;t already!</p>
            </div>
            <a 
              href="/" 
              className="inline-block mt-8 px-6 py-3 bg-[#003366] text-white rounded-lg hover:bg-[#004080] transition-colors"
            >
              Go Back Home
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans leading-relaxed text-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-4 md:py-6">
        <div className="max-w-7xl mx-auto">
          <GovernmentLetterClientDetails letter={letter} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GovernmentLetterPage;
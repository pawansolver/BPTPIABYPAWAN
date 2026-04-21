import Header from "@/components/header";
import { Footer } from "@/components/ui/footer-section";
import { getAllGovernmentLetters } from "@/app/actions/letterActions";
import Link from "next/link";
import { Calendar, FileCheck } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function GovernmentLettersPage() {
  const result = await getAllGovernmentLetters();

  return (
    <div className="min-h-screen bg-slate-50 font-sans leading-relaxed text-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[#003366] mb-2">Government Letters</h1>
          <p className="text-slate-600 mb-8">Official correspondence and notifications</p>

          {!result.success && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-600 font-medium">Error: {result.message}</p>
            </div>
          )}

          {result.success && (!result.data || result.data.length === 0) && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-8 text-center">
              <div className="text-5xl mb-4">📭</div>
              <h2 className="text-xl font-semibold text-amber-800 mb-2">No Letters Found</h2>
              <p className="text-amber-600">No letters available in the database.</p>
            </div>
          )}

          {result.success && result.data && result.data.length > 0 && (
            <div className="grid gap-4">
              {result.data.map((letter: any) => (
                <Link
                  key={letter.id}
                  href={`/government-letter/${letter.id}`}
                  className="block bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-blue-50 text-blue-500 shrink-0">
                      <FileCheck size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-800 mb-1">
                        {letter.title}
                      </h3>
                      <p className="text-sm text-[#00b4d8] font-medium mb-2">
                        Ref: {letter.refNumber}
                      </p>
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                        {letter.subject}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(letter.date).toLocaleDateString('en-GB')}
                        </span>
                        <span className={`px-2 py-0.5 rounded ${
                          letter.isActive 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {letter.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <span className="text-slate-400">
                          ID: {letter.id}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

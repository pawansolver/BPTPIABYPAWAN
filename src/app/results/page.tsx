"use client"

import type React from "react"
import { useState, useRef, useMemo, useEffect } from "react"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Home,
  FileText,
  Info,
  AlertTriangle,
  Filter,
  Download,
  Loader2
} from "lucide-react"

// ==========================================
// 1. IMPORT NAVBAR & TOPBAR
// ==========================================
import TopBar from "@/components/home-content/topbar";
import NavBar from "@/components/home-content/navbar";
import { Footer } from "@/components/ui/footer-section"

// ==========================================
// 2. TYPES & CONSTANTS
// ==========================================
interface ResultItem {
  id: number;
  refNo: string;
  date: string;
  examName: string;
  phaseNum: number;
  isNew: boolean;
  courseType: string;
  pdfUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const ITEMS_PER_PAGE = 10;
import { API_BASE_URL } from '@/lib/apiConfig';

export default function ResultsPage() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [resultsData, setResultsData] = useState<ResultItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // --- Fetch Data from API ---
  useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${API_BASE_URL}/api/results?active=true`)
        const result = await response.json()
        
        if (result.success) {
          setResultsData(result.data)
        } else {
          setError('Failed to fetch results')
        }
      } catch (err) {
        console.error('Error fetching results:', err)
        setError('Failed to connect to server')
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [])

  // --- Process Data ---
  const processedData = useMemo(() => {
    let data = resultsData.filter((session: ResultItem) =>
      session.examName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.refNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.date.includes(searchQuery)
    );

    data.sort((a: ResultItem, b: ResultItem) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      switch (sortOrder) {
        case "newest": return dateB - dateA;
        case "oldest": return dateA - dateB;
        case "a-z": return a.examName.localeCompare(b.examName);
        case "z-a": return b.examName.localeCompare(a.examName);
        default: return 0;
      }
    });
    return data;
  }, [resultsData, searchQuery, sortOrder]);

  const totalPages = Math.ceil(processedData.length / ITEMS_PER_PAGE);
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [processedData, currentPage]);

  const handleDownload = (item: ResultItem) => {
    if (item.pdfUrl) {
      const pdfUrl = `${API_BASE_URL}${item.pdfUrl}`;
      window.open(pdfUrl, '_blank');
    } else {
      alert(`PDF not available for: ${item.examName}`);
    }
  };

  return (
    <main className="w-full bg-white text-textmain min-h-screen relative font-sans">

      {/* FIXED HEADER */}
      <div className="fixed top-0 left-0 w-full z-[100] flex flex-col shadow-sm">
        <TopBar />
        <NavBar />
      </div>

      {/* PADDING ADJUSTMENT */}
      <section ref={sectionRef} className="w-full pt-[230px] lg:pt-[185px] pb-10 px-4 md:px-8 relative z-10">

        <div className="container-custom">

          {/* BREADCRUMB - Synced with brandOrange and brandGreen */}
          {/* <nav className="flex items-center gap-1.5 text-[11px] md:text-xs text-slate-500 mb-5 font-medium">
            <Link href="/" className="hover:text-brandOrange transition-colors flex items-center gap-1"><Home className="w-3.5 h-3.5" /> Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-brandGreen font-bold">Examination Results</span>
          </nav> */}

          {/* PAGE TITLE & CONTROLS - Synced with heading-xl & text-muted */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-6 border-b border-slate-200 pb-5">
            <div className="flex-1 lg:text-left">
              <h1 className="heading-xl !text-left !m-0">
                Examination Results
              </h1>
              <p className="text-muted !text-left !mx-0 mt-1.5 !max-w-2xl !text-xs md:!text-sm">
                Welcome to the official result portal. Access all current and archived examination results, merit lists, and official notifications here.
              </p>
            </div>

            {/* SEARCH AND SORT CONTROLS */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full lg:w-auto shrink-0">

              {/* Search Bar - Synced with brandGreen focus */}
              <div className="relative w-full sm:w-60">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search exam or Ref No..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-white border border-slate-300 rounded-sm px-3 py-2 pl-9 text-xs font-medium focus:outline-none focus:border-brandGreen focus:ring-1 focus:ring-brandGreen transition-all shadow-sm"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="relative w-full sm:w-44">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortOrder}
                  onChange={(e) => {
                    setSortOrder(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-white border border-slate-300 rounded-sm px-3 py-2 pl-9 pr-7 text-xs font-medium focus:outline-none focus:border-brandGreen focus:ring-1 focus:ring-brandGreen transition-all shadow-sm appearance-none cursor-pointer"
                >
                  <option value="newest">Latest Published</option>
                  <option value="oldest">Oldest First</option>
                  <option value="a-z">Title (A-Z)</option>
                  <option value="z-a">Title (Z-A)</option>
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>

            </div>
          </div>

          {/* DATA TABLE - Synced with bg-textmain header */}
          <div className="bg-white border border-slate-200 shadow-sm rounded-sm overflow-hidden mb-6">
            <div className="overflow-x-auto w-full scrollbar-hide">
              <table className="w-full min-w-[750px] text-left border-collapse">

                <thead className="bg-textmain text-white text-xs md:text-sm">
                  <tr>
                    <th className="py-3 px-4 font-bold uppercase tracking-wider w-16 text-center border-r border-white/10">Sl. No.</th>
                    <th className="py-3 px-4 font-bold uppercase tracking-wider w-36 border-r border-white/10 text-center">Published Date</th>
                    <th className="py-3 px-4 font-bold uppercase tracking-wider">Results / Official Notifications</th>
                    <th className="py-3 px-4 font-bold uppercase tracking-wider w-28 text-center">Action</th>
                  </tr>
                </thead>

                <tbody className="text-xs md:text-sm">
                  {isLoading ? (
                    <tr>
                      <td colSpan={4} className="py-16 text-center text-slate-500 bg-slate-50/50">
                        <Loader2 className="w-8 h-8 text-brandOrange mx-auto mb-3 animate-spin" />
                        <p className="font-black text-lg text-textmain m-0">Loading Results...</p>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={4} className="py-16 text-center text-slate-500 bg-slate-50/50">
                        <AlertTriangle className="w-8 h-8 text-brandOrange mx-auto mb-3" />
                        <p className="font-black text-lg text-textmain m-0">Error Loading Results</p>
                        <p className="text-xs md:text-sm mt-1 font-medium m-0">{error}</p>
                      </td>
                    </tr>
                  ) : currentItems.length > 0 ? (
                    currentItems.map((session, index) => {
                      const serialNumber = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;

                      return (
                        <tr key={session.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                          <td className="py-3 px-4 text-center text-slate-600 font-bold border-r border-slate-100 align-top">
                            <span className="inline-block mt-1">{serialNumber}</span>
                          </td>

                          <td className="py-3 px-4 border-r border-slate-100 text-slate-700 font-bold whitespace-nowrap text-center align-top">
                            <span className="inline-block mt-1 px-2.5 py-0.5 bg-slate-100 rounded-sm border border-slate-200">{session.date}</span>
                          </td>

                          <td className="py-3 px-4 align-top">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-start gap-2.5">
                                <button
                                  onClick={() => handleDownload(session)}
                                  className="text-brandGreen hover:text-brandOrange text-left font-bold transition-colors hover:underline underline-offset-2 leading-tight"
                                >
                                  {session.examName}
                                </button>

                                {session.isNew && (
                                  <span className="shrink-0 animate-pulse bg-brandOrange text-white text-[9px] px-1.5 py-0.5 rounded-sm font-black uppercase tracking-widest shadow-sm mt-0.5">
                                    New
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium mt-0.5">
                                <span>Ref No: <strong className="text-textmain">{session.refNo}</strong></span>
                                {session.phaseNum > 0 && (
                                  <>
                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                    <span>Phase: <strong className="text-textmain">{session.phaseNum}</strong></span>
                                  </>
                                )}
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-4 text-center align-top">
                            <button
                              onClick={() => handleDownload(session)}
                              className="inline-flex flex-col items-center justify-center gap-1 p-1.5 rounded-sm border border-transparent hover:border-slate-200 hover:bg-white transition-all"
                            >
                              <div className="relative w-7 h-9 bg-white border-2 border-brandOrange rounded-sm shadow-sm flex items-center justify-center overflow-hidden group-hover:bg-brandOrange/5 transition-colors">
                                <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-slate-100 border-b-2 border-l-2 border-brandOrange shadow-sm"></div>
                                <span className="text-brandOrange font-black text-[9px] tracking-tighter mt-1.5">PDF</span>
                              </div>
                              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider group-hover:text-brandGreen transition-colors flex items-center gap-1">
                                <Download className="w-2.5 h-2.5" /> Get
                              </span>
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-16 text-center text-slate-500 bg-slate-50/50">
                        <Search className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                        <p className="font-black text-lg text-textmain m-0">No results found</p>
                        <p className="text-xs md:text-sm mt-1 font-medium m-0">We couldn't find any records matching "{searchQuery}".</p>
                        <button
                          onClick={() => { setSearchQuery(""); setSortOrder("newest"); }}
                          className="mt-3 px-5 py-1.5 bg-white border border-slate-300 rounded-sm text-xs font-bold text-brandGreen hover:bg-slate-100 transition-colors shadow-sm"
                        >
                          Clear Filters
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* PAGINATION CONTROLS */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mb-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-sm border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 hover:text-brandGreen disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-textmain px-4 bg-white border border-slate-300 py-1.5 rounded-sm shadow-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-sm border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 hover:text-brandGreen disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* INSTRUCTIONS & DISCLAIMER */}
          <div className="mt-6 flex flex-col gap-4">
            <div className="bg-white border border-slate-200 rounded-sm p-5 md:p-6 shadow-sm">
              <h3 className="text-base font-bold text-textmain mb-3 flex items-center gap-2 uppercase tracking-tight m-0">
                <Info className="w-4 h-4 text-brandGreen" /> Important Instructions
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm text-textmain font-medium leading-relaxed m-0">
                <li>Keep your <strong className="text-brandOrange">Roll Number / Registration Number</strong> handy.</li>
                <li>Report any marks discrepancies to your college administration immediately.</li>
                <li>Provisional results are for immediate information only.</li>
                <li>Original mark sheets will be issued separately.</li>
              </ul>
            </div>

            <div className="bg-[#fffbfb] border border-brandOrange/30 rounded-sm p-5 shadow-sm flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-brandOrange shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-brandOrange uppercase tracking-wider mb-1 m-0">Legal Disclaimer</h4>
                <p className="text-[11px] md:text-xs text-textmain leading-relaxed font-medium text-justify m-0">
                  The Bihar Private Technical & Professional Institutions Association is not responsible for inadvertent errors in results published online. These cannot be treated as original mark sheets.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
      {/* Footer */}
      <Footer />
    </main>
  )
}
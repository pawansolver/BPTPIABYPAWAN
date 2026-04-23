"use client";

import Header from "@/components/header";
import {
  Search,
  MapPin,
  Phone,
  Mail,
  Globe,
  Download,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import React, { useState, useEffect, Fragment, useCallback } from "react";
import {
  getColleges,
  ApiCollege,
  PaginationData,
} from "@/services/collegeApi";
import { Footer } from "@/components/ui/footer-section";

const PER_PAGE = 10;

// API Base URL for direct file access - from central config (local 5000 > production)
import { API_BASE_URL } from '@/lib/apiConfig';

export default function PolytechnicCollegesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [colleges, setColleges] = useState<ApiCollege[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch colleges from API
  const fetchColleges = useCallback(async () => {
    console.log("[POLYTECHNIC] Fetching colleges...", { currentPage, searchTerm });
    setLoading(true);
    setError(null);
    try {
      const params = {
        type: "POLYTECHNIC" as const,
        page: currentPage,
        limit: PER_PAGE,
        search: searchTerm,
      };
      console.log("[POLYTECHNIC] Request params:", params);

      const response = await getColleges(params);
      console.log("[POLYTECHNIC] API Response:", response);

      if (response.success) {
        console.log("[POLYTECHNIC] Success - Colleges count:", response.data.length);
        console.log("[POLYTECHNIC] Pagination:", response.pagination);
        setColleges(response.data);
        setPagination(response.pagination || null);
      } else {
        console.error("[POLYTECHNIC] API returned error:", response.message);
        setError(response.message || "Failed to fetch colleges");
      }
    } catch (err) {
      console.error("[POLYTECHNIC] Fetch exception:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      console.log("[POLYTECHNIC] Fetch complete, loading:", false);
      setLoading(false);
    }
  }, [currentPage, searchTerm]);

  // Fetch on mount and when dependencies change
  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  // Reset page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const goToPage = (p: number) => {
    if (p < 1 || (pagination && p > pagination.totalPages)) return;
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = (): (number | "...")[] => {
    if (!pagination) return [];
    const pages: (number | "...")[] = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
      if (i === 1 || i === pagination.totalPages || Math.abs(i - currentPage) <= 1) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  const totalColleges = pagination?.total || 0;
  const startIdx = (currentPage - 1) * PER_PAGE;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        {/* ── Sticky Sub Header ── */}
        <div className="bg-white border-b border-gray-200 sticky top-[164px] z-40 shadow-sm">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Title + Count */}
            <div className="flex items-center gap-3">
              <h1 className="text-[17px] font-bold text-slate-900 tracking-wide uppercase">
                Polytechnic Colleges
              </h1>
              <span className="text-[12px] font-medium bg-blue-50 text-blue-700 rounded-full px-3 py-1">
                {totalColleges} Colleges
              </span>
            </div>

            {/* Search + Download */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={15}
                />
                <input
                  type="text"
                  placeholder="Search colleges or city..."
                  className="w-full pl-9 pr-4 py-2 text-[13px] bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all font-normal placeholder-slate-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <a
                href="/pdf/polytechnic_colleges_2025.pdf"
                download
                className="flex items-center gap-1.5 bg-slate-900 hover:bg-black text-white py-2 px-4 text-[12.5px] font-semibold rounded-md transition-colors whitespace-nowrap shadow-sm"
              >
                <Download size={14} />
                Download PDF
              </a>
            </div>
          </div>
        </div>

        {/* ── Loading State ── */}
        {loading && (
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-20 pb-16 text-center">
            <Loader2 size={36} className="text-blue-500 mx-auto mb-4 animate-spin" />
            <p className="text-sm font-medium text-slate-500">Loading colleges...</p>
          </div>
        )}

        {/* ── Error State ── */}
        {!loading && error && (
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-20 pb-16 text-center">
            <GraduationCap size={44} className="text-red-400 mx-auto mb-4" />
            <p className="text-sm font-bold text-red-600 mb-3">{error}</p>
            <button
              onClick={() => fetchColleges()}
              className="text-xs font-semibold text-slate-700 bg-white border border-slate-300 px-4 py-2 rounded-md hover:bg-slate-50"
            >
              Try Again
            </button>
          </div>
        )}

        {/* ── College Cards List (Compact Single Column) ── */}
        {!loading && !error && (
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-8 pb-16 flex flex-col">
            {colleges.length > 0 ? (
              <div className="flex flex-col gap-5">
                {colleges.map((college) => (
                  <div
                    key={`poly-group-${college.id}`}
                    className="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group"
                  >
                    {/* Card Header: Name + Seats */}
                    <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
                      <h3 className="text-[17px] font-bold text-blue-600 leading-snug group-hover:text-blue-800 transition-colors">
                        {college.name}
                      </h3>
                      <div className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-700 rounded px-3 py-1 text-[11px] font-bold whitespace-nowrap self-start sm:self-auto tracking-wide">
                        <GraduationCap size={14} className="text-slate-400 font-normal" />
                        {college.totalIntake} Seats
                      </div>
                    </div>

                    {/* Card Meta: Address, Phone, Email, Website */}
                    <div className="px-5 py-4 flex-grow border-b border-slate-50 flex flex-col gap-3.5 bg-white">
                      {/* Bold / Light Combination for Address */}
                      <div className="flex items-start gap-2.5 text-[13.5px]">
                        <MapPin size={16} className="flex-shrink-0 text-blue-500 mt-0.5" />
                        <span className="font-normal text-slate-600 leading-relaxed">
                          {college.address}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-1 pt-3 border-t border-slate-100">
                        {college.telephone && (
                          <div className="flex items-center gap-2 text-[13px]">
                            <Phone size={14} className="flex-shrink-0 text-slate-400" />
                            <span className="font-medium text-slate-800">{college.telephone}</span>
                          </div>
                        )}
                        {college.email && (
                          <div className="flex items-center gap-2 text-[13px]">
                            <Mail size={14} className="flex-shrink-0 text-slate-400" />
                            <span className="font-medium text-slate-800">{college.email}</span>
                          </div>
                        )}
                        {college.website && (
                          <a
                            href={`http://${college.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[13px] group/link"
                          >
                            <Globe size={14} className="flex-shrink-0 text-slate-400 group-hover/link:text-blue-500 transition-colors" />
                            <span className="font-medium text-blue-600 group-hover/link:underline">{college.website}</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Card Footer: Branch Pills + Fees + Brochure */}
                    <div className="px-5 py-4 bg-[#FAFAFA] flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                      {/* Branches */}
                      <div className="flex flex-wrap items-center gap-2 flex-1">
                        {[
                          { key: "CE", label: "Civil Engineering" },
                          { key: "ME", label: "Mechanical Engineering" },
                          { key: "EE", label: "Electrical Engineering" },
                          { key: "EEE", label: "Electrical & Electronics" },
                          { key: "ECE", label: "Electronics & Communication" },
                          { key: "CSE", label: "Computer Science" },
                          { key: "IT", label: "Information Technology" },
                          { key: "AI", label: "Artificial Intelligence" },
                        ].map(({ key, label }) => {
                          const value = college[`intake${key}` as keyof ApiCollege] as string;
                          return value && value !== "-" ? (
                            <div
                              key={`branch-${key}`}
                              className="text-[11px] bg-white border border-slate-200 text-slate-500 rounded flex items-center shadow-sm overflow-hidden"
                            >
                              <span className="px-2 py-1 font-normal bg-slate-50 border-r border-slate-200">{label}</span>
                              <span className="px-2 py-1 font-bold text-slate-900">{value}</span>
                            </div>
                          ) : null;
                        })}
                        {college.intakeOther && college.intakeOther !== "-" && (
                          <div className="text-[11px] bg-white border border-slate-200 text-slate-500 rounded flex items-center shadow-sm overflow-hidden">
                            <span className="px-2 py-1 font-normal bg-slate-50 border-r border-slate-200">Other</span>
                            <span className="px-2 py-1 font-bold text-slate-900">{college.intakeOther}</span>
                          </div>
                        )}
                      </div>

                      {/* Fees & Action */}
                      <div className="flex items-center gap-5 sm:pl-4 sm:border-l border-slate-200 pt-3 sm:pt-0 border-t sm:border-t-0">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-normal text-slate-400 uppercase tracking-wider mb-0.5">
                            Fees
                          </span>
                          <span className="text-[14px] font-bold text-slate-900">
                            {college.fees}
                          </span>
                        </div>

                        {college.brochureUrl && (
                          <a
                            href={`${API_BASE_URL}${college.brochureUrl}`}
                            download
                            className="flex items-center justify-center gap-1.5 px-4 py-2 text-[12px] font-semibold text-green-700 bg-green-50 border border-green-200 rounded hover:bg-green-600 hover:text-white hover:border-green-600 transition-all shadow-sm"
                          >
                            <Download size={13} />
                            Brochure
                          </a>
                        )}
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 bg-white border border-slate-200 rounded-lg text-center shadow-sm">
                <GraduationCap size={40} className="text-slate-300 mx-auto mb-4" />
                <p className="text-sm font-medium text-slate-600 mb-2">
                  No colleges found matching &quot;{searchTerm}&quot;
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  Clear search filters
                </button>
              </div>
            )}

            {/* ── Pagination ── */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-8 flex items-center justify-between flex-wrap gap-4 bg-white px-5 py-3 rounded-lg border border-slate-200 shadow-sm">
                <p className="text-[12.5px] font-normal text-slate-500">
                  Showing{" "}
                  <span className="text-slate-900 font-bold">
                    {startIdx + 1}–{Math.min(startIdx + PER_PAGE, pagination.total)}
                  </span>{" "}
                  of{" "}
                  <span className="text-slate-900 font-bold">{pagination.total}</span>{" "}
                  colleges
                </p>

                <div className="flex items-center gap-1.5">
                  {/* Prev */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider border border-slate-200 bg-white rounded text-slate-500 hover:border-slate-300 hover:text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft size={13} /> Prev
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1 hidden sm:flex">
                    {getPageNumbers().map((p, i) =>
                      p === "..." ? (
                        <span
                          key={`dots-${i}`}
                          className="px-2 text-slate-400 text-[13px] font-bold"
                        >
                          …
                        </span>
                      ) : (
                        <button
                          key={`page-${p}`}
                          onClick={() => goToPage(p as number)}
                          className={`w-8 h-8 flex items-center justify-center rounded text-[12px] font-bold border transition-all ${p === currentPage
                            ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
                            }`}
                        >
                          {p}
                        </button>
                      )
                    )}
                  </div>

                  {/* Next */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === pagination.totalPages}
                    className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider border border-slate-200 bg-white rounded text-slate-500 hover:border-slate-300 hover:text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Next <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
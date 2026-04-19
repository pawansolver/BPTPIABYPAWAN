"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  GraduationCap,
  MonitorCheck,
  Megaphone,
  Download as DownloadIcon,
  BadgeCheck,
  FileText,
  Image as ImageIcon,
  BookOpen,
  Briefcase,
  Video,
  Contact,
  Loader2,
} from "lucide-react";
import type { Download } from "@/services/downloadApi";
import { getDownloads, trackDownload } from "@/services/downloadApi";

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  BookOpen,
  BadgeCheck,
  MonitorCheck,
  Megaphone,
  ImageIcon,
  Video,
  Contact,
  Briefcase,
  Download: DownloadIcon,
};

interface DownloadLink {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isExternal?: boolean;
}

export default function SupportSection() {
  const [studentDownloads, setStudentDownloads] = useState<DownloadLink[]>([]);
  const [supportLinks, setSupportLinks] = useState<DownloadLink[]>([]);
  const [officialDownloads, setOfficialDownloads] = useState<DownloadLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllDownloads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all three types in parallel
      const [studentRes, supportRes, officialRes] = await Promise.all([
        getDownloads({ type: "STUDENT_DOWNLOAD", isActive: true }),
        getDownloads({ type: "SUPPORT_LINK", isActive: true }),
        getDownloads({ type: "QUICK_LINK", isActive: true }),
      ]);

      // API base URL for file serving
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      // Transform API data to component format
      const transformDownload = (d: Download): DownloadLink => {
        // Build full URL for file downloads
        let href = "#";
        if (d.fileUrl) {
          // If fileUrl starts with /uploads/, prepend API base URL
          href = d.fileUrl.startsWith("/uploads/") 
            ? `${API_BASE_URL}${d.fileUrl}` 
            : d.fileUrl;
        } else if (d.externalUrl) {
          href = d.externalUrl;
        }

        return {
          title: d.title,
          href,
          icon: iconMap[d.icon] || FileText,
          isExternal: !!d.fileUrl || (!!d.externalUrl && d.externalUrl.startsWith("http")),
        };
      };

      setStudentDownloads(studentRes.success ? studentRes.data.map(transformDownload) : []);
      setSupportLinks(supportRes.success ? supportRes.data.map(transformDownload) : []);
      setOfficialDownloads(officialRes.success ? officialRes.data.map(transformDownload) : []);
    } catch (err) {
      console.error("[SupportSection] Error fetching downloads:", err);
      setError(err instanceof Error ? err.message : "Failed to load downloads");
      // Set empty arrays to show sections without content
      setStudentDownloads([]);
      setSupportLinks([]);
      setOfficialDownloads([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllDownloads();
  }, [fetchAllDownloads]);

  const handleDownloadClick = async (e: React.MouseEvent, item: DownloadLink) => {
    // Find the download ID from the API data
    // This is a simplified approach - in production, you might want to store the ID separately
    if (item.isExternal && item.href !== "#") {
      e.preventDefault();
      window.open(item.href, "_blank");
    }
  };

  // Dynamic Render Function
  const renderLinks = (links: DownloadLink[], sectionType: string) => {
    // Logic: Agar 5 se zyada hai, tabhi scroll hoga
    const isScrollable = links.length > 5;

    if (loading) {
      return (
        <div className="mt-2 flex-1 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        </div>
      );
    }

    if (links.length === 0) {
      return (
        <div className="mt-2 flex-1 flex items-center justify-center text-gray-400 text-sm">
          No items available
        </div>
      );
    }

    const ListContent = () => (
      <ul className="flex flex-col w-full pb-2">
        {links.map((link, index) => {
          const Icon = link.icon;
          return (
            <li key={index} className="border-b border-dotted border-gray-400 last:border-none w-full">
              <Link
                href={link.href}
                onClick={(e) => handleDownloadClick(e, link)}
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 py-3 text-[14px] font-medium text-[#1e3a8a] hover:text-[#dc2626] hover:bg-gray-50 transition-all duration-200 px-1 group w-full"
              >
                <Icon className="w-5 h-5 text-[#1e3a8a] group-hover:text-[#dc2626] transition-colors flex-shrink-0" />
                <span className="leading-tight">{link.title}</span>
                {link.isExternal && <span className="ml-auto text-xs text-gray-400">↗</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    );

    // Agar 5 ya kam items hain -> Normal dikhega
    if (!isScrollable) {
      return (
        /* Added overflow-y-auto just in case, but flex-1 locks it perfectly */
        <div className="mt-2 flex-1 w-full relative overflow-y-auto">
          <ListContent />
        </div>
      );
    }

    // Agar 5 se zyada items hain -> Scroll hoga
    return (
      /* Using flex-1 forces it to take EXACTLY the remaining space of the h-[360px] parent, no hardcoded heights needed */
      <div className="mt-2 flex-1 relative overflow-hidden scroll-wrapper w-full">
        {/* Soft fade gradients */}
        <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex flex-col auto-scroll-container">
          {[...Array(2)].map((_, arrayIndex) => (
            <div key={arrayIndex} aria-hidden={arrayIndex > 0}>
              <ListContent />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* CSS: Auto-Scroll Logic */}
      <style>{`
        @keyframes vertical-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); } 
        }
        .auto-scroll-container {
          animation: vertical-scroll 15s linear infinite;
        }
        .scroll-wrapper:hover .auto-scroll-container {
          animation-play-state: paused;
        }
      `}</style>

      {/* Main Container - Ensuring padding so bottom shadows/borders don't get cut */}
      <div className="w-full max-w-[1400px] mx-auto py-4 px-4 sm:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* ================= BOX 1: STUDENT'S DOWNLOAD ================= */}
          {/* CHANGED min-h-[350px] TO STRICT h-[360px] */}
          <div className="bg-white rounded-md shadow-[0_2px_15px_rgba(0,0,0,0.08)] border border-gray-200 border-b-4 border-b-[#1e3a8a] p-5 w-full flex flex-col h-[360px] overflow-hidden">
            <div className="flex items-center mb-5 shrink-0 z-10 bg-white">
              <div className="w-[6px] h-[28px] bg-[#dc2626] mr-3"></div>
              <h2 className="text-[20px] font-bold flex items-center gap-2 uppercase tracking-tight m-0">
                <span className="text-[#dc2626]">Student's</span>
                <span className="text-[#1e3a8a]">Download</span>
                <DownloadIcon className="text-[#1e3a8a] w-5 h-5 ml-1 hidden sm:block" />
              </h2>
            </div>
            {renderLinks(studentDownloads, "student")}
          </div>

          {/* ================= BOX 2: SUPPORT SECTION ================= */}
          {/* CHANGED min-h-[350px] TO STRICT h-[360px] */}
          <div className="bg-white rounded-md shadow-[0_2px_15px_rgba(0,0,0,0.08)] border border-gray-200 border-b-4 border-b-[#dc2626] p-5 w-full flex flex-col h-[360px] overflow-hidden">
            <div className="flex items-center mb-5 shrink-0 z-10 bg-white">
              <div className="w-[6px] h-[28px] bg-[#dc2626] mr-3"></div>
              <h2 className="text-[20px] font-bold flex items-center gap-2 uppercase tracking-tight m-0">
                <span className="text-[#dc2626]">Support</span>
                <span className="text-[#1e3a8a]">Section</span>
                <GraduationCap className="text-[#1e3a8a] w-5 h-5 ml-1 hidden sm:block" />
              </h2>
            </div>
            {renderLinks(supportLinks, "support")}
          </div>

          {/* ================= BOX 3: OFFICIAL DOWNLOADS ================= */}
          {/* CHANGED min-h-[350px] TO STRICT h-[360px] */}
          <div className="bg-white rounded-md shadow-[0_2px_15px_rgba(0,0,0,0.08)] border border-gray-200 border-b-4 border-b-[#1e3a8a] p-5 w-full flex flex-col h-[360px] overflow-hidden">
            <div className="flex items-center mb-5 shrink-0 z-10 bg-white">
              <div className="w-[6px] h-[28px] bg-[#dc2626] mr-3"></div>
              <h2 className="text-[20px] font-bold flex items-center gap-2 uppercase tracking-tight m-0">
                <span className="text-[#dc2626]">Official</span>
                <span className="text-[#1e3a8a]">Downloads</span>
                <Briefcase className="text-[#1e3a8a] w-5 h-5 ml-1 hidden sm:block" />
              </h2>
            </div>
            {renderLinks(officialDownloads, "official")}
          </div>

        </div>
      </div>
    </>
  );
}
import TopBar from './home-content/topbar';
import NavBar from './home-content/navbar'; // Make sure the navbar component created earlier is correctly imported

export default function Header() {
  return (
    // Sticky header keeps it at the top when scrolling
    <header className="w-full flex flex-col z-50 sticky top-0 bg-white">
      {/* 1. Logo and Action Buttons */}
      <TopBar />

      {/* 2. Main Navigation Menu (The component with the glowing top-edge shadow) */}
      <NavBar />
    </header>
  );
}

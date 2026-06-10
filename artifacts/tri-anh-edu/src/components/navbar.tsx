import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Bell, ChevronDown, BookOpen, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Trang chủ", href: "/" },
  { label: "Khóa học", href: "/courses" },
  { label: "Đề thi", href: "/exams" },
  { label: "Giáo viên", href: "/teachers" },
  { label: "Blog", href: "/blog" },
  { label: "Giới thiệu", href: "/#about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" data-testid="link-logo">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E85A2A] to-[#F7941D] flex items-center justify-center shadow-sm">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-[#102A43] text-lg tracking-tight">
                TRI ANH EDU
              </span>
            </div>
          </Link>

          {/* Center Nav */}
          <nav className="hidden lg:flex items-center gap-1" data-testid="nav-desktop">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}>
                <span
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                    location === link.href
                      ? "text-[#E85A2A] bg-[#E85A2A]/8"
                      : "text-[#1F2937] hover:text-[#E85A2A] hover:bg-[#E85A2A]/5"
                  )}
                  data-testid={`nav-link-${link.label}`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-[#102A43] font-medium" data-testid="button-login">
                Đăng nhập
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="sm"
                className="bg-[#E85A2A] hover:bg-[#d14f23] text-white font-semibold shadow-sm px-5"
                data-testid="button-register"
              >
                Đăng ký
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-[#102A43]"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border/50 px-4 py-4 space-y-1">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}>
              <span
                className={cn(
                  "block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                  location === link.href
                    ? "text-[#E85A2A] bg-[#E85A2A]/8"
                    : "text-[#1F2937] hover:text-[#E85A2A]"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </span>
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link href="/login"><Button variant="outline" className="w-full" onClick={() => setMobileOpen(false)}>Đăng nhập</Button></Link>
            <Link href="/register"><Button className="w-full bg-[#E85A2A] hover:bg-[#d14f23] text-white" onClick={() => setMobileOpen(false)}>Đăng ký miễn phí</Button></Link>
          </div>
        </div>
      )}
    </header>
  );
}

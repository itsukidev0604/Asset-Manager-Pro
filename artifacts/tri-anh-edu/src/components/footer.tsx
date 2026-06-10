import { Link } from "wouter";
import { GraduationCap, Mail, Phone, Facebook, Youtube } from "lucide-react";

const footerLinks = {
  courses: [
    { label: "Khóa học HSA", href: "/courses?category=HSA" },
    { label: "Khóa học TSA", href: "/courses?category=TSA" },
    { label: "Ôn thi tổng hợp", href: "/courses" },
    { label: "Luyện đề chuyên sâu", href: "/exams" },
  ],
  exams: [
    { label: "Kho đề HSA", href: "/exams?type=HSA" },
    { label: "Kho đề TSA", href: "/exams?type=TSA" },
    { label: "Thi thử miễn phí", href: "/exams" },
    { label: "Đề năm 2024", href: "/exams?year=2024" },
  ],
  blog: [
    { label: "Kinh nghiệm thi HSA", href: "/blog" },
    { label: "Phân tích đề thi", href: "/blog" },
    { label: "Lộ trình học tập", href: "/blog" },
    { label: "Tư vấn thi đại học", href: "/blog" },
  ],
  policies: [
    { label: "Điều khoản sử dụng", href: "/" },
    { label: "Chính sách bảo mật", href: "/" },
    { label: "Chính sách hoàn tiền", href: "/" },
    { label: "Câu hỏi thường gặp", href: "/" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#102A43] text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/">
              <div className="flex items-center gap-2.5 mb-4 cursor-pointer">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E85A2A] to-[#F7941D] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-white text-lg tracking-tight">TRI ANH EDU</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-white/60 mb-6 max-w-xs">
              Nền tảng luyện thi HSA và TSA hàng đầu Việt Nam. Học lý thuyết, luyện đề, thi thử và theo dõi tiến độ trên một nền tảng duy nhất.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-sm text-white/60">
                <Mail className="w-4 h-4 text-[#F7941D] flex-shrink-0" />
                <span>support@triankhedu.vn</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/60">
                <Phone className="w-4 h-4 text-[#F7941D] flex-shrink-0" />
                <span>1800 1234 (Miễn phí)</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-5">
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#F7941D] flex items-center justify-center transition-colors" data-testid="link-facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#F7941D] flex items-center justify-center transition-colors" data-testid="link-youtube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Khóa học */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Khóa học</h4>
            <ul className="space-y-2.5">
              {footerLinks.courses.map(link => (
                <li key={link.label}>
                  <Link href={link.href}>
                    <span className="text-sm text-white/60 hover:text-[#F7941D] transition-colors cursor-pointer">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Đề thi */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Đề thi</h4>
            <ul className="space-y-2.5">
              {footerLinks.exams.map(link => (
                <li key={link.label}>
                  <Link href={link.href}>
                    <span className="text-sm text-white/60 hover:text-[#F7941D] transition-colors cursor-pointer">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Blog</h4>
            <ul className="space-y-2.5">
              {footerLinks.blog.map(link => (
                <li key={link.label}>
                  <Link href={link.href}>
                    <span className="text-sm text-white/60 hover:text-[#F7941D] transition-colors cursor-pointer">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Chính sách */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Chính sách</h4>
            <ul className="space-y-2.5">
              {footerLinks.policies.map(link => (
                <li key={link.label}>
                  <Link href={link.href}>
                    <span className="text-sm text-white/60 hover:text-[#F7941D] transition-colors cursor-pointer">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-white/40">© 2025 TRI ANH EDU. Tất cả quyền được bảo lưu.</p>
          <div className="flex items-center gap-1">
            <span className="text-xs text-white/30">Được xây dựng</span>
            <span className="text-xs text-white/30">cho học sinh Việt Nam</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

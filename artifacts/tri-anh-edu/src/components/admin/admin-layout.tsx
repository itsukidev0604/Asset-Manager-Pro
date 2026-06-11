import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, BookOpen, FolderOpen, FileText,
  ClipboardList, ListOrdered, BarChart2, Users, ShieldCheck,
  Star, BookMarked, Tag, Settings, Activity, Bell, Search,
  LogOut, ChevronDown, Menu, X, GraduationCap, Moon, Sun,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAdmin, AdminRole } from "./admin-context";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

interface NavGroup {
  label?: string;
  adminOnly?: boolean;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    items: [
      { icon: LayoutDashboard, label: "Tổng quan", href: "/admin" },
    ],
  },
  {
    label: "Học tập",
    items: [
      { icon: BookOpen, label: "Khóa học", href: "/admin/courses" },
      { icon: FolderOpen, label: "Danh mục khóa học", href: "/admin/categories" },
      { icon: FileText, label: "Bài học", href: "/admin/lessons" },
    ],
  },
  {
    label: "Đề thi",
    items: [
      { icon: ClipboardList, label: "Đề thi", href: "/admin/exams" },
      { icon: ListOrdered, label: "Bộ câu hỏi", href: "/admin/questions" },
      { icon: BarChart2, label: "Kết quả thi", href: "/admin/results" },
    ],
  },
  {
    label: "Người dùng",
    adminOnly: true,
    items: [
      { icon: Users, label: "Người dùng", href: "/admin/users" },
      { icon: ShieldCheck, label: "Phân quyền", href: "/admin/roles" },
    ],
  },
  {
    label: "Đánh giá",
    items: [
      { icon: Star, label: "Đánh giá khóa học", href: "/admin/reviews" },
    ],
  },
  {
    label: "Nội dung",
    items: [
      { icon: BookMarked, label: "Blog", href: "/admin/blog" },
      { icon: Tag, label: "Danh mục Blog", href: "/admin/blog-categories" },
    ],
  },
  {
    label: "Hệ thống",
    adminOnly: true,
    items: [
      { icon: Settings, label: "Cài đặt", href: "/admin/settings" },
      { icon: Activity, label: "Nhật ký hệ thống", href: "/admin/logs" },
    ],
  },
];

const pageTitles: Record<string, { title: string; breadcrumb: string[] }> = {
  "/admin": { title: "Tổng quan", breadcrumb: ["Dashboard"] },
  "/admin/courses": { title: "Khóa học", breadcrumb: ["Dashboard", "Học tập", "Khóa học"] },
  "/admin/categories": { title: "Danh mục khóa học", breadcrumb: ["Dashboard", "Học tập", "Danh mục"] },
  "/admin/lessons": { title: "Bài học", breadcrumb: ["Dashboard", "Học tập", "Bài học"] },
  "/admin/exams": { title: "Đề thi", breadcrumb: ["Dashboard", "Đề thi", "Danh sách"] },
  "/admin/questions": { title: "Bộ câu hỏi", breadcrumb: ["Dashboard", "Đề thi", "Câu hỏi"] },
  "/admin/results": { title: "Kết quả thi", breadcrumb: ["Dashboard", "Đề thi", "Kết quả"] },
  "/admin/users": { title: "Người dùng", breadcrumb: ["Dashboard", "Người dùng"] },
  "/admin/roles": { title: "Phân quyền", breadcrumb: ["Dashboard", "Phân quyền"] },
  "/admin/reviews": { title: "Đánh giá khóa học", breadcrumb: ["Dashboard", "Đánh giá"] },
  "/admin/blog": { title: "Blog", breadcrumb: ["Dashboard", "Nội dung", "Blog"] },
  "/admin/blog-categories": { title: "Danh mục Blog", breadcrumb: ["Dashboard", "Nội dung", "Danh mục"] },
  "/admin/settings": { title: "Cài đặt hệ thống", breadcrumb: ["Dashboard", "Hệ thống", "Cài đặt"] },
  "/admin/logs": { title: "Nhật ký hệ thống", breadcrumb: ["Dashboard", "Hệ thống", "Nhật ký"] },
};

export function AdminLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { user, isAdmin, setRole } = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const pageInfo = pageTitles[location] ?? { title: "Admin", breadcrumb: ["Dashboard"] };

  const filteredGroups = navGroups.filter((g) => !g.adminOnly || isAdmin);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center flex-shrink-0">
          <GraduationCap className="w-4.5 h-4.5 text-white" />
        </div>
        <div>
          <div className="text-white font-bold text-sm leading-tight">TRI ANH EDU</div>
          <div className="text-white/40 text-[10px] uppercase tracking-widest">Admin Panel</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {filteredGroups.map((group, gi) => (
          <div key={gi} className={gi > 0 ? "pt-3" : ""}>
            {group.label && (
              <div className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                {group.label}
              </div>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href || (item.href !== "/admin" && location.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href}>
                  <a
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all cursor-pointer group",
                      isActive
                        ? "bg-white/10 text-white font-medium"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-4 h-4 flex-shrink-0 transition-colors",
                        isActive ? "text-primary-orange" : "text-white/40 group-hover:text-white/70"
                      )}
                    />
                    <span className="truncate">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-orange" />
                    )}
                  </a>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-white/10">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors">
          <div className="w-8 h-8 rounded-full bg-primary-orange flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {user.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs font-semibold truncate">{user.name}</div>
            <div className="text-white/40 text-[10px] truncate">{user.email}</div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-white/40 hover:text-white transition-colors">
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top" className="w-48">
              <DropdownMenuLabel className="text-xs text-muted-foreground">Vai trò demo</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setRole("admin" as AdminRole)}>
                <ShieldCheck className="w-3.5 h-3.5 mr-2" /> Đăng nhập Admin
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRole("teacher" as AdminRole)}>
                <GraduationCap className="w-3.5 h-3.5 mr-2" /> Đăng nhập Giáo viên
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/">
                  <a className="flex items-center text-destructive">
                    <LogOut className="w-3.5 h-3.5 mr-2" /> Về trang chủ
                  </a>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-60 bg-trust-navy z-30">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative flex flex-col w-60 bg-trust-navy z-50">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-20 h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-4">
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              {pageInfo.breadcrumb.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="w-3 h-3" />}
                  <span className={i === pageInfo.breadcrumb.length - 1 ? "text-gray-700 font-medium" : ""}>
                    {crumb}
                  </span>
                </span>
              ))}
            </div>
            <h1 className="text-base font-semibold text-gray-900 leading-tight">{pageInfo.title}</h1>
          </div>

          <div className="hidden sm:flex items-center gap-1 bg-gray-100 rounded-lg px-3 py-1.5 w-48">
            <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="bg-transparent text-xs text-gray-600 placeholder-gray-400 outline-none w-full"
            />
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <div className="relative">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-orange" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 hover:bg-gray-100 rounded-lg px-2 py-1 transition-colors">
                <div className="w-7 h-7 rounded-full bg-primary-orange flex items-center justify-center text-white text-[10px] font-bold">
                  {user.initials}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-semibold text-gray-800 leading-tight">{user.name.split(" ").slice(-1)[0]}</div>
                  <div className="text-[10px] text-gray-400 leading-tight capitalize">{user.role === "admin" ? "Quản trị viên" : "Giáo viên"}</div>
                </div>
                <ChevronDown className="w-3 h-3 text-gray-400 hidden sm:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>
                <div className="text-xs font-semibold">{user.name}</div>
                <div className="text-[10px] text-muted-foreground font-normal">{user.email}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="w-3.5 h-3.5 mr-2" /> Cài đặt tài khoản
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/">
                  <a className="flex items-center text-destructive">
                    <LogOut className="w-3.5 h-3.5 mr-2" /> Thoát
                  </a>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5">
          {children}
        </main>
      </div>
    </div>
  );
}

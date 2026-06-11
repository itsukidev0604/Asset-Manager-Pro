import { useState } from "react";
import { Link } from "wouter";
import {
  Plus, Search, Filter, Eye, Pencil, UserPlus, Archive,
  MoreHorizontal, Users, Calendar, ChevronDown, GraduationCap,
  Wifi, MapPin, CheckCircle2, Clock, XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ClassStatus = "active" | "upcoming" | "completed" | "archived";

interface Classroom {
  id: number;
  name: string;
  courseName: string;
  courseType: "HSA" | "TSA";
  teacherName: string;
  teacherAvatar: string;
  students: number;
  capacity: number;
  schedule: string;
  startDate: string;
  status: ClassStatus;
  isOnline: boolean;
}

const classrooms: Classroom[] = [
  { id: 1, name: "HSA 2027 Buổi Sáng", courseName: "Luyện thi HSA 2027 Toàn diện", courseType: "HSA", teacherName: "Nguyễn Minh Tuấn", teacherAvatar: "NT", students: 24, capacity: 30, schedule: "T2,4,6 | 8:00-10:00", startDate: "01/03/2026", status: "active", isOnline: false },
  { id: 2, name: "HSA 2027 Buổi Tối", courseName: "Luyện thi HSA 2027 Toàn diện", courseType: "HSA", teacherName: "Trần Thị Lan", teacherAvatar: "TL", students: 28, capacity: 30, schedule: "T3,5 | 19:00-21:00", startDate: "01/03/2026", status: "active", isOnline: true },
  { id: 3, name: "HSA 2027 Cuối Tuần", courseName: "Luyện thi HSA 2027 Toàn diện", courseType: "HSA", teacherName: "Lê Văn Đức", teacherAvatar: "LĐ", students: 22, capacity: 25, schedule: "T7,CN | 8:00-11:00", startDate: "05/03/2026", status: "active", isOnline: false },
  { id: 4, name: "TSA 2027 Nhóm A", courseName: "Luyện thi TSA 2027 Bách Khoa", courseType: "TSA", teacherName: "Phạm Thị Hà", teacherAvatar: "PH", students: 18, capacity: 25, schedule: "T2,4 | 19:00-21:00", startDate: "10/03/2026", status: "active", isOnline: true },
  { id: 5, name: "TSA 2027 Nhóm B", courseName: "Luyện thi TSA 2027 Bách Khoa", courseType: "TSA", teacherName: "Hoàng Văn Nam", teacherAvatar: "HN", students: 0, capacity: 25, schedule: "T3,5,7 | 17:00-19:00", startDate: "20/06/2026", status: "upcoming", isOnline: false },
  { id: 6, name: "HSA 2026 Cấp Tốc", courseName: "Luyện thi HSA 2026 Cấp tốc", courseType: "HSA", teacherName: "Nguyễn Minh Tuấn", teacherAvatar: "NT", students: 30, capacity: 30, schedule: "T2-6 | 7:00-9:00", startDate: "01/01/2026", status: "completed", isOnline: false },
  { id: 7, name: "HSA 2026 Tối", courseName: "Luyện thi HSA 2026 Cấp tốc", courseType: "HSA", teacherName: "Trần Thị Lan", teacherAvatar: "TL", students: 27, capacity: 30, schedule: "T3,5 | 19:00-21:00", startDate: "05/01/2026", status: "completed", isOnline: true },
  { id: 8, name: "TSA 2026 Nhóm Cũ", courseName: "Luyện thi TSA 2026", courseType: "TSA", teacherName: "Phạm Thị Hà", teacherAvatar: "PH", students: 20, capacity: 25, schedule: "T7 | 8:00-11:00", startDate: "01/01/2026", status: "archived", isOnline: false },
];

const statusConfig: Record<ClassStatus, { label: string; color: string; icon: React.ElementType }> = {
  active: { label: "Đang học", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
  upcoming: { label: "Sắp khai giảng", color: "bg-blue-100 text-blue-700", icon: Clock },
  completed: { label: "Đã kết thúc", color: "bg-gray-100 text-gray-600", icon: CheckCircle2 },
  archived: { label: "Đã lưu trữ", color: "bg-red-50 text-red-500", icon: XCircle },
};

export default function AdminClassrooms() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | ClassStatus>("all");
  const [filterType, setFilterType] = useState<"all" | "HSA" | "TSA">("all");

  const stats = {
    total: classrooms.length,
    active: classrooms.filter(c => c.status === "active").length,
    upcoming: classrooms.filter(c => c.status === "upcoming").length,
    totalStudents: classrooms.reduce((acc, c) => acc + c.students, 0),
  };

  const filtered = classrooms.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.courseName.toLowerCase().includes(search.toLowerCase()) ||
      c.teacherName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || c.status === filterStatus;
    const matchType = filterType === "all" || c.courseType === filterType;
    return matchSearch && matchStatus && matchType;
  });

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Tổng lớp học", value: stats.total, color: "text-trust-navy", bg: "bg-white" },
          { label: "Đang hoạt động", value: stats.active, color: "text-emerald-600", bg: "bg-white" },
          { label: "Sắp khai giảng", value: stats.upcoming, color: "text-blue-600", bg: "bg-white" },
          { label: "Tổng học viên", value: stats.totalStudents, color: "text-brand-orange", bg: "bg-white" },
        ].map((s) => (
          <div key={s.label} className={cn("rounded-xl p-4 shadow-sm border border-gray-100", s.bg)}>
            <div className={cn("text-2xl font-bold", s.color)}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Tìm lớp học, giáo viên, khóa học..."
            className="pl-9 rounded-xl border-gray-200 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {/* Status filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-xl border-gray-200 gap-2 text-sm h-9">
                <Filter className="w-3.5 h-3.5" />
                {filterStatus === "all" ? "Trạng thái" : statusConfig[filterStatus].label}
                <ChevronDown className="w-3.5 h-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {(["all", "active", "upcoming", "completed", "archived"] as const).map((s) => (
                <DropdownMenuItem key={s} onClick={() => setFilterStatus(s)}>
                  {s === "all" ? "Tất cả" : statusConfig[s].label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Type filter */}
          <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1">
            {(["all", "HSA", "TSA"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-medium transition-all",
                  filterType === t ? "bg-trust-navy text-white" : "text-gray-500 hover:text-gray-700"
                )}
              >
                {t === "all" ? "Tất cả" : t}
              </button>
            ))}
          </div>

          <Link href="/admin/classrooms/create">
            <Button className="rounded-xl bg-brand-orange hover:bg-brand-orange/90 text-white h-9 gap-2">
              <Plus className="w-4 h-4" /> Tạo lớp học
            </Button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Lớp học</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Khóa học</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Giáo viên</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Học viên</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden xl:table-cell">Lịch học</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Ngày bắt đầu</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((cls) => {
                const st = statusConfig[cls.status];
                const StIcon = st.icon;
                const fillPct = Math.round((cls.students / cls.capacity) * 100);
                return (
                  <tr key={cls.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0",
                          cls.courseType === "HSA" ? "bg-brand-orange" : "bg-trust-navy"
                        )}>
                          {cls.courseType}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{cls.name}</div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {cls.isOnline
                              ? <span className="text-[10px] text-blue-500 flex items-center gap-0.5"><Wifi className="w-2.5 h-2.5" /> Online</span>
                              : <span className="text-[10px] text-gray-400 flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5" /> Offline</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="text-sm text-gray-600 line-clamp-1">{cls.courseName}</span>
                    </td>
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary-orange flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">
                          {cls.teacherAvatar}
                        </div>
                        <span className="text-sm text-gray-700">{cls.teacherName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-sm font-medium text-gray-800">{cls.students}/{cls.capacity}</span>
                        <div className="w-14 h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={cn("h-full rounded-full", fillPct >= 90 ? "bg-red-400" : fillPct >= 70 ? "bg-amber-400" : "bg-emerald-400")}
                            style={{ width: `${fillPct}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 hidden xl:table-cell">
                      <span className="text-xs text-gray-500">{cls.schedule}</span>
                    </td>
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <span className="text-xs text-gray-500">{cls.startDate}</span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium", st.color)}>
                        <StIcon className="w-3 h-3" /> {st.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-lg hover:bg-gray-100">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/classrooms/${cls.id}`} className="flex items-center gap-2 cursor-pointer">
                              <Eye className="w-3.5 h-3.5" /> Xem chi tiết
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Pencil className="w-3.5 h-3.5" /> Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <UserPlus className="w-3.5 h-3.5" /> Xếp học viên
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-red-500 focus:text-red-500">
                            <Archive className="w-3.5 h-3.5" /> Lưu trữ
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-gray-400">
            <GraduationCap className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">Không tìm thấy lớp học nào</p>
          </div>
        )}
        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Hiển thị {filtered.length} / {classrooms.length} lớp học</span>
        </div>
      </div>
    </div>
  );
}

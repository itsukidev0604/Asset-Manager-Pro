import { useState } from "react";
import { useParams, Link } from "wouter";
import {
  ChevronLeft, Users, TrendingUp, CheckCircle2, Calendar,
  UserMinus, ArrowRightLeft, MoreHorizontal, Plus, Paperclip,
  Bell, FileText, Presentation, ClipboardList, BookOpen, Download,
  Play, Lock, Clock, X, Check, GraduationCap, BarChart2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

const TABS = ["Học viên", "Bài học", "Tài liệu", "Thông báo", "Thống kê"] as const;
type Tab = typeof TABS[number];

const students = [
  { id: 1, name: "Nguyễn Thị Mai", avatar: "NM", email: "mai.nguyen@email.com", enrollDate: "01/03/2026", progress: 68, attendance: 92 },
  { id: 2, name: "Trần Văn Hùng", avatar: "TH", email: "hung.tran@email.com", enrollDate: "01/03/2026", progress: 55, attendance: 85 },
  { id: 3, name: "Lê Thị Thu", avatar: "LT", email: "thu.le@email.com", enrollDate: "03/03/2026", progress: 80, attendance: 96 },
  { id: 4, name: "Phạm Minh Đức", avatar: "PĐ", email: "duc.pham@email.com", enrollDate: "03/03/2026", progress: 42, attendance: 75 },
  { id: 5, name: "Hoàng Thị Lan", avatar: "HL", email: "lan.hoang@email.com", enrollDate: "05/03/2026", progress: 73, attendance: 88 },
  { id: 6, name: "Vũ Quang Minh", avatar: "VM", email: "minh.vu@email.com", enrollDate: "05/03/2026", progress: 61, attendance: 82 },
  { id: 7, name: "Đỗ Thị Hằng", avatar: "ĐH", email: "hang.do@email.com", enrollDate: "06/03/2026", progress: 88, attendance: 98 },
  { id: 8, name: "Bùi Văn Thắng", avatar: "BT", email: "thang.bui@email.com", enrollDate: "07/03/2026", progress: 49, attendance: 78 },
];

const lessons = [
  { id: 1, title: "Giới thiệu khóa học & định hướng", date: "02/03/2026", status: "completed", attended: 24 },
  { id: 2, title: "Toán: Hàm số và đồ thị", date: "04/03/2026", status: "completed", attended: 22 },
  { id: 3, title: "Toán: Lượng giác cơ bản", date: "09/03/2026", status: "completed", attended: 23 },
  { id: 4, title: "Toán: Phương trình lượng giác", date: "16/06/2026", status: "upcoming", attended: 0 },
  { id: 5, title: "Toán: Tích phân và ứng dụng", date: "18/06/2026", status: "upcoming", attended: 0 },
];

const materials = [
  { id: 1, title: "Tài liệu lý thuyết Toán HSA 2027", type: "pdf", size: "4.2 MB", date: "01/03/2026" },
  { id: 2, title: "Slide bài giảng Tuần 1-4", type: "slide", size: "12.8 MB", date: "08/03/2026" },
  { id: 3, title: "Đề luyện tập Toán - Số 1", type: "exam", size: "1.1 MB", date: "10/03/2026" },
  { id: 4, title: "Bài tập về nhà - Lượng giác", type: "assignment", size: "0.8 MB", date: "12/03/2026" },
];

const announcements = [
  { id: 1, teacher: "Thầy Nguyễn Minh Tuấn", avatar: "NT", time: "2 giờ trước", content: "Buổi học ngày 16/06 sẽ tập trung vào Phương trình lượng giác. Các em xem lại phần lý thuyết cơ bản trong tài liệu trang 45-52.", attachments: [] },
  { id: 2, teacher: "Thầy Nguyễn Minh Tuấn", avatar: "NT", time: "3 ngày trước", content: "Kết quả bài kiểm tra Tuần 3 đã được chấm. Điểm trung bình lớp là 7.8/10. Các bạn điểm dưới 6 cần gặp thầy để được hỗ trợ thêm.", attachments: ["KetQuaKT3.xlsx"] },
];

const enrollmentData = [
  { month: "T1", students: 8 }, { month: "T2", students: 15 }, { month: "T3", students: 24 },
];

const attendanceData = [
  { week: "T1", rate: 95 }, { week: "T2", rate: 92 }, { week: "T3", rate: 88 },
  { week: "T4", rate: 85 }, { week: "T5", rate: 90 }, { week: "T6", rate: 87 },
];

const progressDist = [
  { name: "0-25%", value: 2, color: "#EF4444" },
  { name: "26-50%", value: 3, color: "#F59E0B" },
  { name: "51-75%", value: 2, color: "#3B82F6" },
  { name: "76-100%", value: 1, color: "#10B981" },
];

const materialIcons: Record<string, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  pdf: { icon: FileText, color: "text-red-500", bg: "bg-red-50", label: "PDF" },
  slide: { icon: Presentation, color: "text-blue-500", bg: "bg-blue-50", label: "Slide" },
  exam: { icon: ClipboardList, color: "text-purple-500", bg: "bg-purple-50", label: "Đề thi" },
  assignment: { icon: BookOpen, color: "text-green-500", bg: "bg-green-50", label: "Bài tập" },
};

export default function AdminClassroomDetail() {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState<Tab>("Học viên");
  const [search, setSearch] = useState("");
  const [transferModal, setTransferModal] = useState<typeof students[0] | null>(null);
  const [addAnnouncementOpen, setAddAnnouncementOpen] = useState(false);
  const [announcementText, setAnnouncementText] = useState("");

  const avgProgress = Math.round(students.reduce((a, s) => a + s.progress, 0) / students.length);
  const avgAttendance = Math.round(students.reduce((a, s) => a + s.attendance, 0) / students.length);

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Back */}
      <Link href="/admin/classrooms" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-orange transition-colors">
        <ChevronLeft className="w-4 h-4" /> Quay lại danh sách
      </Link>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="relative h-28 bg-gradient-to-r from-trust-navy to-[#1a3a5c]">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800')] bg-cover" />
          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
            <div>
              <span className="bg-brand-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-full">HSA</span>
              <h1 className="text-xl font-bold text-white mt-1">HSA 2027 Buổi Sáng</h1>
              <p className="text-white/60 text-sm">Luyện thi HSA 2027 Toàn diện</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="h-8 rounded-xl border-white/30 text-white hover:bg-white/10 bg-transparent text-xs gap-1.5">
                <Bell className="w-3.5 h-3.5" /> Thông báo
              </Button>
              <Button size="sm" className="h-8 rounded-xl bg-brand-orange hover:bg-brand-orange/90 text-white text-xs gap-1.5">
                <Plus className="w-3.5 h-3.5" /> Thêm học viên
              </Button>
            </div>
          </div>
        </div>
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100 border-t border-gray-100">
          {[
            { label: "Học viên", value: `${students.length}/30`, icon: Users, color: "text-trust-navy" },
            { label: "Tỷ lệ chuyên cần", value: `${avgAttendance}%`, icon: TrendingUp, color: "text-emerald-600" },
            { label: "Tiến độ TB", value: `${avgProgress}%`, icon: CheckCircle2, color: "text-brand-orange" },
            { label: "Buổi học tiếp theo", value: "16/06", icon: Calendar, color: "text-blue-600" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3 px-5 py-3.5">
              <div className={cn("w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center")}>
                <s.icon className={cn("w-4 h-4", s.color)} />
              </div>
              <div>
                <div className={cn("text-lg font-bold", s.color)}>{s.value}</div>
                <div className="text-xs text-gray-400">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 py-2 text-sm font-medium rounded-lg transition-all",
              tab === t ? "bg-white text-trust-navy shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* --- STUDENTS TAB --- */}
      {tab === "Học viên" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex gap-3">
            <div className="relative flex-1">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Tìm học viên..." className="pl-9 rounded-xl border-gray-200" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Button className="rounded-xl bg-brand-orange hover:bg-brand-orange/90 text-white gap-2 text-sm">
              <Plus className="w-4 h-4" /> Thêm học viên
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Học viên</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Ngày tham gia</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tiến độ</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Chuyên cần</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredStudents.map(s => (
                  <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {s.avatar}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{s.name}</div>
                          <div className="text-xs text-gray-400">{s.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <span className="text-xs text-gray-500 flex items-center gap-1"><Calendar className="w-3 h-3" />{s.enrollDate}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex flex-col items-center gap-1 min-w-[80px]">
                        <div className="flex justify-between w-full text-xs">
                          <span className="text-gray-500">Tiến độ</span>
                          <span className={cn("font-semibold", s.progress >= 70 ? "text-emerald-600" : s.progress >= 50 ? "text-amber-500" : "text-red-500")}>{s.progress}%</span>
                        </div>
                        <Progress value={s.progress} className="h-1.5 w-full" />
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-center hidden md:table-cell">
                      <span className={cn(
                        "text-xs font-semibold px-2 py-0.5 rounded-full",
                        s.attendance >= 90 ? "bg-emerald-100 text-emerald-700" :
                          s.attendance >= 80 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-600"
                      )}>
                        {s.attendance}%
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-lg hover:bg-gray-100">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem className="gap-2" onClick={() => setTransferModal(s)}>
                            <ArrowRightLeft className="w-3.5 h-3.5" /> Chuyển lớp
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-red-500 focus:text-red-500">
                            <UserMinus className="w-3.5 h-3.5" /> Xóa khỏi lớp
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- LESSONS TAB --- */}
      {tab === "Bài học" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-trust-navy">Danh sách buổi học</h3>
              <p className="text-xs text-gray-500 mt-0.5">{lessons.filter(l => l.status === "completed").length}/{lessons.length} buổi đã diễn ra</p>
            </div>
            <Button size="sm" className="rounded-xl bg-brand-orange hover:bg-brand-orange/90 text-white gap-1.5 h-8 text-xs">
              <Plus className="w-3.5 h-3.5" /> Thêm buổi học
            </Button>
          </div>
          <div className="divide-y divide-gray-50">
            {lessons.map((l, i) => (
              <div key={l.id} className={cn("flex items-center gap-4 px-5 py-4", l.status === "upcoming" && "opacity-70")}>
                <div className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
                  l.status === "completed" ? "bg-emerald-100" : "bg-blue-50"
                )}>
                  {l.status === "completed"
                    ? <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    : <Clock className="w-5 h-5 text-blue-500" />}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">Buổi {i + 1}: {l.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
                    <Calendar className="w-3 h-3" />{l.date}
                    {l.status === "completed" && (
                      <><span>·</span><Users className="w-3 h-3" />{l.attended}/{students.length} tham dự</>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {l.status === "completed" && (
                    <Button variant="outline" size="sm" className="h-7 text-xs rounded-lg border-gray-200 gap-1.5">
                      <Play className="w-3 h-3" /> Xem lại
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="h-7 text-xs rounded-lg border-gray-200 gap-1.5">
                    <MoreHorizontal className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- MATERIALS TAB --- */}
      {tab === "Tài liệu" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-trust-navy">Tài liệu học tập</h3>
            <Button size="sm" className="rounded-xl bg-brand-orange hover:bg-brand-orange/90 text-white gap-1.5 h-8 text-xs">
              <Plus className="w-3.5 h-3.5" /> Tải lên tài liệu
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 p-5">
            {materials.map(m => {
              const cfg = materialIcons[m.type];
              const Icon = cfg.icon;
              return (
                <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-brand-orange/30 hover:bg-orange-50/30 transition-all group cursor-pointer">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", cfg.bg)}>
                    <Icon className={cn("w-5 h-5", cfg.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-800 truncate">{m.title}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded", cfg.bg, cfg.color)}>{cfg.label}</span>
                      <span className="text-[10px] text-gray-400">{m.size} · {m.date}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="w-8 h-8 p-0 rounded-lg">
                    <Download className="w-3.5 h-3.5 text-gray-400 group-hover:text-brand-orange" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* --- ANNOUNCEMENTS TAB --- */}
      {tab === "Thông báo" && (
        <div className="space-y-4">
          {/* New announcement form */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold text-sm flex-shrink-0">NT</div>
              {addAnnouncementOpen ? (
                <div className="flex-1">
                  <textarea
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:border-brand-orange"
                    rows={3}
                    placeholder="Nhập nội dung thông báo cho lớp..."
                    value={announcementText}
                    onChange={(e) => setAnnouncementText(e.target.value)}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600">
                      <Paperclip className="w-3.5 h-3.5" /> Đính kèm file
                    </button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="rounded-xl h-7 text-xs" onClick={() => setAddAnnouncementOpen(false)}>Hủy</Button>
                      <Button size="sm" className="rounded-xl h-7 text-xs bg-brand-orange hover:bg-brand-orange/90 text-white gap-1.5">
                        <Bell className="w-3 h-3" /> Đăng thông báo
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setAddAnnouncementOpen(true)}
                  className="flex-1 text-left px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-400 hover:border-brand-orange hover:bg-orange-50 transition-all"
                >
                  Tạo thông báo mới cho lớp...
                </button>
              )}
            </div>
          </div>
          {announcements.map((a) => (
            <div key={a.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-orange flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{a.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-trust-navy">{a.teacher}</span>
                    <span className="text-xs text-gray-400">{a.time}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{a.content}</p>
                  {a.attachments.map(f => (
                    <div key={f} className="mt-2 inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1 text-xs text-gray-600 cursor-pointer hover:border-brand-orange">
                      <Paperclip className="w-3 h-3" />{f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- ANALYTICS TAB --- */}
      {tab === "Thống kê" && (
        <div className="space-y-5">
          {/* KPI row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Tổng học viên", value: students.length, color: "text-trust-navy" },
              { label: "Học viên tích cực", value: students.filter(s => s.progress >= 50).length, color: "text-emerald-600" },
              { label: "Tiến độ trung bình", value: `${avgProgress}%`, color: "text-brand-orange" },
              { label: "Chuyên cần TB", value: `${avgAttendance}%`, color: "text-blue-600" },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className={cn("text-2xl font-bold", s.color)}>{s.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Attendance chart */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Tỷ lệ chuyên cần theo tuần (%)</h3>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={attendanceData}>
                  <defs>
                    <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                  <YAxis domain={[70, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v) => [`${v}%`, "Chuyên cần"]} />
                  <Area type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={2} fill="url(#attGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Progress distribution */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Phân bố tiến độ học viên</h3>
              <div className="flex items-center gap-4">
                <ResponsiveContainer width="50%" height={160}>
                  <PieChart>
                    <Pie data={progressDist} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                      {progressDist.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-2">
                  {progressDist.map(d => (
                    <div key={d.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                      <span className="text-xs text-gray-600 flex-1">{d.name}</span>
                      <span className="text-xs font-semibold text-gray-800">{d.value} HV</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Student progress bar chart */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Tiến độ từng học viên</h3>
            <div className="space-y-3">
              {[...students].sort((a, b) => b.progress - a.progress).map(s => (
                <div key={s.id} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                    {s.avatar}
                  </div>
                  <div className="w-28 text-xs text-gray-600 font-medium truncate">{s.name.split(" ").slice(-1)[0]}</div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full transition-all", s.progress >= 70 ? "bg-emerald-400" : s.progress >= 50 ? "bg-amber-400" : "bg-red-400")}
                        style={{ width: `${s.progress}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-gray-600 w-8 text-right">{s.progress}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Transfer Modal */}
      {transferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setTransferModal(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-semibold text-trust-navy">Chuyển lớp học viên</h2>
              <button onClick={() => setTransferModal(null)} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  {transferModal.avatar}
                </div>
                <div>
                  <div className="font-medium text-sm text-gray-800">{transferModal.name}</div>
                  <div className="text-xs text-gray-500">{transferModal.email}</div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-500 font-medium mb-3">Chọn lớp đích:</p>
              <div className="space-y-2">
                {[
                  { id: 2, name: "HSA 2027 Buổi Tối", teacher: "Trần Thị Lan", students: 28, capacity: 30 },
                  { id: 3, name: "HSA 2027 Cuối Tuần", teacher: "Lê Văn Đức", students: 22, capacity: 25 },
                ].map(cls => (
                  <div key={cls.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-brand-orange hover:bg-orange-50 cursor-pointer transition-all">
                    <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center text-white text-[10px] font-bold">HSA</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-800">{cls.name}</div>
                      <div className="text-xs text-gray-400">{cls.teacher}</div>
                    </div>
                    <span className="text-xs text-gray-500">{cls.students}/{cls.capacity}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3 p-4 border-t border-gray-100">
              <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setTransferModal(null)}>Hủy</Button>
              <Button className="flex-1 rounded-xl bg-brand-orange hover:bg-brand-orange/90 text-white gap-2">
                <ArrowRightLeft className="w-4 h-4" /> Xác nhận chuyển
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

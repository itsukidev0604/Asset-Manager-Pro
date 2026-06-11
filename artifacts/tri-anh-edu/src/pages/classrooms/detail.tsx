import { useState } from "react";
import { useParams, Link } from "wouter";
import {
  Users, Calendar, MapPin, Play, Download, FileText, Presentation,
  ClipboardList, BookOpen, Bell, ChevronRight, Lock, CheckCircle2,
  Circle, Wifi, Clock, ChevronLeft, Paperclip,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const TABS = ["Tổng quan", "Bài học", "Tài liệu", "Thông báo", "Thành viên"] as const;
type Tab = typeof TABS[number];

const lessons = [
  { id: 1, title: "Giới thiệu khóa học & định hướng ôn thi", duration: "90 phút", date: "02/03/2026", status: "completed" },
  { id: 2, title: "Toán: Hàm số và đồ thị", duration: "90 phút", date: "04/03/2026", status: "completed" },
  { id: 3, title: "Toán: Lượng giác cơ bản", duration: "90 phút", date: "09/03/2026", status: "completed" },
  { id: 4, title: "Toán: Phương trình lượng giác", duration: "90 phút", date: "16/06/2026", status: "current" },
  { id: 5, title: "Toán: Tích phân và ứng dụng", duration: "90 phút", date: "18/06/2026", status: "locked" },
  { id: 6, title: "Đọc hiểu Văn: Phân tích đề", duration: "90 phút", date: "23/06/2026", status: "locked" },
  { id: 7, title: "Đọc hiểu Văn: Luyện đề tổng hợp", duration: "90 phút", date: "25/06/2026", status: "locked" },
];

const materials = [
  { id: 1, title: "Tài liệu lý thuyết Toán HSA 2027", type: "pdf", size: "4.2 MB", date: "01/03/2026" },
  { id: 2, title: "Slide bài giảng Tuần 1-4", type: "slide", size: "12.8 MB", date: "08/03/2026" },
  { id: 3, title: "Đề luyện tập Toán - Số 1", type: "exam", size: "1.1 MB", date: "10/03/2026" },
  { id: 4, title: "Bài tập về nhà - Lượng giác", type: "assignment", size: "0.8 MB", date: "12/03/2026" },
  { id: 5, title: "Tổng hợp công thức Toán HSA", type: "pdf", size: "2.4 MB", date: "15/03/2026" },
  { id: 6, title: "Slide bài giảng Tuần 5-8", type: "slide", size: "15.2 MB", date: "22/03/2026" },
];

const announcements = [
  {
    id: 1,
    teacher: "Thầy Nguyễn Minh Tuấn",
    avatar: "NT",
    time: "2 giờ trước",
    content: "Buổi học ngày 16/06 sẽ tập trung vào Phương trình lượng giác. Các em xem lại phần lý thuyết cơ bản trong tài liệu trang 45-52. Nhớ làm trước bài tập 1-5 nhé!",
    attachments: ["BTLT_LuongGiac.pdf"],
  },
  {
    id: 2,
    teacher: "Thầy Nguyễn Minh Tuấn",
    avatar: "NT",
    time: "3 ngày trước",
    content: "Kết quả bài kiểm tra Tuần 3 đã được chấm và trả về. Điểm trung bình lớp là 7.8/10. Các em có thể xem chi tiết điểm trong mục Kết quả thi. Những bạn điểm dưới 6 cần gặp thầy để được hỗ trợ thêm.",
    attachments: [],
  },
  {
    id: 3,
    teacher: "Phòng đào tạo",
    avatar: "PĐT",
    time: "1 tuần trước",
    content: "Thông báo: Lớp học tuần sau (20-22/06) sẽ nghỉ do trường tổ chức thi thử đợt 2. Lịch học sẽ bù vào tuần 24-26/06. Chi tiết sẽ thông báo sau.",
    attachments: ["LichHocBu_T6.pdf"],
  },
];

const members = {
  teacher: { name: "Thầy Nguyễn Minh Tuấn", avatar: "NT", subject: "Toán - Lý", experience: "8 năm" },
  students: [
    { id: 1, name: "Nguyễn Thị Mai", avatar: "NM", progress: 68 },
    { id: 2, name: "Trần Văn Hùng", avatar: "TH", progress: 55 },
    { id: 3, name: "Lê Thị Thu", avatar: "LT", progress: 80 },
    { id: 4, name: "Phạm Minh Đức", avatar: "PĐ", progress: 42 },
    { id: 5, name: "Hoàng Thị Lan", avatar: "HL", progress: 73 },
    { id: 6, name: "Vũ Quang Minh", avatar: "VM", progress: 61 },
    { id: 7, name: "Đỗ Thị Hằng", avatar: "ĐH", progress: 88 },
    { id: 8, name: "Bùi Văn Thắng", avatar: "BT", progress: 49 },
  ],
};

const materialIcons: Record<string, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  pdf: { icon: FileText, color: "text-red-500", bg: "bg-red-50", label: "PDF" },
  slide: { icon: Presentation, color: "text-blue-500", bg: "bg-blue-50", label: "Slide" },
  exam: { icon: ClipboardList, color: "text-purple-500", bg: "bg-purple-50", label: "Đề thi" },
  assignment: { icon: BookOpen, color: "text-green-500", bg: "bg-green-50", label: "Bài tập" },
};

export default function ClassroomDetail() {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState<Tab>("Tổng quan");

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Back link */}
      <Link href="/classrooms" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-orange mb-5 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Quay lại danh sách lớp
      </Link>

      {/* Header card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="relative h-32 bg-gradient-to-r from-trust-navy to-[#1a3a5c]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=60')] bg-cover bg-center opacity-20" />
          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
            <div>
              <span className="inline-flex items-center bg-brand-orange text-white text-[11px] font-bold px-2 py-0.5 rounded-full mb-1.5">HSA</span>
              <h1 className="text-xl font-bold text-white leading-tight">HSA 2027 Buổi Sáng</h1>
              <p className="text-white/70 text-sm">Luyện thi HSA 2027 Toàn diện</p>
            </div>
            <span className="inline-flex items-center gap-1.5 bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Đang học
            </span>
          </div>
        </div>
        <div className="px-5 py-3 flex flex-wrap gap-x-6 gap-y-2 border-t border-gray-100">
          <InfoChip icon={Users} text="24 / 30 học viên" />
          <InfoChip icon={Calendar} text="Thứ 2, 4, 6 | 8:00 - 10:00" />
          <InfoChip icon={MapPin} text="Phòng A201" />
          <InfoChip icon={Wifi} text="Học trực tiếp" />
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-gray-500">Tiến độ</span>
            <div className="w-24">
              <Progress value={62} className="h-1.5" />
            </div>
            <span className="text-xs font-semibold text-brand-orange">62%</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
        {TABS.map((t) => (
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

      {/* Tab content */}
      {tab === "Tổng quan" && <OverviewTab />}
      {tab === "Bài học" && <LessonsTab />}
      {tab === "Tài liệu" && <MaterialsTab />}
      {tab === "Thông báo" && <AnnouncementsTab />}
      {tab === "Thành viên" && <MembersTab />}
    </div>
  );
}

function InfoChip({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-gray-500">
      <Icon className="w-3.5 h-3.5 text-gray-400" />
      <span>{text}</span>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2 space-y-5">
        {/* Teacher card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Giáo viên phụ trách</h3>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-orange flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {members.teacher.avatar}
            </div>
            <div>
              <div className="font-semibold text-trust-navy">{members.teacher.name}</div>
              <div className="text-sm text-gray-500">{members.teacher.subject}</div>
              <div className="text-xs text-gray-400 mt-0.5">{members.teacher.experience} kinh nghiệm</div>
            </div>
          </div>
        </div>

        {/* Upcoming lesson */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Buổi học tiếp theo</h3>
          <div className="flex items-center gap-4 p-3 bg-orange-50 rounded-xl border border-orange-100">
            <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-trust-navy text-sm">Toán: Phương trình lượng giác</div>
              <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                <Calendar className="w-3 h-3" /> Thứ 2, 16/06/2026
                <Clock className="w-3 h-3 ml-1" /> 8:00 - 10:00
              </div>
            </div>
            <span className="text-xs font-semibold text-brand-orange bg-orange-50 border border-orange-200 px-2 py-1 rounded-lg whitespace-nowrap">3 ngày nữa</span>
          </div>
        </div>

        {/* Recent announcements preview */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Thông báo gần đây</h3>
            <button className="text-xs text-brand-orange hover:underline">Xem tất cả</button>
          </div>
          {announcements.slice(0, 2).map((a) => (
            <div key={a.id} className="flex gap-3 py-3 border-b border-gray-50 last:border-0">
              <div className="w-8 h-8 rounded-full bg-primary-orange flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">{a.avatar}</div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-medium text-trust-navy">{a.teacher}</span>
                  <span className="text-[10px] text-gray-400">{a.time}</span>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{a.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right column */}
      <div className="space-y-5">
        {/* Progress card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Tiến độ học</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-28 h-28">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#F3F4F6" strokeWidth="10" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#F97316" strokeWidth="10"
                  strokeDasharray={`${62 * 2.51} ${(100 - 62) * 2.51}`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-trust-navy">62%</span>
                <span className="text-[10px] text-gray-400">Hoàn thành</span>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-center">
            <div className="bg-gray-50 rounded-xl p-2">
              <div className="text-lg font-bold text-trust-navy">3</div>
              <div className="text-[10px] text-gray-500">Buổi đã học</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-2">
              <div className="text-lg font-bold text-trust-navy">4</div>
              <div className="text-[10px] text-gray-500">Buổi còn lại</div>
            </div>
          </div>
        </div>

        {/* Quick resources */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Tài liệu nhanh</h3>
          <div className="space-y-2">
            {materials.slice(0, 3).map((m) => {
              const cfg = materialIcons[m.type];
              const Icon = cfg.icon;
              return (
                <div key={m.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer group">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", cfg.bg)}>
                    <Icon className={cn("w-4 h-4", cfg.color)} />
                  </div>
                  <span className="text-xs text-gray-700 flex-1 truncate">{m.title}</span>
                  <Download className="w-3.5 h-3.5 text-gray-300 group-hover:text-brand-orange transition-colors" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function LessonsTab() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <h3 className="font-semibold text-trust-navy">Danh sách buổi học</h3>
        <p className="text-xs text-gray-500 mt-0.5">Theo dõi tiến độ các buổi học trong lớp</p>
      </div>
      <div className="divide-y divide-gray-50">
        {lessons.map((lesson, i) => {
          const isCompleted = lesson.status === "completed";
          const isCurrent = lesson.status === "current";
          const isLocked = lesson.status === "locked";
          return (
            <div key={lesson.id} className={cn(
              "flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors",
              isCurrent && "bg-orange-50 hover:bg-orange-50"
            )}>
              {/* Status icon */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                  isCompleted && "bg-emerald-100 text-emerald-600",
                  isCurrent && "bg-brand-orange text-white shadow-md shadow-orange-200",
                  isLocked && "bg-gray-100 text-gray-400"
                )}>
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> :
                    isCurrent ? <Play className="w-3.5 h-3.5 ml-0.5" /> :
                      <Lock className="w-3.5 h-3.5" />}
                </div>
                {i < lessons.length - 1 && (
                  <div className={cn("w-0.5 h-6 mt-1", isCompleted ? "bg-emerald-200" : "bg-gray-100")} />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-sm font-medium",
                    isCompleted && "text-gray-700",
                    isCurrent && "text-trust-navy",
                    isLocked && "text-gray-400"
                  )}>
                    Buổi {i + 1}: {lesson.title}
                  </span>
                  {isCurrent && <span className="text-[10px] font-semibold bg-brand-orange text-white px-1.5 py-0.5 rounded-full">Tiếp theo</span>}
                </div>
                <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{lesson.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{lesson.duration}</span>
                </div>
              </div>

              {/* Action */}
              <div>
                {isCompleted && (
                  <Button variant="outline" size="sm" className="h-7 text-xs rounded-lg gap-1.5 border-gray-200 hover:border-brand-orange hover:text-brand-orange">
                    <Play className="w-3 h-3" /> Xem lại
                  </Button>
                )}
                {isCurrent && (
                  <Button size="sm" className="h-7 text-xs rounded-lg bg-brand-orange hover:bg-brand-orange/90 text-white gap-1.5">
                    <Play className="w-3 h-3" /> Vào học
                  </Button>
                )}
                {isLocked && (
                  <Button size="sm" variant="ghost" className="h-7 text-xs rounded-lg text-gray-300" disabled>
                    <Lock className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MaterialsTab() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-trust-navy">Tài liệu học tập</h3>
          <p className="text-xs text-gray-500 mt-0.5">{materials.length} tài liệu có sẵn</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-5">
        {materials.map((m) => {
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
                  <span className="text-[10px] text-gray-400">{m.size}</span>
                  <span className="text-[10px] text-gray-400">{m.date}</span>
                </div>
              </div>
              <div className="flex gap-1.5">
                <button className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-brand-orange hover:text-white flex items-center justify-center transition-colors text-gray-500">
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AnnouncementsTab() {
  return (
    <div className="space-y-4">
      {announcements.map((a) => (
        <div key={a.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-primary-orange flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {a.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-trust-navy">{a.teacher}</span>
                <span className="text-xs text-gray-400">{a.time}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{a.content}</p>
              {a.attachments.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {a.attachments.map((f) => (
                    <div key={f} className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-600 hover:border-brand-orange hover:text-brand-orange cursor-pointer transition-colors">
                      <Paperclip className="w-3 h-3" />
                      {f}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function MembersTab() {
  return (
    <div className="space-y-5">
      {/* Teacher */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">Giáo viên</h3>
        <div className="flex items-center gap-4 p-3 bg-orange-50 rounded-xl">
          <div className="w-12 h-12 rounded-xl bg-primary-orange flex items-center justify-center text-white font-bold text-base flex-shrink-0">
            {members.teacher.avatar}
          </div>
          <div>
            <div className="font-semibold text-trust-navy">{members.teacher.name}</div>
            <div className="text-sm text-gray-500">{members.teacher.subject}</div>
          </div>
          <span className="ml-auto text-xs font-semibold bg-brand-orange text-white px-2 py-1 rounded-full">Giáo viên</span>
        </div>
      </div>

      {/* Students */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">
          Học viên ({members.students.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {members.students.map((s) => (
            <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {s.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-800">{s.name}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <Progress value={s.progress} className="h-1 w-16" />
                  <span className="text-[10px] text-gray-400">{s.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

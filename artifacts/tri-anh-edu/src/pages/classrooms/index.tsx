import { useState } from "react";
import { Link } from "wouter";
import {
  Users, Calendar, BookOpen, Clock, ChevronRight,
  GraduationCap, Play, Search, Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

type ClassroomStatus = "waiting" | "active" | "completed";

interface Classroom {
  id: number;
  name: string;
  courseName: string;
  courseType: "HSA" | "TSA";
  thumbnail: string;
  teacherName: string;
  teacherAvatar: string;
  studentCount: number;
  maxStudents: number;
  progress: number;
  schedule: string;
  nextLesson: string;
  nextLessonDate: string;
  status: ClassroomStatus;
  room: string;
  isOnline: boolean;
}

const mockClassrooms: Classroom[] = [
  {
    id: 1,
    name: "HSA 2027 Buổi Sáng",
    courseName: "Luyện thi HSA 2027 Toàn diện",
    courseType: "HSA",
    thumbnail: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&q=80",
    teacherName: "Thầy Nguyễn Minh Tuấn",
    teacherAvatar: "NT",
    studentCount: 24,
    maxStudents: 30,
    progress: 62,
    schedule: "Thứ 2, 4, 6 | 8:00 - 10:00",
    nextLesson: "Toán: Phương trình lượng giác",
    nextLessonDate: "Thứ 2, 16/06/2026",
    status: "active",
    room: "Phòng A201",
    isOnline: false,
  },
  {
    id: 2,
    name: "TSA 2027 Tối Thứ 3-5",
    courseName: "Luyện thi TSA 2027 Bách Khoa",
    courseType: "TSA",
    thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80",
    teacherName: "Cô Trần Thị Lan",
    teacherAvatar: "TL",
    studentCount: 18,
    maxStudents: 25,
    progress: 35,
    schedule: "Thứ 3, 5 | 19:00 - 21:00",
    nextLesson: "Vật lý: Điện từ trường",
    nextLessonDate: "Thứ 3, 17/06/2026",
    status: "active",
    room: "Online",
    isOnline: true,
  },
  {
    id: 3,
    name: "HSA 2026 Cuối tuần",
    courseName: "Luyện thi HSA 2026 Cấp tốc",
    courseType: "HSA",
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80",
    teacherName: "Thầy Lê Văn Đức",
    teacherAvatar: "LĐ",
    studentCount: 28,
    maxStudents: 30,
    progress: 100,
    schedule: "Thứ 7, CN | 8:00 - 11:00",
    nextLesson: "Ôn tập tổng kết",
    nextLessonDate: "Đã hoàn thành",
    status: "completed",
    room: "Phòng B305",
    isOnline: false,
  },
  {
    id: 4,
    name: "TSA 2027 Sáng Cuối tuần",
    courseName: "Luyện thi TSA 2027 Nâng cao",
    courseType: "TSA",
    thumbnail: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80",
    teacherName: "Cô Phạm Thị Hà",
    teacherAvatar: "PH",
    studentCount: 0,
    maxStudents: 25,
    progress: 0,
    schedule: "Thứ 7 | 8:00 - 11:00",
    nextLesson: "Chưa có lịch",
    nextLessonDate: "Đang chờ xếp lớp",
    status: "waiting",
    room: "Phòng C102",
    isOnline: false,
  },
];

const statusConfig: Record<ClassroomStatus, { label: string; className: string }> = {
  waiting: { label: "Chờ xếp lớp", className: "bg-amber-100 text-amber-700 border-amber-200" },
  active: { label: "Đang học", className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  completed: { label: "Hoàn thành", className: "bg-blue-100 text-blue-700 border-blue-200" },
};

export default function MyClassrooms() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | ClassroomStatus>("all");

  const filtered = mockClassrooms.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.courseName.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || c.status === filter;
    return matchSearch && matchFilter;
  });

  const active = mockClassrooms.filter(c => c.status === "active").length;
  const completed = mockClassrooms.filter(c => c.status === "completed").length;
  const waiting = mockClassrooms.filter(c => c.status === "waiting").length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-trust-navy mb-1">Lớp học của tôi</h1>
        <p className="text-gray-500 text-sm">Quản lý và truy cập các lớp học bạn đang tham gia</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Đang học", value: active, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Hoàn thành", value: completed, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Chờ xếp lớp", value: waiting, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((s) => (
          <div key={s.label} className={cn("rounded-2xl p-4 flex items-center gap-3", s.bg)}>
            <div className={cn("text-3xl font-bold", s.color)}>{s.value}</div>
            <div className="text-sm text-gray-600 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Tìm lớp học, khóa học..."
            className="pl-9 rounded-xl border-gray-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {(["all", "active", "waiting", "completed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                filter === f
                  ? "bg-brand-orange text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-brand-orange hover:text-brand-orange"
              )}
            >
              {f === "all" ? "Tất cả" : f === "active" ? "Đang học" : f === "waiting" ? "Chờ xếp lớp" : "Hoàn thành"}
            </button>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mb-4">
            <GraduationCap className="w-10 h-10 text-brand-orange/40" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Chưa có lớp học nào</h3>
          <p className="text-gray-400 text-sm max-w-xs">
            Bạn chưa được phân vào lớp học nào. Vui lòng liên hệ nhà trường để được xếp lớp.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((cls) => (
            <ClassroomCard key={cls.id} classroom={cls} />
          ))}
        </div>
      )}
    </div>
  );
}

function ClassroomCard({ classroom: c }: { classroom: Classroom }) {
  const status = statusConfig[c.status];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group">
      {/* Thumbnail */}
      <div className="relative h-36 overflow-hidden">
        <img src={c.thumbnail} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-trust-navy/60 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={cn(
            "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border",
            status.className
          )}>
            {status.label}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={cn(
            "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold",
            c.courseType === "HSA" ? "bg-brand-orange text-white" : "bg-trust-navy text-white"
          )}>
            {c.courseType}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-bold text-base leading-tight">{c.name}</h3>
          <p className="text-white/80 text-xs mt-0.5 truncate">{c.courseName}</p>
        </div>
      </div>

      <div className="p-4">
        {/* Teacher + stats */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary-orange flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
              {c.teacherAvatar}
            </div>
            <span className="text-xs text-gray-600 font-medium">{c.teacherName}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Users className="w-3.5 h-3.5" />
            <span>{c.studentCount}/{c.maxStudents}</span>
          </div>
        </div>

        {/* Progress */}
        {c.status !== "waiting" && (
          <div className="mb-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Tiến độ</span>
              <span className="font-semibold text-brand-orange">{c.progress}%</span>
            </div>
            <Progress value={c.progress} className="h-1.5 rounded-full" />
          </div>
        )}

        {/* Schedule + next lesson */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span>{c.schedule}</span>
            {c.isOnline && (
              <span className="ml-auto bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-medium">Online</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span className="truncate">{c.nextLessonDate}: <span className="text-gray-700">{c.nextLesson}</span></span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {c.status === "active" && (
            <Link href={`/classrooms/${c.id}`} className="flex-1">
              <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl text-xs h-8 gap-1.5">
                <Play className="w-3 h-3" /> Vào lớp học
              </Button>
            </Link>
          )}
          {c.status === "completed" && (
            <Link href={`/classrooms/${c.id}`} className="flex-1">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs h-8 gap-1.5">
                <BookOpen className="w-3 h-3" /> Xem lại
              </Button>
            </Link>
          )}
          {c.status === "waiting" && (
            <div className="flex-1 flex items-center justify-center bg-amber-50 rounded-xl h-8 text-xs text-amber-600 font-medium">
              Đang chờ xếp lớp...
            </div>
          )}
          <Link href={`/classrooms/${c.id}`}>
            <Button variant="outline" className="rounded-xl h-8 px-3 text-xs border-gray-200 hover:border-brand-orange hover:text-brand-orange gap-1">
              Chi tiết <ChevronRight className="w-3 h-3" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

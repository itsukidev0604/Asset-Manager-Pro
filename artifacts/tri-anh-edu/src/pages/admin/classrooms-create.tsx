import { useState } from "react";
import { Link } from "wouter";
import {
  ChevronLeft, BookOpen, Users, Calendar, MapPin, Clock,
  Wifi, GraduationCap, Save, Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const courses = [
  { id: 1, name: "Luyện thi HSA 2027 Toàn diện", type: "HSA" },
  { id: 2, name: "Luyện thi HSA 2027 Cấp tốc", type: "HSA" },
  { id: 3, name: "Luyện thi TSA 2027 Bách Khoa", type: "TSA" },
  { id: 4, name: "Luyện thi TSA 2027 Nâng cao", type: "TSA" },
];

const teachers = [
  { id: 1, name: "Nguyễn Minh Tuấn", avatar: "NT", subject: "Toán - Lý" },
  { id: 2, name: "Trần Thị Lan", avatar: "TL", subject: "Văn - Anh" },
  { id: 3, name: "Lê Văn Đức", avatar: "LĐ", subject: "Toán - Hóa" },
  { id: 4, name: "Phạm Thị Hà", avatar: "PH", subject: "Lý - Hóa" },
  { id: 5, name: "Hoàng Văn Nam", avatar: "HN", subject: "Toán - Lý" },
];

const schedulePresets = [
  "Thứ 2, 4, 6 | 8:00 - 10:00",
  "Thứ 2, 4, 6 | 19:00 - 21:00",
  "Thứ 3, 5 | 19:00 - 21:00",
  "Thứ 7, CN | 8:00 - 11:00",
  "Thứ 7 | 8:00 - 11:00",
  "Thứ 2-6 | 7:00 - 9:00",
];

export default function AdminClassroomsCreate() {
  const [form, setForm] = useState({
    name: "",
    courseId: "",
    teacherId: "",
    maxStudents: "25",
    startDate: "",
    endDate: "",
    room: "",
    schedule: "",
    isOnline: false,
  });

  const set = (k: keyof typeof form, v: string | boolean) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const selectedCourse = courses.find(c => c.id.toString() === form.courseId);
  const selectedTeacher = teachers.find(t => t.id.toString() === form.teacherId);

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* Back */}
      <Link href="/admin/classrooms" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-orange transition-colors">
        <ChevronLeft className="w-4 h-4" /> Quay lại danh sách
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Form */}
        <div className="lg:col-span-2 space-y-5">
          {/* Basic info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-brand-orange" /> Thông tin cơ bản
            </h2>
            <div className="space-y-4">
              <div>
                <Label className="text-xs font-medium text-gray-600 mb-1.5 block">Tên lớp học <span className="text-red-500">*</span></Label>
                <Input
                  placeholder="VD: HSA 2027 Buổi Sáng Nhóm A"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className="rounded-xl border-gray-200 focus:border-brand-orange"
                />
              </div>

              <div>
                <Label className="text-xs font-medium text-gray-600 mb-1.5 block">Khóa học <span className="text-red-500">*</span></Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {courses.map(c => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => set("courseId", c.id.toString())}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl border text-left transition-all",
                        form.courseId === c.id.toString()
                          ? "border-brand-orange bg-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <span className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0",
                        c.type === "HSA" ? "bg-brand-orange" : "bg-trust-navy"
                      )}>{c.type}</span>
                      <span className="text-sm text-gray-700 font-medium leading-tight">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-xs font-medium text-gray-600 mb-1.5 block">Giáo viên phụ trách <span className="text-red-500">*</span></Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {teachers.map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => set("teacherId", t.id.toString())}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl border text-left transition-all",
                        form.teacherId === t.id.toString()
                          ? "border-brand-orange bg-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary-orange flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{t.avatar}</div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">{t.name}</div>
                        <div className="text-[10px] text-gray-400">{t.subject}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Schedule & capacity */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-orange" /> Lịch học & Sức chứa
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-medium text-gray-600 mb-1.5 block">Sĩ số tối đa</Label>
                <Input
                  type="number"
                  min={1}
                  max={50}
                  value={form.maxStudents}
                  onChange={(e) => set("maxStudents", e.target.value)}
                  className="rounded-xl border-gray-200"
                />
              </div>
              <div>
                <Label className="text-xs font-medium text-gray-600 mb-1.5 block">Ngày bắt đầu</Label>
                <Input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => set("startDate", e.target.value)}
                  className="rounded-xl border-gray-200"
                />
              </div>
              <div>
                <Label className="text-xs font-medium text-gray-600 mb-1.5 block">Ngày kết thúc</Label>
                <Input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => set("endDate", e.target.value)}
                  className="rounded-xl border-gray-200"
                />
              </div>
              <div>
                <Label className="text-xs font-medium text-gray-600 mb-1.5 block">Phòng học</Label>
                <Input
                  placeholder="VD: Phòng A201"
                  value={form.room}
                  onChange={(e) => set("room", e.target.value)}
                  className="rounded-xl border-gray-200"
                  disabled={form.isOnline}
                />
              </div>
            </div>

            {/* Schedule presets */}
            <div className="mt-4">
              <Label className="text-xs font-medium text-gray-600 mb-2 block">Lịch học</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {schedulePresets.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => set("schedule", s)}
                    className={cn(
                      "py-2 px-3 rounded-xl border text-xs font-medium transition-all text-left",
                      form.schedule === s
                        ? "border-brand-orange bg-orange-50 text-brand-orange"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Online toggle */}
            <div className="mt-4 flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50">
              <Wifi className="w-4 h-4 text-gray-500" />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-700">Học trực tuyến (Online)</div>
                <div className="text-xs text-gray-400">Tắt nếu học tại phòng</div>
              </div>
              <button
                type="button"
                onClick={() => set("isOnline", !form.isOnline)}
                className={cn(
                  "w-10 h-5 rounded-full transition-colors relative flex items-center",
                  form.isOnline ? "bg-brand-orange" : "bg-gray-300"
                )}
              >
                <span className={cn(
                  "w-4 h-4 rounded-full bg-white shadow absolute transition-transform",
                  form.isOnline ? "translate-x-5" : "translate-x-0.5"
                )} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Link href="/admin/classrooms">
              <Button variant="outline" className="rounded-xl border-gray-200">Hủy</Button>
            </Link>
            <Button className="rounded-xl bg-brand-orange hover:bg-brand-orange/90 text-white gap-2">
              <Save className="w-4 h-4" /> Tạo lớp học
            </Button>
          </div>
        </div>

        {/* Preview card */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-br from-trust-navy to-[#1a3a5c] p-5">
                <div className="text-white/50 text-[10px] uppercase tracking-widest mb-1">Xem trước</div>
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0",
                    selectedCourse?.type === "TSA" ? "bg-white/20" : "bg-brand-orange"
                  )}>
                    {selectedCourse?.type ?? "?"}
                  </div>
                  <div>
                    <h3 className="text-white font-bold leading-tight">{form.name || "Tên lớp học"}</h3>
                    <p className="text-white/60 text-xs mt-0.5">{selectedCourse?.name ?? "Chọn khóa học"}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <PreviewRow icon={GraduationCap} label="Giáo viên" value={selectedTeacher?.name ?? "Chưa chọn"} />
                <PreviewRow icon={Users} label="Sĩ số tối đa" value={`${form.maxStudents || "?"} học viên`} />
                <PreviewRow icon={Calendar} label="Bắt đầu" value={form.startDate || "Chưa chọn"} />
                <PreviewRow icon={Clock} label="Lịch học" value={form.schedule || "Chưa chọn"} />
                <PreviewRow icon={form.isOnline ? Wifi : MapPin} label="Hình thức" value={form.isOnline ? "Trực tuyến" : (form.room || "Offline")} />

                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Trạng thái</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Sắp khai giảng</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5 text-sm">
      <Icon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <span className="text-[10px] text-gray-400 block">{label}</span>
        <span className={cn("font-medium", value === "Chưa chọn" ? "text-gray-300" : "text-gray-700")}>{value}</span>
      </div>
    </div>
  );
}

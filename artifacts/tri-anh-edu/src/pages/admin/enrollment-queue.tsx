import { useState } from "react";
import {
  Search, CheckSquare, Square, UserPlus, ChevronDown,
  Calendar, BookOpen, Clock, X, Users, Check, GraduationCap,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EnrollStudent {
  id: number;
  name: string;
  avatar: string;
  email: string;
  courseName: string;
  courseType: "HSA" | "TSA";
  courseId: number;
  enrollDate: string;
  waitingDays: number;
  selected: boolean;
}

interface AvailableClass {
  id: number;
  name: string;
  teacherName: string;
  teacherAvatar: string;
  students: number;
  capacity: number;
  schedule: string;
  courseId: number;
}

const initialStudents: EnrollStudent[] = [
  { id: 1, name: "Nguyễn Thị Phương", avatar: "NP", email: "phuong.nguyen@email.com", courseName: "Luyện thi HSA 2027 Toàn diện", courseType: "HSA", courseId: 1, enrollDate: "05/06/2026", waitingDays: 6, selected: false },
  { id: 2, name: "Trần Minh Khôi", avatar: "TK", email: "khoi.tran@email.com", courseName: "Luyện thi HSA 2027 Toàn diện", courseType: "HSA", courseId: 1, enrollDate: "06/06/2026", waitingDays: 5, selected: false },
  { id: 3, name: "Lê Thị Ngọc Anh", avatar: "LA", email: "ngocanh.le@email.com", courseName: "Luyện thi TSA 2027 Bách Khoa", courseType: "TSA", courseId: 3, enrollDate: "07/06/2026", waitingDays: 4, selected: false },
  { id: 4, name: "Phạm Văn Toàn", avatar: "PT", email: "toan.pham@email.com", courseName: "Luyện thi HSA 2027 Cấp tốc", courseType: "HSA", courseId: 2, enrollDate: "07/06/2026", waitingDays: 4, selected: false },
  { id: 5, name: "Hoàng Minh Châu", avatar: "HC", email: "chau.hoang@email.com", courseName: "Luyện thi TSA 2027 Bách Khoa", courseType: "TSA", courseId: 3, enrollDate: "08/06/2026", waitingDays: 3, selected: false },
  { id: 6, name: "Vũ Thị Hương", avatar: "VH", email: "huong.vu@email.com", courseName: "Luyện thi HSA 2027 Toàn diện", courseType: "HSA", courseId: 1, enrollDate: "09/06/2026", waitingDays: 2, selected: false },
  { id: 7, name: "Đỗ Quang Huy", avatar: "ĐH", email: "huy.do@email.com", courseName: "Luyện thi TSA 2027 Nâng cao", courseType: "TSA", courseId: 4, enrollDate: "10/06/2026", waitingDays: 1, selected: false },
  { id: 8, name: "Bùi Thị Thanh", avatar: "BT", email: "thanh.bui@email.com", courseName: "Luyện thi HSA 2027 Toàn diện", courseType: "HSA", courseId: 1, enrollDate: "11/06/2026", waitingDays: 0, selected: false },
];

const availableClasses: Record<number, AvailableClass[]> = {
  1: [
    { id: 1, name: "HSA 2027 Buổi Sáng", teacherName: "Nguyễn Minh Tuấn", teacherAvatar: "NT", students: 24, capacity: 30, schedule: "T2,4,6 | 8:00-10:00", courseId: 1 },
    { id: 2, name: "HSA 2027 Buổi Tối", teacherName: "Trần Thị Lan", teacherAvatar: "TL", students: 28, capacity: 30, schedule: "T3,5 | 19:00-21:00", courseId: 1 },
    { id: 3, name: "HSA 2027 Cuối Tuần", teacherName: "Lê Văn Đức", teacherAvatar: "LĐ", students: 22, capacity: 25, schedule: "T7,CN | 8:00-11:00", courseId: 1 },
  ],
  2: [
    { id: 6, name: "HSA 2027 Cấp Tốc A", teacherName: "Nguyễn Minh Tuấn", teacherAvatar: "NT", students: 12, capacity: 20, schedule: "T2-6 | 7:00-9:00", courseId: 2 },
  ],
  3: [
    { id: 4, name: "TSA 2027 Nhóm A", teacherName: "Phạm Thị Hà", teacherAvatar: "PH", students: 18, capacity: 25, schedule: "T2,4 | 19:00-21:00", courseId: 3 },
    { id: 5, name: "TSA 2027 Nhóm B", teacherName: "Hoàng Văn Nam", teacherAvatar: "HN", students: 0, capacity: 25, schedule: "T3,5,7 | 17:00-19:00", courseId: 3 },
  ],
  4: [
    { id: 7, name: "TSA 2027 Nâng Cao", teacherName: "Phạm Thị Hà", teacherAvatar: "PH", students: 8, capacity: 20, schedule: "T7 | 8:00-12:00", courseId: 4 },
  ],
};

export default function EnrollmentQueue() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [assignModalFor, setAssignModalFor] = useState<EnrollStudent | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [assigned, setAssigned] = useState<number[]>([]);

  const filtered = students
    .filter(s => !assigned.includes(s.id))
    .filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.courseName.toLowerCase().includes(search.toLowerCase())
    );

  const selectedCount = filtered.filter(s => s.selected).length;
  const allSelected = filtered.length > 0 && filtered.every(s => s.selected);

  const toggleStudent = (id: number) =>
    setStudents(prev => prev.map(s => s.id === id ? { ...s, selected: !s.selected } : s));

  const toggleAll = () =>
    setStudents(prev => prev.map(s =>
      filtered.find(f => f.id === s.id) ? { ...s, selected: !allSelected } : s
    ));

  const handleAssign = () => {
    if (assignModalFor) {
      setAssigned(prev => [...prev, assignModalFor.id]);
    }
    setAssignModalFor(null);
    setSelectedClassId(null);
  };

  const handleBulkAssign = () => {
    const ids = filtered.filter(s => s.selected).map(s => s.id);
    setAssigned(prev => [...prev, ...ids]);
    setStudents(prev => prev.map(s => ({ ...s, selected: false })));
  };

  const openClasses = assignModalFor ? (availableClasses[assignModalFor.courseId] ?? []) : [];

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Chờ xếp lớp", value: students.filter(s => !assigned.includes(s.id)).length, color: "text-amber-600", border: "border-l-amber-400" },
          { label: "Chờ > 3 ngày", value: students.filter(s => !assigned.includes(s.id) && s.waitingDays >= 3).length, color: "text-red-500", border: "border-l-red-400" },
          { label: "Đã xếp hôm nay", value: assigned.length, color: "text-emerald-600", border: "border-l-emerald-400" },
          { label: "Đã chọn", value: selectedCount, color: "text-blue-600", border: "border-l-blue-400" },
        ].map(s => (
          <div key={s.label} className={cn("bg-white rounded-xl border border-gray-100 border-l-4 shadow-sm p-4", s.border)}>
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
            placeholder="Tìm học viên, email, khóa học..."
            className="pl-9 rounded-xl border-gray-200 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {selectedCount > 0 && (
          <Button
            onClick={handleBulkAssign}
            className="rounded-xl bg-brand-orange hover:bg-brand-orange/90 text-white gap-2 animate-in fade-in"
          >
            <UserPlus className="w-4 h-4" /> Xếp lớp {selectedCount} học viên
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-5 py-3 text-left">
                  <button onClick={toggleAll} className="flex items-center text-gray-400 hover:text-gray-600">
                    {allSelected ? <CheckSquare className="w-4 h-4 text-brand-orange" /> : <Square className="w-4 h-4" />}
                  </button>
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Học viên</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Khóa học</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Ngày đăng ký</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Chờ (ngày)</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(s => (
                <tr key={s.id} className={cn("hover:bg-gray-50 transition-colors", s.selected && "bg-orange-50 hover:bg-orange-50")}>
                  <td className="px-5 py-3.5">
                    <button onClick={() => toggleStudent(s.id)} className="text-gray-400 hover:text-brand-orange">
                      {s.selected ? <CheckSquare className="w-4 h-4 text-brand-orange" /> : <Square className="w-4 h-4" />}
                    </button>
                  </td>
                  <td className="px-4 py-3.5">
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
                  <td className="px-4 py-3.5 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "w-5 h-5 rounded flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0",
                        s.courseType === "HSA" ? "bg-brand-orange" : "bg-trust-navy"
                      )}>{s.courseType}</span>
                      <span className="text-xs text-gray-600 line-clamp-1">{s.courseName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" /> {s.enrollDate}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={cn(
                      "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold",
                      s.waitingDays >= 5 ? "bg-red-100 text-red-600" :
                        s.waitingDays >= 3 ? "bg-amber-100 text-amber-600" :
                          "bg-gray-100 text-gray-600"
                    )}>
                      {s.waitingDays >= 5 && <AlertCircle className="w-3 h-3" />}
                      {s.waitingDays === 0 ? "Hôm nay" : `${s.waitingDays} ngày`}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-100 text-amber-700">
                      <Clock className="w-3 h-3" /> Chờ xếp lớp
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <Button
                      size="sm"
                      onClick={() => { setAssignModalFor(s); setSelectedClassId(null); }}
                      className="h-7 text-xs rounded-lg bg-brand-orange hover:bg-brand-orange/90 text-white gap-1.5"
                    >
                      <UserPlus className="w-3 h-3" /> Xếp lớp
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 text-emerald-500" />
            </div>
            <p className="text-sm font-medium text-gray-700">Tất cả học viên đã được xếp lớp!</p>
          </div>
        )}
        <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-500">
          {filtered.length} học viên đang chờ xếp lớp
        </div>
      </div>

      {/* Assign Modal */}
      {assignModalFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setAssignModalFor(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-semibold text-trust-navy">Xếp lớp học viên</h2>
              <button onClick={() => setAssignModalFor(null)} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Student info */}
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {assignModalFor.avatar}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{assignModalFor.name}</div>
                  <div className="text-xs text-gray-500">{assignModalFor.email}</div>
                </div>
                <div className="text-right">
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full text-white",
                    assignModalFor.courseType === "HSA" ? "bg-brand-orange" : "bg-trust-navy"
                  )}>{assignModalFor.courseType}</span>
                  <div className="text-[10px] text-gray-400 mt-1 max-w-28 text-right line-clamp-1">{assignModalFor.courseName}</div>
                </div>
              </div>
            </div>

            {/* Available classrooms */}
            <div className="p-4">
              <p className="text-xs text-gray-500 font-medium mb-3">Chọn lớp học phù hợp:</p>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {openClasses.length === 0 ? (
                  <div className="text-center py-6 text-gray-400 text-sm">
                    <GraduationCap className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    Không có lớp học nào khả dụng
                  </div>
                ) : openClasses.map(cls => {
                  const fillPct = Math.round((cls.students / cls.capacity) * 100);
                  const isFull = cls.students >= cls.capacity;
                  return (
                    <button
                      key={cls.id}
                      onClick={() => !isFull && setSelectedClassId(cls.id)}
                      disabled={isFull}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all",
                        isFull && "opacity-50 cursor-not-allowed",
                        selectedClassId === cls.id
                          ? "border-brand-orange bg-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <div className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
                        selectedClassId === cls.id ? "bg-brand-orange" : "bg-gray-100"
                      )}>
                        {selectedClassId === cls.id
                          ? <Check className="w-4 h-4 text-white" />
                          : <GraduationCap className="w-4 h-4 text-gray-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-800">{cls.name}</div>
                        <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                          <span>{cls.teacherName}</span>
                          <span>·</span>
                          <Clock className="w-2.5 h-2.5" />
                          <span>{cls.schedule}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className={cn(
                          "text-xs font-semibold",
                          isFull ? "text-red-500" : fillPct >= 80 ? "text-amber-500" : "text-emerald-600"
                        )}>
                          {cls.students}/{cls.capacity}
                        </div>
                        <div className="w-12 h-1 bg-gray-100 rounded-full mt-1">
                          <div
                            className={cn("h-full rounded-full", isFull ? "bg-red-400" : fillPct >= 80 ? "bg-amber-400" : "bg-emerald-400")}
                            style={{ width: `${fillPct}%` }}
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3 p-4 border-t border-gray-100">
              <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setAssignModalFor(null)}>Hủy</Button>
              <Button
                disabled={!selectedClassId}
                onClick={handleAssign}
                className="flex-1 rounded-xl bg-brand-orange hover:bg-brand-orange/90 text-white gap-2"
              >
                <UserPlus className="w-4 h-4" /> Xếp vào lớp
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

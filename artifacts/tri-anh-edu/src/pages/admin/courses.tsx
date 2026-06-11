import { useState } from "react";
import { Plus, Search, Pencil, Trash2, Eye, MoreHorizontal, BookOpen } from "lucide-react";
import { useListCourses } from "@workspace/api-client-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const statusLabels: Record<string, { label: string; class: string }> = {
  published: { label: "Đã xuất bản", class: "bg-green-100 text-green-700" },
  draft: { label: "Bản nháp", class: "bg-gray-100 text-gray-600" },
  archived: { label: "Lưu trữ", class: "bg-yellow-100 text-yellow-700" },
};

export default function AdminCourses() {
  const { data: courses, isLoading } = useListCourses();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const { toast } = useToast();

  const filtered = (courses ?? []).filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || c.type === typeFilter;
    return matchSearch && matchType;
  });

  const handleDelete = () => {
    toast({ title: "Đã xoá khóa học", description: "Khóa học đã được xoá thành công." });
    setDeleteTarget(null);
  };

  const handlePublish = (title: string) => {
    toast({ title: "Đã xuất bản", description: `"${title}" đã được xuất bản.` });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 max-w-xs">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <Input
              placeholder="Tìm khóa học..."
              className="pl-8 h-9 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 bg-gray-100 p-0.5 rounded-lg">
            {["all", "HSA", "TSA"].map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${
                  typeFilter === t ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {t === "all" ? "Tất cả" : t}
              </button>
            ))}
          </div>
          <Button size="sm" className="bg-brand-orange hover:bg-brand-orange/90 text-white h-9 gap-1.5 text-xs">
            <Plus className="w-3.5 h-3.5" /> Tạo khóa học
          </Button>
        </div>
      </div>

      <Card className="bg-white border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Khóa học</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Loại</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden md:table-cell">Giáo viên</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden lg:table-cell">Học viên</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden lg:table-cell">Giá</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Trạng thái</th>
                <th className="text-right text-xs font-semibold text-gray-500 px-4 py-3">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="px-4 py-3" colSpan={7}>
                      <Skeleton className="h-8 w-full rounded" />
                    </td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <BookOpen className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Không tìm thấy khóa học nào</p>
                  </td>
                </tr>
              ) : (
                filtered.map((course) => {
                  const status = Math.random() > 0.3 ? "published" : "draft";
                  const s = statusLabels[status];
                  return (
                    <tr key={course.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                            <img src={course.thumbnail ?? ""} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{course.title}</p>
                            <p className="text-xs text-gray-400">{course.lessonsCount} bài học</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${course.type === "HSA" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`}>
                          {course.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <p className="text-xs text-gray-700">{course.teacher?.name ?? "—"}</p>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <p className="text-xs text-gray-700">{course.studentsCount?.toLocaleString("vi-VN")}</p>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <p className="text-xs font-medium text-gray-900">
                          {course.price === 0 ? "Miễn phí" : `${(course.price ?? 0).toLocaleString("vi-VN")}đ`}
                        </p>
                        {course.originalPrice && course.originalPrice > (course.price ?? 0) && (
                          <p className="text-[10px] text-gray-400 line-through">{course.originalPrice.toLocaleString("vi-VN")}đ</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.class}`}>{s.label}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40 text-sm">
                            <DropdownMenuItem><Eye className="w-3.5 h-3.5 mr-2" /> Xem</DropdownMenuItem>
                            <DropdownMenuItem><Pencil className="w-3.5 h-3.5 mr-2" /> Chỉnh sửa</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePublish(course.title)}>
                              <BookOpen className="w-3.5 h-3.5 mr-2" /> Xuất bản
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => setDeleteTarget(course.id)}
                            >
                              <Trash2 className="w-3.5 h-3.5 mr-2" /> Xoá
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-400">{filtered.length} khóa học</p>
          <div className="flex gap-1">
            <button className="px-2.5 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50 text-gray-600 disabled:opacity-40" disabled>Trước</button>
            <button className="px-2.5 py-1 text-xs bg-brand-orange text-white rounded">1</button>
            <button className="px-2.5 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50 text-gray-600">Sau</button>
          </div>
        </div>
      </Card>

      <Dialog open={deleteTarget !== null} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xoá khóa học?</DialogTitle>
            <DialogDescription>Hành động này không thể hoàn tác. Tất cả dữ liệu liên quan sẽ bị xoá vĩnh viễn.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Huỷ</Button>
            <Button variant="destructive" onClick={handleDelete}>Xác nhận xoá</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

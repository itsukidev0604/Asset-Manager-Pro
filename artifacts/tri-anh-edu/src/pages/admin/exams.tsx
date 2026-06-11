import { useState } from "react";
import { Plus, Search, Pencil, Trash2, Eye, MoreHorizontal, Copy, ClipboardList } from "lucide-react";
import { useListExams } from "@workspace/api-client-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const difficultyColors: Record<string, string> = {
  Dễ: "bg-green-100 text-green-700",
  "Trung bình": "bg-yellow-100 text-yellow-700",
  Khó: "bg-red-100 text-red-700",
};

export default function AdminExams() {
  const { data: exams, isLoading } = useListExams();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const { toast } = useToast();

  const filtered = (exams ?? []).filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || e.type === typeFilter;
    return matchSearch && matchType;
  });

  const handleDelete = () => {
    toast({ title: "Đã xoá đề thi", description: "Đề thi đã được xoá thành công." });
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <Input placeholder="Tìm đề thi..." className="pl-8 h-9 text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 bg-gray-100 p-0.5 rounded-lg">
            {["all", "HSA", "TSA"].map((t) => (
              <button key={t} onClick={() => setTypeFilter(t)} className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${typeFilter === t ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"}`}>
                {t === "all" ? "Tất cả" : t}
              </button>
            ))}
          </div>
          <Button size="sm" className="bg-brand-orange hover:bg-brand-orange/90 text-white h-9 gap-1.5 text-xs">
            <Plus className="w-3.5 h-3.5" /> Tạo đề thi
          </Button>
        </div>
      </div>

      <Card className="bg-white border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Tên đề thi</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Loại</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden md:table-cell">Thời gian</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden md:table-cell">Câu hỏi</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden lg:table-cell">Lượt thi</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Độ khó</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Phí</th>
                <th className="text-right text-xs font-semibold text-gray-500 px-4 py-3">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="px-4 py-3" colSpan={8}><Skeleton className="h-8 w-full rounded" /></td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12">
                    <ClipboardList className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Không tìm thấy đề thi nào</p>
                  </td>
                </tr>
              ) : (
                filtered.map((exam) => {
                  const dc = difficultyColors[exam.difficulty] ?? "bg-gray-100 text-gray-600";
                  return (
                    <tr key={exam.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-900 max-w-[220px] truncate">{exam.title}</p>
                        <p className="text-xs text-gray-400">{exam.year}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${exam.type === "HSA" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`}>
                          {exam.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <p className="text-xs text-gray-700">{exam.duration} phút</p>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <p className="text-xs text-gray-700">{exam.questionsCount} câu</p>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <p className="text-xs text-gray-700">{exam.attemptsCount?.toLocaleString("vi-VN")}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${dc}`}>{exam.difficulty}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${exam.isFree ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                          {exam.isFree ? "Miễn phí" : "Trả phí"}
                        </span>
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
                            <DropdownMenuItem><Copy className="w-3.5 h-3.5 mr-2" /> Nhân bản</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => setDeleteTarget(exam.id)}>
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
          <p className="text-xs text-gray-400">{filtered.length} đề thi</p>
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
            <DialogTitle>Xoá đề thi?</DialogTitle>
            <DialogDescription>Hành động này không thể hoàn tác. Tất cả câu hỏi và kết quả liên quan sẽ bị xoá.</DialogDescription>
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

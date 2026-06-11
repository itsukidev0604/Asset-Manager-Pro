import { useState } from "react";
import { Plus, Search, Pencil, Trash2, Eye, MoreHorizontal, ListOrdered, Upload, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const mockQuestions = [
  { id: 1, content: "Tìm tập xác định của hàm số y = √(x² − 4)", type: "HSA", subject: "Toán", topic: "Hàm số", difficulty: "Trung bình", choices: 4 },
  { id: 2, content: "Nếu f(x) = 2x² − 3x + 1, giá trị f(2) là bao nhiêu?", type: "HSA", subject: "Toán", topic: "Hàm số", difficulty: "Dễ", choices: 4 },
  { id: 3, content: "Trong văn bản 'Vợ chồng A Phủ', nhân vật Mị thể hiện điều gì?", type: "HSA", subject: "Văn", topic: "Đọc hiểu", difficulty: "Trung bình", choices: 4 },
  { id: 4, content: "Nguyên tố nào có số hiệu nguyên tử bằng 11?", type: "HSA", subject: "Khoa học", topic: "Hóa học", difficulty: "Dễ", choices: 4 },
  { id: 5, content: "Cho dãy số a₁=2, a_{n+1}=3a_n−1. Tìm a₅.", type: "TSA", subject: "Toán", topic: "Dãy số", difficulty: "Khó", choices: 4 },
  { id: 6, content: "Dạng bị động của 'They build houses' là gì?", type: "TSA", subject: "Văn", topic: "Ngữ pháp", difficulty: "Dễ", choices: 4 },
  { id: 7, content: "Tính giới hạn: lim(x→∞) (3x²+2x)/(x²−1)", type: "HSA", subject: "Toán", topic: "Giới hạn", difficulty: "Trung bình", choices: 4 },
  { id: 8, content: "Phân biệt các hình thức lập luận trong văn nghị luận", type: "HSA", subject: "Văn", topic: "Nghị luận", difficulty: "Trung bình", choices: 4 },
  { id: 9, content: "Trong phản ứng oxi hóa khử, chất khử là?", type: "HSA", subject: "Khoa học", topic: "Hóa học", difficulty: "Dễ", choices: 4 },
  { id: 10, content: "Giải phương trình: 2^x + 2^(x+1) = 48", type: "TSA", subject: "Toán", topic: "Phương trình mũ", difficulty: "Khó", choices: 4 },
];

const difficultyColors: Record<string, string> = {
  Dễ: "bg-green-100 text-green-700",
  "Trung bình": "bg-yellow-100 text-yellow-700",
  Khó: "bg-red-100 text-red-700",
};

export default function AdminQuestions() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [diffFilter, setDiffFilter] = useState("all");
  const { toast } = useToast();

  const filtered = mockQuestions.filter((q) => {
    const matchSearch = q.content.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || q.type === typeFilter;
    const matchSubject = subjectFilter === "all" || q.subject === subjectFilter;
    const matchDiff = diffFilter === "all" || q.difficulty === diffFilter;
    return matchSearch && matchType && matchSubject && matchDiff;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <Input placeholder="Tìm câu hỏi..." className="pl-8 h-9 text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Type filter */}
          <div className="flex gap-1 bg-gray-100 p-0.5 rounded-lg">
            {["all", "HSA", "TSA"].map((t) => (
              <button key={t} onClick={() => setTypeFilter(t)} className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${typeFilter === t ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"}`}>
                {t === "all" ? "Tất cả" : t}
              </button>
            ))}
          </div>
          {/* Subject filter */}
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="h-8 px-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-700 outline-none focus:ring-1 focus:ring-brand-orange"
          >
            <option value="all">Môn: Tất cả</option>
            <option value="Toán">Toán</option>
            <option value="Văn">Văn</option>
            <option value="Khoa học">Khoa học</option>
          </select>
          {/* Difficulty filter */}
          <select
            value={diffFilter}
            onChange={(e) => setDiffFilter(e.target.value)}
            className="h-8 px-2 text-xs border border-gray-200 rounded-lg bg-white text-gray-700 outline-none focus:ring-1 focus:ring-brand-orange"
          >
            <option value="all">Độ khó: Tất cả</option>
            <option value="Dễ">Dễ</option>
            <option value="Trung bình">Trung bình</option>
            <option value="Khó">Khó</option>
          </select>
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1" onClick={() => toast({ title: "Đã xuất câu hỏi", description: "File Excel đã được tải xuống." })}>
            <Download className="w-3 h-3" /> Xuất
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1">
            <Upload className="w-3 h-3" /> Nhập
          </Button>
          <Button size="sm" className="bg-brand-orange hover:bg-brand-orange/90 text-white h-8 gap-1 text-xs">
            <Plus className="w-3.5 h-3.5" /> Thêm câu hỏi
          </Button>
        </div>
      </div>

      <Card className="bg-white border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 w-8">#</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Nội dung câu hỏi</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Loại</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden md:table-cell">Môn học</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden md:table-cell">Chủ đề</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Độ khó</th>
                <th className="text-right text-xs font-semibold text-gray-500 px-4 py-3">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <ListOrdered className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Không tìm thấy câu hỏi</p>
                  </td>
                </tr>
              ) : (
                filtered.map((q, i) => (
                  <tr key={q.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 text-xs text-gray-400">{i + 1}</td>
                    <td className="px-4 py-3 max-w-xs">
                      <p className="text-sm text-gray-800 truncate">{q.content}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{q.choices} đáp án</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${q.type === "HSA" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`}>
                        {q.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-xs text-gray-700">{q.subject}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-xs text-gray-500">{q.topic}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${difficultyColors[q.difficulty]}`}>{q.difficulty}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-36 text-sm">
                          <DropdownMenuItem><Eye className="w-3.5 h-3.5 mr-2" /> Xem</DropdownMenuItem>
                          <DropdownMenuItem><Pencil className="w-3.5 h-3.5 mr-2" /> Sửa</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive"><Trash2 className="w-3.5 h-3.5 mr-2" /> Xoá</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-400">{filtered.length} câu hỏi</p>
          <div className="flex gap-1">
            <button className="px-2.5 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50 text-gray-600 disabled:opacity-40" disabled>Trước</button>
            <button className="px-2.5 py-1 text-xs bg-brand-orange text-white rounded">1</button>
            <button className="px-2.5 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50 text-gray-600">Sau</button>
          </div>
        </div>
      </Card>
    </div>
  );
}

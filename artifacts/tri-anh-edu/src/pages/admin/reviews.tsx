import { useState } from "react";
import { Search, Eye, EyeOff, CheckCircle, Trash2, Star, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const mockReviews = [
  { id: 1, user: "Nguyễn Thị Mai", initials: "NM", course: "Toán HSA Nâng Cao", rating: 5, comment: "Khóa học rất hay, giáo viên giảng dễ hiểu!", date: "10/06/2025", status: "approved" },
  { id: 2, user: "Trần Văn Hùng", initials: "TH", course: "TSA Full Course", rating: 4, comment: "Nội dung phong phú, cần thêm bài tập thực hành.", date: "08/06/2025", status: "pending" },
  { id: 3, user: "Lê Thị Thu", initials: "LT", course: "Ngữ Văn HSA", rating: 5, comment: "Cô giảng bài rất tâm huyết, học xong thấy tự tin hơn.", date: "07/06/2025", status: "approved" },
  { id: 4, user: "Phạm Minh Đức", initials: "PD", course: "Toán HSA Nâng Cao", rating: 2, comment: "Nội dung hơi khó, cần giải thích thêm phần đại số.", date: "05/06/2025", status: "hidden" },
  { id: 5, user: "Hoàng Thị Lan", initials: "HL", course: "Khoa Học Tự Nhiên HSA", rating: 5, comment: "Xuất sắc! Đã giúp mình đạt 120/150 trong kỳ thi.", date: "04/06/2025", status: "approved" },
  { id: 6, user: "Vũ Quang Minh", initials: "VM", course: "TSA Full Course", rating: 4, comment: "Hài lòng với chất lượng khóa học. Sẽ giới thiệu cho bạn bè.", date: "02/06/2025", status: "approved" },
  { id: 7, user: "Đỗ Thị Hằng", initials: "DH", course: "Ngữ Văn HSA", rating: 3, comment: "Ổn nhưng mong có thêm đề thi thử.", date: "01/06/2025", status: "pending" },
];

const statusMap: Record<string, { label: string; class: string }> = {
  approved: { label: "Đã duyệt", class: "bg-green-100 text-green-700" },
  pending: { label: "Chờ duyệt", class: "bg-yellow-100 text-yellow-700" },
  hidden: { label: "Đã ẩn", class: "bg-gray-100 text-gray-500" },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
        />
      ))}
    </div>
  );
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState(mockReviews);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  const filtered = reviews.filter((r) => {
    const matchSearch =
      r.user.toLowerCase().includes(search.toLowerCase()) ||
      r.course.toLowerCase().includes(search.toLowerCase()) ||
      r.comment.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleApprove = (id: number) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: "approved" } : r)));
    toast({ title: "Đã duyệt đánh giá" });
  };

  const handleHide = (id: number) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: r.status === "hidden" ? "approved" : "hidden" } : r)));
    toast({ title: "Đã cập nhật trạng thái đánh giá" });
  };

  const handleDelete = (id: number) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    toast({ title: "Đã xoá đánh giá" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <Input placeholder="Tìm đánh giá..." className="pl-8 h-9 text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-1 bg-gray-100 p-0.5 rounded-lg">
          {[
            { key: "all", label: "Tất cả" },
            { key: "pending", label: "Chờ duyệt" },
            { key: "approved", label: "Đã duyệt" },
            { key: "hidden", label: "Đã ẩn" },
          ].map((f) => (
            <button key={f.key} onClick={() => setStatusFilter(f.key)} className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${statusFilter === f.key ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <Card className="bg-white border-0 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-50">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <Star className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Không tìm thấy đánh giá</p>
            </div>
          ) : (
            filtered.map((review) => {
              const s = statusMap[review.status];
              return (
                <div key={review.id} className="px-5 py-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary-orange flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {review.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-900">{review.user}</p>
                          <span className="text-gray-300">·</span>
                          <p className="text-xs text-gray-500 truncate max-w-[180px]">{review.course}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.class}`}>{s.label}</span>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400">
                                <MoreHorizontal className="w-3.5 h-3.5" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40 text-sm">
                              {review.status === "pending" && (
                                <DropdownMenuItem onClick={() => handleApprove(review.id)}>
                                  <CheckCircle className="w-3.5 h-3.5 mr-2 text-green-600" /> Duyệt
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => handleHide(review.id)}>
                                {review.status === "hidden"
                                  ? <><Eye className="w-3.5 h-3.5 mr-2" /> Hiện lại</>
                                  : <><EyeOff className="w-3.5 h-3.5 mr-2" /> Ẩn</>}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(review.id)}>
                                <Trash2 className="w-3.5 h-3.5 mr-2" /> Xoá
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <StarRating rating={review.rating} />
                        <span className="text-xs text-gray-400">{review.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{review.comment}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="px-4 py-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">{filtered.length} đánh giá</p>
        </div>
      </Card>
    </div>
  );
}

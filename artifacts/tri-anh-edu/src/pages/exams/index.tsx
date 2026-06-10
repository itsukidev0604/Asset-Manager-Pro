import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, Users, FileText, Search, Lock, Unlock, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useListExams, getListExamsQueryKey } from "@workspace/api-client-react";

const DIFFICULTIES = ["Tất cả", "Dễ", "Trung bình", "Khó"];
const TYPES = [{ label: "Tất cả", value: undefined }, { label: "HSA", value: "HSA" }, { label: "TSA", value: "TSA" }];

export default function Exams() {
  const [type, setType] = useState<string | undefined>(undefined);
  const [difficulty, setDifficulty] = useState("Tất cả");
  const [search, setSearch] = useState("");

  const { data: exams, isLoading } = useListExams(
    { ...(type ? { type } : {}), ...(difficulty !== "Tất cả" ? { difficulty } : {}) },
    { query: { queryKey: getListExamsQueryKey({ type, difficulty: difficulty !== "Tất cả" ? difficulty : undefined }) } }
  );

  const filtered = (exams ?? []).filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FFFBF5] pt-20">
      <div className="bg-[#102A43] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">Thư Viện Đề Thi</h1>
            <p className="text-white/60 text-lg">Luyện đề HSA và TSA với hơn 300 đề thi chất lượng cao</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Tìm kiếm đề thi..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} data-testid="input-search-exams" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <div className="flex gap-2">
            {TYPES.map(opt => (
              <Button key={String(opt.value)} size="sm" variant={type === opt.value ? "default" : "outline"}
                onClick={() => setType(opt.value)}
                className={type === opt.value ? "bg-[#E85A2A] hover:bg-[#d14f23]" : "border-[#E85A2A]/30 text-[#E85A2A] hover:bg-[#E85A2A]/5"}
                data-testid={`filter-type-${opt.label}`}>
                {opt.label}
              </Button>
            ))}
          </div>
          <div className="h-6 w-px bg-border/60 self-center" />
          <div className="flex gap-2">
            {DIFFICULTIES.map(d => (
              <Button key={d} size="sm" variant={difficulty === d ? "default" : "outline"}
                onClick={() => setDifficulty(d)}
                className={difficulty === d ? "bg-[#102A43] hover:bg-[#0d2035]" : "border-border text-muted-foreground hover:text-foreground"}
                data-testid={`filter-difficulty-${d}`}>
                {d}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <div key={i} className="h-48 rounded-xl bg-muted animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((exam, i) => (
              <motion.div key={exam.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} data-testid={`exam-card-${exam.id}`}>
                <Link href={`/exams/${exam.id}`}>
                  <Card className="p-5 hover:shadow-lg transition-all group cursor-pointer border-border/60 hover:border-[#E85A2A]/30">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex gap-2 flex-wrap">
                        <Badge className={exam.type === "HSA" ? "bg-[#E85A2A] text-white" : "bg-[#102A43] text-white"}>{exam.type}</Badge>
                        <Badge variant="outline" className="text-xs">{exam.subject}</Badge>
                      </div>
                      {exam.isFree ? (
                        <Badge className="bg-green-100 text-green-700 border-green-200 gap-1"><Unlock className="w-3 h-3" />Miễn phí</Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-1"><Lock className="w-3 h-3" />Trả phí</Badge>
                      )}
                    </div>
                    <h3 className="font-bold text-[#102A43] text-base mb-1 group-hover:text-[#E85A2A] transition-colors line-clamp-2">{exam.title}</h3>
                    {exam.year && <p className="text-xs text-muted-foreground mb-3">Năm {exam.year}</p>}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" />{exam.questionsCount} câu</div>
                      <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{exam.durationMinutes} phút</div>
                      <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{exam.attemptCount.toLocaleString("vi-VN")}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`text-xs ${exam.difficulty === "Khó" ? "border-red-200 text-red-600" : exam.difficulty === "Trung bình" ? "border-yellow-200 text-yellow-600" : "border-green-200 text-green-600"}`}>
                        {exam.difficulty}
                      </Badge>
                      <span className="text-xs text-[#E85A2A] font-semibold group-hover:underline">Xem chi tiết</span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-20">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-[#102A43] text-lg mb-2">Không tìm thấy đề thi</h3>
            <p className="text-muted-foreground">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        )}
      </div>
    </div>
  );
}

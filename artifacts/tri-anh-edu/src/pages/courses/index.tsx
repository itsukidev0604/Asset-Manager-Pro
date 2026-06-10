import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Star, Users, Clock, BookOpen, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useListCourses } from "@workspace/api-client-react";

export default function Courses() {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState("");
  const { data: courses, isLoading } = useListCourses(category ? { category } : undefined);

  const filtered = (courses ?? []).filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.teacherName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FFFBF5] pt-20">
      <div className="bg-[#102A43] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">Khóa Học</h1>
            <p className="text-white/60 text-lg">Chọn khóa học phù hợp để bắt đầu hành trình chinh phục HSA & TSA</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Tìm kiếm khóa học..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} data-testid="input-search-courses" />
          </div>
          <div className="flex gap-2">
            {[{ label: "Tất cả", value: undefined }, { label: "HSA", value: "HSA" }, { label: "TSA", value: "TSA" }].map(opt => (
              <Button key={String(opt.value)} variant={category === opt.value ? "default" : "outline"} size="sm" onClick={() => setCategory(opt.value)}
                className={category === opt.value ? "bg-[#E85A2A] hover:bg-[#d14f23]" : "border-[#E85A2A]/30 text-[#E85A2A] hover:bg-[#E85A2A]/5"}
                data-testid={`filter-category-${opt.label}`}>
                {opt.label}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <div key={i} className="h-64 rounded-xl bg-muted animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course, i) => (
              <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} data-testid={`course-card-${course.id}`}>
                <Link href={`/courses/${course.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all group cursor-pointer border-border/60 hover:border-[#E85A2A]/30">
                    <div className="aspect-video overflow-hidden bg-muted relative">
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-3 left-3">
                        <Badge className={course.category === "HSA" ? "bg-[#E85A2A] text-white" : "bg-[#102A43] text-white"}>{course.category}</Badge>
                      </div>
                      {course.originalPrice && (
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-[#F2C230] text-[#102A43] font-bold">-{Math.round((1 - course.price / course.originalPrice) * 100)}%</Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-[#102A43] text-base mb-2 line-clamp-2 group-hover:text-[#E85A2A] transition-colors">{course.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <img src={course.teacherAvatar} alt={course.teacherName} className="w-6 h-6 rounded-full" />
                        <span className="text-xs text-muted-foreground">{course.teacherName}</span>
                      </div>
                      <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-[#F2C230] fill-[#F2C230]" /><span className="font-semibold text-[#1F2937]">{course.rating.toFixed(1)}</span></div>
                        <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /><span>{course.studentsCount.toLocaleString("vi-VN")}</span></div>
                        {course.lessonsCount && <div className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /><span>{course.lessonsCount} bài</span></div>}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-[#E85A2A]">{(course.price / 1000).toFixed(0)}k</span>
                          {course.originalPrice && <span className="text-xs text-muted-foreground line-through ml-2">{(course.originalPrice / 1000).toFixed(0)}k</span>}
                        </div>
                        <Badge variant="secondary" className="text-xs">{course.level}</Badge>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-[#102A43] text-lg mb-2">Không tìm thấy khóa học</h3>
            <p className="text-muted-foreground">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
          </div>
        )}
      </div>
    </div>
  );
}

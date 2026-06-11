import { useState } from "react";
import { FileText, ChevronRight, ChevronDown, Video, BookOpen, HelpCircle, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useListCourses } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";

const mockChapters: Record<number, { id: number; title: string; lessons: { id: number; title: string; type: "video" | "text" | "quiz"; duration: number }[] }[]> = {
  1: [
    { id: 1, title: "Chương 1: Đại số cơ bản", lessons: [
      { id: 1, title: "Bài 1: Số thực và các phép tính", type: "video", duration: 45 },
      { id: 2, title: "Bài 2: Hàm số bậc nhất", type: "video", duration: 60 },
      { id: 3, title: "Kiểm tra chương 1", type: "quiz", duration: 30 },
    ]},
    { id: 2, title: "Chương 2: Giải tích", lessons: [
      { id: 4, title: "Bài 1: Giới hạn hàm số", type: "video", duration: 55 },
      { id: 5, title: "Bài 2: Đạo hàm và vi phân", type: "text", duration: 40 },
    ]},
  ],
};

const typeConfig = {
  video: { icon: Video, label: "Video", class: "bg-blue-100 text-blue-700" },
  text: { icon: BookOpen, label: "Bài đọc", class: "bg-green-100 text-green-700" },
  quiz: { icon: HelpCircle, label: "Bài kiểm tra", class: "bg-purple-100 text-purple-700" },
};

export default function AdminLessons() {
  const { data: courses, isLoading } = useListCourses();
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set([1]));

  const toggleChapter = (id: number) => {
    setExpandedChapters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const chapters = selectedCourse ? (mockChapters[selectedCourse] ?? mockChapters[1]) : null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-4 bg-white border-0 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Chọn khóa học</p>
          {isLoading ? (
            <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-9 rounded-lg" />)}</div>
          ) : (
            <div className="space-y-1">
              {(courses ?? []).map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCourse(c.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all ${
                    selectedCourse === c.id
                      ? "bg-orange-50 border border-orange-200 text-brand-orange"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${c.type === "HSA" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`}>{c.type}</span>
                  <p className="text-xs font-medium truncate">{c.title}</p>
                </button>
              ))}
            </div>
          )}
        </Card>

        <div className="lg:col-span-2">
          {!selectedCourse ? (
            <Card className="p-12 bg-white border-0 shadow-sm flex flex-col items-center justify-center text-center">
              <FileText className="w-10 h-10 text-gray-200 mb-3" />
              <p className="text-sm font-medium text-gray-400">Chọn một khóa học để xem cấu trúc bài học</p>
            </Card>
          ) : (
            <Card className="bg-white border-0 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-800">Cấu trúc bài học</p>
                <Button size="sm" className="bg-brand-orange hover:bg-brand-orange/90 text-white h-8 text-xs gap-1">
                  <Plus className="w-3.5 h-3.5" /> Thêm chương
                </Button>
              </div>
              <div className="divide-y divide-gray-50">
                {(chapters ?? []).map((chapter) => {
                  const isExpanded = expandedChapters.has(chapter.id);
                  return (
                    <div key={chapter.id}>
                      <button
                        onClick={() => toggleChapter(chapter.id)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                        <p className="text-sm font-semibold text-gray-800 flex-1 text-left">{chapter.title}</p>
                        <span className="text-xs text-gray-400">{chapter.lessons.length} bài</span>
                      </button>
                      {isExpanded && (
                        <div className="bg-gray-50/50 divide-y divide-gray-100">
                          {chapter.lessons.map((lesson) => {
                            const tc = typeConfig[lesson.type];
                            const Icon = tc.icon;
                            return (
                              <div key={lesson.id} className="flex items-center gap-3 pl-10 pr-4 py-2.5 hover:bg-gray-50 transition-colors">
                                <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${tc.class}`}>
                                  <Icon className="w-3 h-3" /> {tc.label}
                                </div>
                                <p className="text-sm text-gray-700 flex-1">{lesson.title}</p>
                                <span className="text-xs text-gray-400">{lesson.duration} phút</span>
                              </div>
                            );
                          })}
                          <div className="pl-10 pr-4 py-2">
                            <button className="flex items-center gap-1.5 text-xs text-primary-orange hover:text-brand-orange transition-colors">
                              <Plus className="w-3.5 h-3.5" /> Thêm bài học
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

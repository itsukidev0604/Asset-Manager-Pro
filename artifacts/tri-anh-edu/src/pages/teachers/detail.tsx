import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Star, Users, BookOpen, ArrowLeft, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useGetTeacher, getGetTeacherQueryKey } from "@workspace/api-client-react";

export default function TeacherDetail() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id ?? "0", 10);
  const { data: teacher, isLoading } = useGetTeacher(id, { query: { enabled: !!id, queryKey: getGetTeacherQueryKey(id) } });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFBF5] pt-20">
        <div className="max-w-4xl mx-auto px-4 py-12 animate-pulse space-y-4">
          <div className="h-12 bg-muted rounded-xl w-1/3" />
          <div className="h-64 bg-muted rounded-xl" />
        </div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="min-h-screen bg-[#FFFBF5] pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#102A43] mb-4">Không tìm thấy giáo viên</h2>
          <Link href="/teachers"><Button className="bg-[#E85A2A]">Quay lại</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5] pt-20">
      <div className="bg-[#102A43] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/teachers">
            <Button variant="ghost" className="text-white/70 hover:text-white mb-6 -ml-2" data-testid="button-back-teachers">
              <ArrowLeft className="w-4 h-4 mr-2" /> Giáo viên
            </Button>
          </Link>
          <div className="flex flex-col sm:flex-row items-start gap-8">
            <img src={teacher.avatar} alt={teacher.name} className="w-28 h-28 rounded-2xl border-4 border-white/20 shadow-xl flex-shrink-0" />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{teacher.name}</h1>
              <p className="text-[#F7941D] font-semibold mb-4">{teacher.specialization}</p>
              <div className="flex flex-wrap gap-5 text-sm text-white/60">
                <div className="flex items-center gap-2"><Star className="w-4 h-4 text-[#F2C230] fill-[#F2C230]" /><span className="font-bold text-white">{teacher.rating?.toFixed(1)}</span><span>đánh giá</span></div>
                <div className="flex items-center gap-2"><Users className="w-4 h-4 text-[#F7941D]" /><span className="text-white font-semibold">{teacher.studentsCount.toLocaleString("vi-VN")}</span><span>học viên</span></div>
                <div className="flex items-center gap-2"><Award className="w-4 h-4 text-[#F7941D]" /><span className="text-white font-semibold">{teacher.experienceYears}</span><span>năm kinh nghiệm</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-6 border-border/60">
            <h2 className="text-xl font-bold text-[#102A43] mb-4">Giới thiệu</h2>
            <p className="text-muted-foreground leading-relaxed">{teacher.bio}</p>
          </Card>

          {teacher.courses.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-[#102A43] mb-5">Khóa học của {teacher.name.split(" ").slice(-1)[0]}</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {teacher.courses.map(course => (
                  <Link key={course.id} href={`/courses/${course.id}`} data-testid={`teacher-course-${course.id}`}>
                    <Card className="overflow-hidden hover:shadow-md transition-all group cursor-pointer border-border/60 hover:border-[#E85A2A]/30">
                      <div className="aspect-video overflow-hidden">
                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="p-4">
                        <Badge className={`mb-2 text-xs ${course.category === "HSA" ? "bg-[#E85A2A] text-white" : "bg-[#102A43] text-white"}`}>{course.category}</Badge>
                        <h3 className="font-bold text-[#102A43] text-sm line-clamp-2 mb-2 group-hover:text-[#E85A2A] transition-colors">{course.title}</h3>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1"><Star className="w-3 h-3 text-[#F2C230] fill-[#F2C230]" />{course.rating.toFixed(1)}</div>
                          <span className="font-bold text-[#E85A2A]">{(course.price / 1000).toFixed(0)}k</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <Card className="p-6 sticky top-24 border-border/60">
            <h3 className="font-bold text-[#102A43] mb-4">Thống kê</h3>
            <div className="space-y-4">
              {[
                { label: "Đánh giá trung bình", value: `${teacher.rating?.toFixed(1)} / 5.0`, icon: Star },
                { label: "Tổng học viên", value: teacher.studentsCount.toLocaleString("vi-VN"), icon: Users },
                { label: "Năm kinh nghiệm", value: `${teacher.experienceYears} năm`, icon: Award },
                { label: "Khóa học", value: `${teacher.courses.length} khóa`, icon: BookOpen },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <item.icon className="w-4 h-4 text-[#E85A2A]" />
                    {item.label}
                  </div>
                  <span className="font-semibold text-[#102A43] text-sm">{item.value}</span>
                </div>
              ))}
            </div>
            <Button className="w-full mt-6 bg-[#E85A2A] hover:bg-[#d14f23] text-white font-semibold" data-testid="button-view-courses">
              Xem khóa học
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

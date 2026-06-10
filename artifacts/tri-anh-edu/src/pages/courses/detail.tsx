import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Star, Users, Clock, BookOpen, CheckCircle, ArrowLeft, Play, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useGetCourse, getGetCourseQueryKey } from "@workspace/api-client-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function CourseDetail() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id ?? "0", 10);
  const { data: course, isLoading } = useGetCourse(id, { query: { enabled: !!id, queryKey: getGetCourseQueryKey(id) } });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFBF5] pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="h-96 rounded-xl bg-muted animate-pulse" />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#FFFBF5] pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#102A43] mb-4">Không tìm thấy khóa học</h2>
          <Link href="/courses"><Button className="bg-[#E85A2A]">Quay lại</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5] pt-20">
      <div className="bg-[#102A43] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/courses">
            <Button variant="ghost" className="text-white/70 hover:text-white mb-6 -ml-2" data-testid="button-back-courses">
              <ArrowLeft className="w-4 h-4 mr-2" /> Khóa học
            </Button>
          </Link>
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2">
              <Badge className={`mb-3 ${course.category === "HSA" ? "bg-[#E85A2A]" : "bg-[#F7941D]"} text-white`}>{course.category}</Badge>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">{course.title}</h1>
              <p className="text-white/70 text-base mb-6 leading-relaxed">{course.description}</p>
              <div className="flex flex-wrap items-center gap-5 text-sm text-white/60">
                <div className="flex items-center gap-1.5"><Star className="w-4 h-4 text-[#F2C230] fill-[#F2C230]" /><span className="font-bold text-white">{course.rating.toFixed(1)}</span></div>
                <div className="flex items-center gap-1.5"><Users className="w-4 h-4" />{course.studentsCount.toLocaleString("vi-VN")} học viên</div>
                {course.lessonsCount && <div className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" />{course.lessonsCount} bài học</div>}
                {course.durationHours && <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{course.durationHours} giờ</div>}
                <div className="flex items-center gap-1.5"><img src={course.teacherAvatar} alt="" className="w-5 h-5 rounded-full" />{course.teacherName}</div>
              </div>
            </div>
            <div className="lg:row-start-1">
              <Card className="overflow-hidden shadow-2xl">
                <div className="aspect-video overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-[#E85A2A] ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-3xl font-bold text-[#E85A2A]">{(course.price / 1000).toFixed(0)}k</span>
                    {course.originalPrice && <span className="text-lg text-muted-foreground line-through">{(course.originalPrice / 1000).toFixed(0)}k</span>}
                    {course.originalPrice && <Badge className="bg-[#F2C230] text-[#102A43]">-{Math.round((1 - course.price / course.originalPrice) * 100)}%</Badge>}
                  </div>
                  <Button className="w-full bg-[#E85A2A] hover:bg-[#d14f23] text-white font-bold text-base py-6 mb-3" data-testid="button-enroll">
                    Đăng ký ngay
                  </Button>
                  <Button variant="outline" className="w-full border-[#E85A2A]/30 text-[#E85A2A]" data-testid="button-try-course">
                    Học thử miễn phí
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-3">Hoàn tiền 100% trong 7 ngày nếu không hài lòng</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {course.whatYouLearn.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-[#102A43] mb-5">Bạn sẽ học được gì?</h2>
              <Card className="p-6">
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.whatYouLearn.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-[#E85A2A] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#1F2937]">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {course.curriculum.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-[#102A43] mb-5">Nội dung khóa học</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {course.curriculum.map((section, i) => (
                  <AccordionItem key={i} value={`section-${i}`} className="border border-border/60 rounded-xl overflow-hidden" data-testid={`curriculum-section-${i}`}>
                    <AccordionTrigger className="px-5 py-4 hover:no-underline font-semibold text-[#102A43]">
                      {section.title}
                      <Badge variant="secondary" className="ml-auto mr-3 text-xs">{section.lessons.length} bài</Badge>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-4">
                      <ul className="space-y-2">
                        {section.lessons.map((lesson, j) => (
                          <li key={j} className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Play className="w-3.5 h-3.5 text-[#E85A2A]" />
                            {lesson}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>

        <div>
          <Card className="p-6 sticky top-24">
            <div className="flex items-center gap-4 mb-5">
              <img src={course.teacherAvatar} alt={course.teacherName} className="w-16 h-16 rounded-full border-2 border-[#E85A2A]/20" />
              <div>
                <h3 className="font-bold text-[#102A43]">{course.teacherName}</h3>
                <p className="text-xs text-muted-foreground">Giáo viên khóa học</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Trình độ</span>
                <Badge variant="secondary">{course.level}</Badge>
              </div>
              {course.lessonsCount && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Bài học</span>
                  <span className="font-semibold text-[#102A43]">{course.lessonsCount} bài</span>
                </div>
              )}
              {course.durationHours && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Thời lượng</span>
                  <span className="font-semibold text-[#102A43]">{course.durationHours} giờ</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Đánh giá</span>
                <div className="flex items-center gap-1"><Star className="w-4 h-4 text-[#F2C230] fill-[#F2C230]" /><span className="font-bold">{course.rating.toFixed(1)}</span></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

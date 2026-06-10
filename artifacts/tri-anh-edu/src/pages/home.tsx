import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { ArrowRight, BookOpen, BarChart3, Clock, CheckCircle, Star, Users, FileText, TrendingUp, Award, Target, Zap, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useGetStats, useListCourses, useListExams, useListTeachers, useListTestimonials, useListBlogPosts } from "@workspace/api-client-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3 }}
      data-testid="stat-counter"
    >
      {inView ? value.toLocaleString("vi-VN") : "0"}{suffix}
    </motion.span>
  );
}

function SectionTitle({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <h2 className="text-4xl lg:text-5xl font-bold text-[#102A43] mb-4">{children}</h2>
      {subtitle && <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
    </motion.div>
  );
}

export default function Home() {
  const { data: stats } = useGetStats();
  const { data: courses } = useListCourses({ limit: 6 });
  const { data: exams } = useListExams({ limit: 8 });
  const { data: teachers } = useListTeachers();
  const { data: testimonials } = useListTestimonials();
  const { data: blogPosts } = useListBlogPosts({ limit: 3 });

  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);

  const features = [
    { icon: Target, title: "Lộ trình cá nhân hóa", desc: "Chương trình học được thiết kế riêng theo điểm mạnh và điểm yếu của từng học sinh." },
    { icon: TrendingUp, title: "Học tập theo tiến độ", desc: "Theo dõi tiến độ học tập chi tiết, biết rõ mình đang ở đâu trong hành trình chinh phục HSA/TSA." },
    { icon: BookOpen, title: "Kho đề HSA", desc: "Hơn 200 đề thi HSA từ năm 2018 đến nay, được phân loại theo chủ đề và độ khó." },
    { icon: FileText, title: "Kho đề TSA", desc: "Bộ sưu tập đầy đủ đề thi TSA Bách Khoa, kèm phân tích chi tiết từng câu hỏi." },
    { icon: Clock, title: "Thi thử như thật", desc: "Môi trường thi thử mô phỏng chính xác điều kiện thi thật với bộ đếm thời gian và giao diện chính thức." },
    { icon: BarChart3, title: "Thống kê chi tiết", desc: "Phân tích sâu kết quả thi, chỉ ra chính xác điểm cần cải thiện để tối đa hóa điểm số." },
  ];

  const examCategories = [
    { type: "HSA", subjects: [
      { name: "Toán học", count: exams?.filter(e => e.type === "HSA" && e.subject === "Toán").length ?? 12 },
      { name: "Ngữ văn", count: exams?.filter(e => e.type === "HSA" && e.subject === "Văn").length ?? 8 },
      { name: "Khoa học", count: exams?.filter(e => e.type === "HSA" && e.subject === "Khoa học").length ?? 15 },
      { name: "Tổng hợp", count: exams?.filter(e => e.type === "HSA" && e.subject === "Tổng hợp").length ?? 6 },
    ]},
    { type: "TSA", subjects: [
      { name: "Toán học", count: exams?.filter(e => e.type === "TSA" && e.subject === "Toán").length ?? 10 },
      { name: "Đọc hiểu", count: exams?.filter(e => e.type === "TSA" && e.subject === "Đọc hiểu").length ?? 9 },
      { name: "Tư duy", count: exams?.filter(e => e.type === "TSA" && e.subject.includes("Tư duy")).length ?? 7 },
      { name: "Tổng hợp", count: exams?.filter(e => e.type === "TSA" && e.subject === "Tổng hợp").length ?? 5 },
    ]},
  ];

  return (
    <div className="w-full">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-[#FFFBF5]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-[#F7941D]/10 to-transparent" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#102A43]/5 to-transparent" />
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-[#E85A2A]/10"
              style={{ width: `${(i + 1) * 120}px`, height: `${(i + 1) * 120}px`, top: "10%", right: "5%", opacity: 0.4 - i * 0.05 }} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center relative">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 bg-[#E85A2A]/10 text-[#E85A2A] rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              <Award className="w-4 h-4" />
              Nền tảng HSA & TSA hàng đầu Việt Nam
            </div>
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-[#102A43] leading-[1.1] mb-6">
              Chinh Phục{" "}
              <span className="text-[#E85A2A]">HSA &amp; TSA</span>{" "}
              Với Lộ Trình Thông Minh
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
              Học lý thuyết, luyện đề, thi thử và theo dõi tiến độ trên một nền tảng duy nhất.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/courses">
                <Button size="lg" className="bg-[#E85A2A] hover:bg-[#d14f23] text-white font-semibold px-7 py-6 text-base shadow-lg shadow-[#E85A2A]/25" data-testid="button-start-learning">
                  Bắt đầu học ngay
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/exams">
                <Button size="lg" variant="outline" className="border-[#102A43]/20 text-[#102A43] px-7 py-6 text-base font-semibold hover:bg-[#102A43]/5" data-testid="button-explore-exams">
                  Khám phá đề thi
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-8">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-[#102A43] to-[#1a3a5e] border-2 border-white flex items-center justify-center text-white text-xs font-bold">{i}</div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground"><span className="font-semibold text-[#102A43]">5.000+</span> học sinh đã tin tưởng</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-[520px] mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#102A43] to-[#1a3a5e] overflow-hidden shadow-2xl">
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="text-white/80 text-sm font-medium">Bài thi HSA - 2024</div>
                    <div className="flex items-center gap-2 bg-[#E85A2A] rounded-full px-3 py-1">
                      <Clock className="w-3.5 h-3.5 text-white" />
                      <span className="text-white text-xs font-semibold">42:30</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-white/60 text-xs font-medium">Câu 23/120</div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <p className="text-white text-sm font-medium leading-relaxed">
                        Tìm tập xác định của hàm số y = √(x² - 4)
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {["A. (-2; 2)", "B. [-2; 2]", "C. (-∞;-2]∪[2;+∞)", "D. R"].map((opt, i) => (
                        <div key={i} className={`rounded-lg px-3 py-2 text-xs font-medium transition-all ${i === 2 ? "bg-[#E85A2A] text-white" : "bg-white/10 text-white/80 hover:bg-white/20"}`}>
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-white/60 text-xs mb-2">
                      <span>Tiến độ</span>
                      <span>23/120</span>
                    </div>
                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#E85A2A] to-[#F7941D] rounded-full" style={{ width: "19%" }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F2C230]/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-[#F2C230]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#102A43]">Điểm: 108/150</div>
                    <div className="text-xs text-[#E85A2A] font-medium">+30 điểm so với lần trước</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-border">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-[#E85A2A] to-[#F7941D] border border-white" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#102A43]">+142 học sinh hôm nay</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST METRICS */}
      <section className="py-16 bg-white border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Học viên tin tưởng", value: stats?.students ?? 5000, suffix: "+", icon: Users, color: "#E85A2A" },
              { label: "Đề thi chất lượng", value: stats?.exams ?? 300, suffix: "+", icon: FileText, color: "#102A43" },
              { label: "Câu hỏi luyện tập", value: stats?.questions ?? 10000, suffix: "+", icon: BookOpen, color: "#F7941D" },
              { label: "Học viên hài lòng", value: stats?.satisfactionRate ?? 95, suffix: "%", icon: Star, color: "#F2C230" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
                data-testid={`stat-card-${i}`}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3" style={{ backgroundColor: `${item.color}15` }}>
                  <item.icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-[#102A43] mb-1">
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                </div>
                <p className="text-sm text-muted-foreground font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY TRI ANH EDU */}
      <section className="py-20 bg-[#FFFBF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Chúng tôi không chỉ dạy kiến thức — chúng tôi xây dựng con đường chinh phục kỳ thi tốt nhất cho bạn.">
            Tại Sao Chọn TRI ANH EDU?
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                data-testid={`feature-card-${i}`}
              >
                <Card className="p-6 h-full border-border/60 hover:border-[#E85A2A]/30 hover:shadow-md transition-all group">
                  <div className="w-11 h-11 rounded-xl bg-[#E85A2A]/10 flex items-center justify-center mb-4 group-hover:bg-[#E85A2A] transition-colors">
                    <f.icon className="w-5 h-5 text-[#E85A2A] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-[#102A43] text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HSA & TSA PROGRAMS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Hai chương trình luyện thi chuyên biệt được xây dựng theo đúng cấu trúc đề thi chính thức.">
            Chương Trình HSA &amp; TSA
          </SectionTitle>
          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                type: "HSA",
                fullName: "Đánh giá năng lực ĐHQGHN",
                color: "#E85A2A",
                bgColor: "#102A43",
                items: ["Tổng quan kỳ thi HSA", "Tư duy định lượng (Toán)", "Tư duy định tính (Văn)", "Khoa học tự nhiên & xã hội", "Thi thử chính thức"],
                stats: [{ label: "Đề thi", value: "200+" }, { label: "Câu hỏi", value: "6.000+" }, { label: "Thời gian", value: "150 phút" }],
              },
              {
                type: "TSA",
                fullName: "Đánh giá tư duy Bách Khoa HN",
                color: "#F7941D",
                bgColor: "#1a3a5e",
                items: ["Tư duy toán học", "Tư duy đọc hiểu", "Giải quyết vấn đề", "Phân tích dữ liệu", "Thi thử chính thức"],
                stats: [{ label: "Đề thi", value: "120+" }, { label: "Câu hỏi", value: "4.000+" }, { label: "Thời gian", value: "90 phút" }],
              },
            ].map((prog, i) => (
              <motion.div
                key={prog.type}
                initial={{ opacity: 0, x: i === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden shadow-lg border border-border/50"
                data-testid={`program-card-${prog.type}`}
              >
                <div className="p-7 text-white" style={{ backgroundColor: prog.bgColor }}>
                  <Badge className="mb-3 text-white border-white/30" style={{ backgroundColor: `${prog.color}40` }}>Kỳ thi {prog.type}</Badge>
                  <h3 className="text-2xl font-bold mb-1">Luyện Thi {prog.type}</h3>
                  <p className="text-white/60 text-sm">{prog.fullName}</p>
                  <div className="flex gap-6 mt-5">
                    {prog.stats.map(s => (
                      <div key={s.label}>
                        <div className="font-bold text-lg" style={{ color: prog.color }}>{s.value}</div>
                        <div className="text-white/60 text-xs">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-7 bg-white">
                  <ul className="space-y-3 mb-6">
                    {prog.items.map(item => (
                      <li key={item} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: prog.color }} />
                        <span className="text-sm font-medium text-[#1F2937]">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/exams?type=${prog.type}`}>
                    <Button className="w-full font-semibold" style={{ backgroundColor: prog.color }} data-testid={`button-explore-${prog.type}`}>
                      Khám phá {prog.type}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="py-20 bg-[#FFFBF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-[#102A43] mb-2">Khóa Học Nổi Bật</h2>
              <p className="text-muted-foreground">Được hàng nghìn học sinh lựa chọn để chinh phục kỳ thi</p>
            </div>
            <Link href="/courses">
              <Button variant="outline" className="hidden sm:flex items-center gap-2 border-[#E85A2A]/30 text-[#E85A2A] hover:bg-[#E85A2A]/5" data-testid="button-all-courses">
                Xem tất cả <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(courses ?? []).slice(0, 6).map((course, i) => (
              <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} data-testid={`course-card-${course.id}`}>
                <Link href={`/courses/${course.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all group cursor-pointer border-border/60 hover:border-[#E85A2A]/30">
                    <div className="aspect-video overflow-hidden bg-muted relative">
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-3 left-3">
                        <Badge className={course.category === "HSA" ? "bg-[#E85A2A] text-white" : "bg-[#102A43] text-white"}>{course.category}</Badge>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-[#102A43] text-base mb-2 line-clamp-2 group-hover:text-[#E85A2A] transition-colors">{course.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <img src={course.teacherAvatar} alt={course.teacherName} className="w-6 h-6 rounded-full" />
                        <span className="text-xs text-muted-foreground">{course.teacherName}</span>
                      </div>
                      <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-[#F2C230] fill-[#F2C230]" />
                          <span className="font-semibold text-[#1F2937]">{course.rating.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          <span>{course.studentsCount.toLocaleString("vi-VN")} học viên</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-[#E85A2A]">{(course.price / 1000).toFixed(0)}k</span>
                          {course.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through ml-2">{(course.originalPrice / 1000).toFixed(0)}k</span>
                          )}
                        </div>
                        <Badge variant="secondary" className="text-xs">{course.level}</Badge>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ONLINE EXAM PLATFORM */}
      <section className="py-20 bg-[#102A43]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Badge className="mb-4 bg-[#E85A2A]/20 text-[#F7941D] border-[#F7941D]/30">Nền tảng thi thử trực tuyến</Badge>
              <h2 className="text-4xl font-bold text-white mb-6">Thi Thử Như Kỳ Thi Thật</h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                Trải nghiệm thi thử với giao diện mô phỏng chính xác điều kiện thi thật. Bộ đếm thời gian, giao diện câu hỏi và hệ thống chấm điểm hoàn toàn giống với kỳ thi HSA và TSA.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Thi thử online với thời gian thực",
                  "Tự động chấm điểm ngay sau khi nộp bài",
                  "Xem đáp án và giải thích chi tiết",
                  "Phân tích kết quả theo từng phần thi",
                  "Theo dõi tiến độ qua các lần thi",
                ].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#E85A2A] flex-shrink-0" />
                    <span className="text-white/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/exams">
                <Button size="lg" className="bg-[#E85A2A] hover:bg-[#d14f23] text-white font-semibold" data-testid="button-free-exam">
                  <Play className="w-5 h-5 mr-2" />
                  Làm thử đề miễn phí
                </Button>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="bg-[#0d2035] rounded-2xl p-6 shadow-2xl border border-white/10">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                  <span className="text-white/70 text-sm font-medium">TSA Bách Khoa 2024</span>
                  <div className="flex items-center gap-2 bg-[#E85A2A] rounded-lg px-3 py-1.5">
                    <Clock className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-bold">45:12</span>
                  </div>
                </div>
                <div className="grid grid-cols-10 gap-1 mb-5">
                  {[...Array(30)].map((_, i) => (
                    <div key={i} className={`aspect-square rounded text-xs font-bold flex items-center justify-center cursor-pointer transition-all ${i < 15 ? "bg-[#E85A2A] text-white" : i === 15 ? "bg-[#F2C230] text-[#102A43] ring-2 ring-[#F2C230]/50" : "bg-white/10 text-white/50 hover:bg-white/20"}`}>
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div className="bg-white/5 rounded-xl p-4 mb-4">
                  <div className="text-white/50 text-xs mb-2">Câu 16 / 100</div>
                  <p className="text-white text-sm font-medium mb-4 leading-relaxed">
                    Một chiếc xe di chuyển với vận tốc 60km/h. Sau 2.5 giờ, xe đã đi được bao nhiêu km?
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {["A. 120 km", "B. 140 km", "C. 150 km", "D. 160 km"].map((opt, i) => (
                      <button key={i} className={`rounded-lg px-3 py-2 text-xs font-medium text-left transition-all ${i === 2 ? "bg-[#E85A2A] text-white" : "bg-white/10 text-white/70 hover:bg-white/20"}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between text-white/50 text-xs">
                  <span>Đã trả lời: 15/100</span>
                  <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#E85A2A] to-[#F7941D] rounded-full" style={{ width: "15%" }} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EXAM LIBRARY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Kho đề thi phong phú được cập nhật liên tục với đề thi từ các năm gần nhất.">
            Thư Viện Đề Thi
          </SectionTitle>
          <div className="grid lg:grid-cols-2 gap-8">
            {examCategories.map((cat, ci) => (
              <div key={cat.type} className="rounded-2xl border border-border/60 overflow-hidden">
                <div className={`px-6 py-4 flex items-center justify-between ${cat.type === "HSA" ? "bg-[#E85A2A]" : "bg-[#102A43]"}`}>
                  <h3 className="text-xl font-bold text-white">Kho Đề {cat.type}</h3>
                  <Badge className="bg-white/20 text-white border-0 text-sm">
                    {cat.subjects.reduce((a, s) => a + s.count, 0)} đề thi
                  </Badge>
                </div>
                <div className="p-6 grid grid-cols-2 gap-4">
                  {cat.subjects.map(subject => (
                    <Link key={subject.name} href={`/exams?type=${cat.type}&subject=${subject.name}`}>
                      <div className="group p-4 rounded-xl border border-border/60 hover:border-[#E85A2A]/40 hover:shadow-sm transition-all cursor-pointer" data-testid={`exam-category-${subject.name}`}>
                        <div className="font-semibold text-[#102A43] text-sm mb-1 group-hover:text-[#E85A2A] transition-colors">{subject.name}</div>
                        <div className="text-2xl font-bold text-[#E85A2A]">{subject.count}</div>
                        <div className="text-xs text-muted-foreground">đề thi</div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="px-6 pb-5">
                  <Link href={`/exams?type=${cat.type}`}>
                    <Button variant="outline" className="w-full border-[#E85A2A]/30 text-[#E85A2A] hover:bg-[#E85A2A]/5" data-testid={`button-all-exams-${cat.type}`}>
                      Xem tất cả đề {cat.type}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEACHERS */}
      <section className="py-20 bg-[#FFFBF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Đội ngũ giáo viên giàu kinh nghiệm, tận tâm với từng học sinh.">
            Giáo Viên Hàng Đầu
          </SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(teachers ?? []).slice(0, 4).map((teacher, i) => (
              <motion.div key={teacher.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} data-testid={`teacher-card-${teacher.id}`}>
                <Link href={`/teachers/${teacher.id}`}>
                  <Card className="p-6 text-center hover:shadow-lg transition-all group cursor-pointer border-border/60 hover:border-[#E85A2A]/30">
                    <img src={teacher.avatar} alt={teacher.name} className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-[#E85A2A]/20" />
                    <h3 className="font-bold text-[#102A43] text-base mb-1 group-hover:text-[#E85A2A] transition-colors">{teacher.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{teacher.specialization}</p>
                    <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-[#F2C230] fill-[#F2C230]" />
                        <span className="font-semibold text-[#1F2937]">{teacher.rating?.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{teacher.studentsCount.toLocaleString("vi-VN")}</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
                      {teacher.experienceYears} năm kinh nghiệm
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/teachers">
              <Button variant="outline" className="border-[#E85A2A]/30 text-[#E85A2A] hover:bg-[#E85A2A]/5" data-testid="button-all-teachers">
                Xem tất cả giáo viên <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Kết quả thực tế từ những học sinh đã tin tưởng chọn TRI ANH EDU.">
            Câu Chuyện Thành Công
          </SectionTitle>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {(testimonials ?? []).map(t => (
                <div key={t.id} className="flex-none w-[calc(100%-2rem)] sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)]" data-testid={`testimonial-card-${t.id}`}>
                  <Card className="p-6 h-full border-border/60">
                    <div className="flex items-center gap-3 mb-4">
                      <img src={t.studentAvatar} alt={t.studentName} className="w-12 h-12 rounded-full" />
                      <div>
                        <div className="font-bold text-[#102A43] text-sm">{t.studentName}</div>
                        <div className="text-xs text-muted-foreground">Kỳ thi {t.examType}</div>
                      </div>
                      <div className="ml-auto text-right">
                        <div className="text-2xl font-bold text-[#E85A2A]">{t.score}</div>
                        <div className="text-xs text-green-600 font-semibold flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />+{t.improvement} điểm
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">"{t.testimonialText}"</p>
                    {t.monthsStudied && (
                      <div className="mt-4 pt-3 border-t border-border/50 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        Học {t.monthsStudied} tháng
                      </div>
                    )}
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="py-20 bg-[#FFFBF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-[#102A43] mb-2">Bài Viết Mới Nhất</h2>
              <p className="text-muted-foreground">Kiến thức và kinh nghiệm từ các chuyên gia luyện thi</p>
            </div>
            <Link href="/blog">
              <Button variant="outline" className="hidden sm:flex items-center gap-2 border-[#E85A2A]/30 text-[#E85A2A] hover:bg-[#E85A2A]/5" data-testid="button-all-blog">
                Xem tất cả <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(blogPosts ?? []).map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} data-testid={`blog-card-${post.id}`}>
                <Link href={`/blog/${post.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all group cursor-pointer border-border/60 hover:border-[#E85A2A]/30">
                    <div className="aspect-[16/9] overflow-hidden bg-muted">
                      <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="secondary" className="text-xs bg-[#E85A2A]/10 text-[#E85A2A]">{post.category}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {post.readingTimeMinutes} phút đọc
                        </span>
                      </div>
                      <h3 className="font-bold text-[#102A43] text-base leading-snug group-hover:text-[#E85A2A] transition-colors line-clamp-2">{post.title}</h3>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-gradient-to-br from-[#E85A2A] to-[#F7941D] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-white/10"
              style={{ width: `${(i + 1) * 200}px`, height: `${(i + 1) * 200}px`, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
          ))}
        </div>
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Award className="w-14 h-14 text-white/30 mx-auto mb-6" />
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5">
              Sẵn Sàng Chinh Phục Kỳ Thi?
            </h2>
            <p className="text-white/80 text-lg mb-10 leading-relaxed">
              Gia nhập cộng đồng 5.000+ học sinh đang luyện thi HSA và TSA cùng TRI ANH EDU. Đăng ký ngay hôm nay để nhận lộ trình học tập cá nhân hóa.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-white text-[#E85A2A] hover:bg-white/90 font-bold px-8 py-6 text-base shadow-xl" data-testid="button-cta-register">
                  Đăng ký miễn phí
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 px-8 py-6 text-base font-semibold" data-testid="button-cta-courses">
                  Khám phá khóa học
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

import { motion } from "framer-motion";
import { Link } from "wouter";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, LineChart, Line } from "recharts";
import { TrendingUp, BookOpen, FileText, Award, Clock, ChevronRight, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useListCourses, useListExams } from "@workspace/api-client-react";

const scoreHistory = [
  { week: "T1", hsa: 72, tsa: 68 },
  { week: "T2", hsa: 76, tsa: 71 },
  { week: "T3", hsa: 80, tsa: 74 },
  { week: "T4", hsa: 85, tsa: 79 },
  { week: "T5", hsa: 88, tsa: 82 },
  { week: "T6", hsa: 92, tsa: 86 },
];

const subjectScores = [
  { subject: "Toán", score: 88, fill: "#E85A2A" },
  { subject: "Văn", score: 74, fill: "#102A43" },
  { subject: "Khoa học", score: 82, fill: "#F7941D" },
  { subject: "Tư duy", score: 79, fill: "#F2C230" },
];

const recentExams = [
  { name: "HSA 2024 - Chính thức", score: 108, total: 150, date: "10/06/2025", type: "HSA" },
  { name: "TSA 2024 - Toán tư duy", score: 72, total: 100, date: "08/06/2025", type: "TSA" },
  { name: "HSA 2023 - Đề thi thử", score: 95, total: 150, date: "05/06/2025", type: "HSA" },
];

export default function Dashboard() {
  const { data: courses } = useListCourses({ limit: 3 });
  const { data: exams } = useListExams({ limit: 4 });

  return (
    <div className="min-h-screen bg-[#FFFBF5] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#102A43] mb-1">Xin chào, học viên!</h1>
              <p className="text-muted-foreground">Đây là tổng quan tiến độ học tập của bạn.</p>
            </div>
            <Link href="/exams">
              <Button className="bg-[#E85A2A] hover:bg-[#d14f23] text-white font-semibold hidden sm:flex" data-testid="button-start-exam">
                Làm đề thi <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Đề thi đã làm", value: "12", icon: FileText, color: "#E85A2A", change: "+3 tuần này" },
            { label: "Điểm HSA cao nhất", value: "108", icon: Award, color: "#F2C230", change: "+30 so với đầu" },
            { label: "Điểm TSA cao nhất", value: "86", icon: Target, color: "#102A43", change: "+18 so với đầu" },
            { label: "Giờ học", value: "48h", icon: Clock, color: "#F7941D", change: "tháng này" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card className="p-5 border-border/60" data-testid={`stat-card-${i}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-[#102A43] mb-0.5">{stat.value}</div>
                <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                <div className="text-xs font-medium text-green-600 flex items-center gap-1"><TrendingUp className="w-3 h-3" />{stat.change}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Score Progress Chart */}
          <Card className="p-5 lg:col-span-2 border-border/60">
            <h3 className="font-bold text-[#102A43] mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-[#E85A2A]" />Tiến độ điểm số (6 tuần)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={scoreHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: "#9ca3af" }} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 12, fill: "#9ca3af" }} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "12px" }} />
                <Line type="monotone" dataKey="hsa" stroke="#E85A2A" strokeWidth={2} dot={{ fill: "#E85A2A", r: 4 }} name="HSA" />
                <Line type="monotone" dataKey="tsa" stroke="#102A43" strokeWidth={2} dot={{ fill: "#102A43", r: 4 }} name="TSA" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Subject Scores */}
          <Card className="p-5 border-border/60">
            <h3 className="font-bold text-[#102A43] mb-4">Điểm theo môn</h3>
            <div className="space-y-4">
              {subjectScores.map(s => (
                <div key={s.subject} data-testid={`subject-score-${s.subject}`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-[#1F2937]">{s.subject}</span>
                    <span className="text-sm font-bold" style={{ color: s.fill }}>{s.score}%</span>
                  </div>
                  <Progress value={s.score} className="h-1.5" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Exams */}
          <Card className="p-5 lg:col-span-2 border-border/60">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#102A43]">Đề thi gần đây</h3>
              <Link href="/exams"><span className="text-xs text-[#E85A2A] hover:underline cursor-pointer">Xem tất cả</span></Link>
            </div>
            <div className="space-y-3">
              {recentExams.map((exam, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors" data-testid={`recent-exam-${i}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${exam.type === "HSA" ? "bg-[#E85A2A]/10" : "bg-[#102A43]/10"}`}>
                    <FileText className={`w-5 h-5 ${exam.type === "HSA" ? "text-[#E85A2A]" : "text-[#102A43]"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1F2937] truncate">{exam.name}</p>
                    <p className="text-xs text-muted-foreground">{exam.date}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-bold text-[#E85A2A]">{exam.score}<span className="text-xs text-muted-foreground font-normal">/{exam.total}</span></div>
                    <div className="text-xs text-muted-foreground">{Math.round(exam.score/exam.total*100)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Enrolled Courses */}
          <Card className="p-5 border-border/60">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#102A43]">Khóa học đang học</h3>
              <Link href="/courses"><span className="text-xs text-[#E85A2A] hover:underline cursor-pointer">Xem thêm</span></Link>
            </div>
            <div className="space-y-4">
              {(courses ?? []).slice(0, 3).map((course, i) => (
                <Link key={course.id} href={`/courses/${course.id}`}>
                  <div className="flex gap-3 items-start cursor-pointer hover:opacity-80 transition-opacity" data-testid={`enrolled-course-${course.id}`}>
                    <img src={course.thumbnail} alt="" className="w-16 h-12 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#102A43] line-clamp-2 mb-1">{course.title}</p>
                      <Progress value={[35, 60, 20][i] ?? 40} className="h-1" />
                      <p className="text-xs text-muted-foreground mt-1">{[35, 60, 20][i]}% hoàn thành</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

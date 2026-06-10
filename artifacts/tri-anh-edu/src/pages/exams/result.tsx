import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, CheckCircle, XCircle, RotateCcw, Home, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useGetExam, getGetExamQueryKey } from "@workspace/api-client-react";

export default function ExamResult() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id ?? "0", 10);
  const { data: exam } = useGetExam(id, { query: { enabled: !!id, queryKey: getGetExamQueryKey(id) } });

  const score = 78;
  const total = exam?.questionsCount ?? 100;
  const correct = Math.round(total * score / 100);
  const wrong = total - correct;
  const percentage = score;
  const grade = percentage >= 80 ? "Xuất sắc" : percentage >= 65 ? "Tốt" : percentage >= 50 ? "Trung bình" : "Cần cải thiện";
  const gradeColor = percentage >= 80 ? "text-green-600" : percentage >= 65 ? "text-[#E85A2A]" : percentage >= 50 ? "text-yellow-600" : "text-red-600";

  const sections = [
    { name: "Tư duy định lượng", correct: Math.round(correct * 0.4), total: Math.round(total * 0.4), color: "#E85A2A" },
    { name: "Tư duy định tính", correct: Math.round(correct * 0.3), total: Math.round(total * 0.3), color: "#102A43" },
    { name: "Khoa học", correct: Math.round(correct * 0.3), total: Math.round(total * 0.3), color: "#F7941D" },
  ];

  return (
    <div className="min-h-screen bg-[#FFFBF5] pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#F2C230] to-[#F7941D] mb-5 shadow-lg">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-[#102A43] mb-2">Kết Quả Thi</h1>
          <p className="text-muted-foreground">{exam?.title}</p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5 mb-8">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
            <Card className="p-6 text-center border-border/60" data-testid="result-score-card">
              <div className="text-5xl font-bold text-[#E85A2A] mb-2">{score}<span className="text-2xl text-muted-foreground">/100</span></div>
              <p className="text-sm text-muted-foreground mb-1">Điểm số</p>
              <Badge className={`${percentage >= 80 ? "bg-green-100 text-green-700" : percentage >= 65 ? "bg-orange-100 text-orange-700" : "bg-yellow-100 text-yellow-700"}`}>{grade}</Badge>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}>
            <Card className="p-6 text-center border-border/60">
              <div className="text-5xl font-bold text-green-600 mb-2">{correct}</div>
              <p className="text-sm text-muted-foreground">Câu đúng</p>
              <div className="flex items-center justify-center gap-1 mt-1"><CheckCircle className="w-4 h-4 text-green-500" /><span className="text-sm font-medium text-green-600">{Math.round(correct/total*100)}%</span></div>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
            <Card className="p-6 text-center border-border/60">
              <div className="text-5xl font-bold text-red-500 mb-2">{wrong}</div>
              <p className="text-sm text-muted-foreground">Câu sai</p>
              <div className="flex items-center justify-center gap-1 mt-1"><XCircle className="w-4 h-4 text-red-400" /><span className="text-sm font-medium text-red-500">{Math.round(wrong/total*100)}%</span></div>
            </Card>
          </motion.div>
        </div>

        <Card className="p-6 border-border/60 mb-6">
          <h2 className="font-bold text-[#102A43] text-lg mb-5 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-[#E85A2A]" />Phân tích theo phần thi</h2>
          <div className="space-y-5">
            {sections.map(sec => (
              <div key={sec.name} data-testid={`section-result-${sec.name}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#1F2937]">{sec.name}</span>
                  <span className="text-sm font-bold" style={{ color: sec.color }}>{sec.correct}/{sec.total}</span>
                </div>
                <Progress value={(sec.correct / sec.total) * 100} className="h-2" />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-muted-foreground">{Math.round(sec.correct/sec.total*100)}% đúng</span>
                  <span className="text-xs text-muted-foreground">{sec.total - sec.correct} câu sai</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-border/60 bg-[#FFFBF5] mb-8">
          <h3 className="font-bold text-[#102A43] mb-3 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-[#E85A2A]" />Nhận xét và đề xuất</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {percentage >= 80 
              ? "Xuất sắc! Bạn đã nắm vững kiến thức. Tiếp tục duy trì phong độ và làm thêm đề thi khó hơn để chuẩn bị tốt nhất."
              : percentage >= 65
              ? "Kết quả tốt! Bạn cần chú ý hơn vào phần điểm thấp nhất. Hãy xem lại các câu sai và ôn luyện thêm."
              : "Bạn cần ôn tập thêm. Hãy xem lại kiến thức cơ bản và luyện thêm đề thi ở mức độ dễ hơn trước."}
          </p>
        </Card>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link href={`/exams/${id}/take`}>
            <Button variant="outline" className="border-[#E85A2A]/30 text-[#E85A2A] hover:bg-[#E85A2A]/5" data-testid="button-retry-exam">
              <RotateCcw className="w-4 h-4 mr-2" /> Làm lại
            </Button>
          </Link>
          <Link href="/exams">
            <Button className="bg-[#E85A2A] hover:bg-[#d14f23] text-white" data-testid="button-more-exams">
              Đề thi khác
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="border-[#102A43]/20 text-[#102A43]" data-testid="button-dashboard">
              <Home className="w-4 h-4 mr-2" /> Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

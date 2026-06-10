import { useParams, Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Clock, FileText, Users, ArrowLeft, Play, Lock, Unlock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useGetExam, getGetExamQueryKey } from "@workspace/api-client-react";

export default function ExamDetail() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id ?? "0", 10);
  const [, navigate] = useLocation();
  const { data: exam, isLoading } = useGetExam(id, { query: { enabled: !!id, queryKey: getGetExamQueryKey(id) } });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFBF5] pt-20">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="h-96 rounded-xl bg-muted animate-pulse" />
        </div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="min-h-screen bg-[#FFFBF5] pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#102A43] mb-4">Không tìm thấy đề thi</h2>
          <Link href="/exams"><Button className="bg-[#E85A2A]">Quay lại</Button></Link>
        </div>
      </div>
    );
  }

  const previewQuestions = exam.questions.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FFFBF5] pt-20">
      <div className="bg-[#102A43] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/exams">
            <Button variant="ghost" className="text-white/70 hover:text-white mb-6 -ml-2" data-testid="button-back-exams">
              <ArrowLeft className="w-4 h-4 mr-2" /> Thư viện đề thi
            </Button>
          </Link>
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge className={exam.type === "HSA" ? "bg-[#E85A2A] text-white" : "bg-[#F7941D] text-white"}>{exam.type}</Badge>
            <Badge variant="outline" className="border-white/30 text-white">{exam.subject}</Badge>
            {exam.isFree ? <Badge className="bg-green-500/20 text-green-400 border-green-500/30 gap-1"><Unlock className="w-3 h-3" />Miễn phí</Badge> : <Badge className="bg-white/10 text-white/70 gap-1"><Lock className="w-3 h-3" />Trả phí</Badge>}
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">{exam.title}</h1>
          <p className="text-white/60 mb-6">{exam.description}</p>
          <div className="flex flex-wrap gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-[#F7941D]" />{exam.questionsCount} câu hỏi</div>
            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#F7941D]" />{exam.durationMinutes} phút</div>
            <div className="flex items-center gap-2"><Users className="w-4 h-4 text-[#F7941D]" />{exam.attemptCount.toLocaleString("vi-VN")} lượt làm</div>
            {exam.year && <div className="flex items-center gap-2">Năm {exam.year}</div>}
            <Badge variant="outline" className={`border-0 ${exam.difficulty === "Khó" ? "bg-red-500/20 text-red-400" : exam.difficulty === "Trung bình" ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"}`}>{exam.difficulty}</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {previewQuestions.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-[#102A43] mb-5">Xem trước câu hỏi</h2>
              <div className="space-y-4">
                {previewQuestions.map((q, i) => (
                  <Card key={q.id} className="p-5 border-border/60" data-testid={`preview-question-${i}`}>
                    <div className="flex items-start gap-3 mb-4">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#E85A2A]/10 text-[#E85A2A] text-sm font-bold flex items-center justify-center">{i + 1}</span>
                      <p className="text-[#1F2937] font-medium leading-relaxed">{q.text}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 ml-10">
                      {q.options.map((opt, j) => (
                        <div key={j} className={`p-3 rounded-lg text-sm border ${j === q.correctOptionIndex ? "border-green-300 bg-green-50 text-green-800 font-medium" : "border-border/60 text-muted-foreground"}`}>
                          {opt}
                        </div>
                      ))}
                    </div>
                    {q.explanation && (
                      <div className="mt-3 ml-10 flex items-start gap-2 bg-blue-50 rounded-lg p-3">
                        <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-700">{q.explanation}</p>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
              {exam.questions.length > 3 && (
                <p className="text-center text-sm text-muted-foreground mt-4">Còn {exam.questions.length - 3} câu hỏi khác — bắt đầu thi để xem tất cả</p>
              )}
            </div>
          )}
        </div>

        <div>
          <Card className="p-6 sticky top-24 border-border/60">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#E85A2A]/10 flex items-center justify-center mx-auto mb-3">
                <FileText className="w-8 h-8 text-[#E85A2A]" />
              </div>
              <h3 className="font-bold text-[#102A43] text-lg">{exam.title}</h3>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Số câu</span><span className="font-semibold text-[#102A43]">{exam.questionsCount}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Thời gian</span><span className="font-semibold text-[#102A43]">{exam.durationMinutes} phút</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Độ khó</span><span className="font-semibold text-[#102A43]">{exam.difficulty}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Lượt làm</span><span className="font-semibold text-[#102A43]">{exam.attemptCount.toLocaleString("vi-VN")}</span></div>
            </div>
            <Button className="w-full bg-[#E85A2A] hover:bg-[#d14f23] text-white font-bold py-5 text-base" onClick={() => navigate(`/exams/${id}/take`)} data-testid="button-start-exam">
              <Play className="w-5 h-5 mr-2" />
              Bắt đầu thi ngay
            </Button>
            {!exam.isFree && (
              <p className="text-xs text-muted-foreground text-center mt-3">Cần đăng ký để làm đề thi này</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

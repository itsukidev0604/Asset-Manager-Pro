import { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "wouter";
import { Clock, ChevronLeft, ChevronRight, Flag, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useGetExam, getGetExamQueryKey } from "@workspace/api-client-react";

export default function ExamTake() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id ?? "0", 10);
  const [, navigate] = useLocation();
  const { data: exam, isLoading } = useGetExam(id, { query: { enabled: !!id, queryKey: getGetExamQueryKey(id) } });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (exam) setTimeLeft(exam.durationMinutes * 60);
  }, [exam]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [timeLeft > 0]);

  const handleSubmit = () => {
    clearInterval(timerRef.current);
    navigate(`/exams/${id}/result`);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (isLoading || !exam) {
    return (
      <div className="min-h-screen bg-[#102A43] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#E85A2A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const questions = exam.questions.length > 0 ? exam.questions : [
    { id: 1, text: "Câu hỏi mẫu: Tính giá trị của biểu thức 2x² - 3x + 1 khi x = 2", options: ["A. 3", "B. 5", "C. 7", "D. 9"], correctOptionIndex: 0, explanation: null },
    { id: 2, text: "Câu hỏi mẫu: Đạo hàm của y = x³ là:", options: ["A. x²", "B. 2x²", "C. 3x²", "D. 4x²"], correctOptionIndex: 2, explanation: null },
    { id: 3, text: "Câu hỏi mẫu: Phương trình nào sau đây vô nghiệm?", options: ["A. x² + 1 = 0", "B. x² - 1 = 0", "C. x² + x = 0", "D. x² - x = 0"], correctOptionIndex: 0, explanation: null },
  ];

  const q = questions[currentQuestion] ?? questions[0];
  const answered = Object.keys(answers).length;
  const progress = (answered / questions.length) * 100;
  const isWarning = timeLeft < 300;

  return (
    <div className="min-h-screen bg-[#0d1f33] flex flex-col">
      {/* Header */}
      <header className="bg-[#102A43] border-b border-white/10 px-6 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#E85A2A] animate-pulse" />
          <span className="text-white font-semibold text-sm truncate max-w-xs">{exam.title}</span>
        </div>
        <div className={cn("flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold text-lg", isWarning ? "bg-red-500/20 text-red-400" : "bg-white/10 text-white")} data-testid="exam-timer">
          <Clock className="w-5 h-5" />
          {formatTime(timeLeft)}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/50 text-sm">{answered}/{questions.length} câu</span>
          <Button size="sm" className="bg-[#E85A2A] hover:bg-[#d14f23] text-white" onClick={() => setShowSubmitConfirm(true)} data-testid="button-submit-exam">
            <Flag className="w-4 h-4 mr-1.5" /> Nộp bài
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Question Navigation Sidebar */}
        <aside className="hidden lg:flex w-64 bg-[#102A43]/50 border-r border-white/10 flex-col p-4">
          <h3 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-3">Danh sách câu hỏi</h3>
          <div className="grid grid-cols-5 gap-1.5 flex-1 overflow-y-auto content-start">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQuestion(i)}
                className={cn(
                  "aspect-square rounded-lg text-xs font-bold transition-all",
                  i === currentQuestion ? "bg-[#E85A2A] text-white scale-110" :
                  answers[i] !== undefined ? "bg-[#F7941D]/30 text-[#F7941D]" :
                  "bg-white/10 text-white/50 hover:bg-white/20"
                )}
                data-testid={`question-nav-${i}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-white/50"><div className="w-4 h-4 rounded bg-[#F7941D]/30" />Đã trả lời</div>
            <div className="flex items-center gap-2 text-white/50"><div className="w-4 h-4 rounded bg-[#E85A2A]" />Câu hiện tại</div>
            <div className="flex items-center gap-2 text-white/50"><div className="w-4 h-4 rounded bg-white/10" />Chưa trả lời</div>
          </div>
        </aside>

        {/* Main Question Area */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          <div className="max-w-2xl mx-auto w-full px-6 py-8 flex-1">
            <div className="flex items-center justify-between mb-6">
              <span className="text-white/50 text-sm">Câu {currentQuestion + 1} / {questions.length}</span>
              <Progress value={progress} className="w-32 h-1.5 bg-white/10" />
            </div>

            <div className="bg-[#102A43]/60 rounded-2xl p-6 mb-6 border border-white/10">
              <p className="text-white text-lg font-medium leading-relaxed" data-testid="question-text">{q.text}</p>
            </div>

            <div className="space-y-3 mb-8">
              {q.options.map((opt, j) => (
                <button
                  key={j}
                  onClick={() => setAnswers(prev => ({ ...prev, [currentQuestion]: j }))}
                  className={cn(
                    "w-full text-left rounded-xl px-5 py-4 text-base font-medium transition-all border",
                    answers[currentQuestion] === j
                      ? "bg-[#E85A2A] text-white border-[#E85A2A] shadow-lg shadow-[#E85A2A]/20"
                      : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:border-white/30"
                  )}
                  data-testid={`option-${j}`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <Button variant="ghost" className="text-white/60 hover:text-white" onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))} disabled={currentQuestion === 0} data-testid="button-prev-question">
                <ChevronLeft className="w-5 h-5 mr-1" /> Câu trước
              </Button>
              {currentQuestion < questions.length - 1 ? (
                <Button className="bg-[#E85A2A] hover:bg-[#d14f23] text-white" onClick={() => setCurrentQuestion(currentQuestion + 1)} data-testid="button-next-question">
                  Câu tiếp theo <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              ) : (
                <Button className="bg-[#E85A2A] hover:bg-[#d14f23] text-white" onClick={() => setShowSubmitConfirm(true)} data-testid="button-finish-exam">
                  Nộp bài <Flag className="w-5 h-5 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Submit Confirmation */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#102A43] rounded-2xl p-8 max-w-sm w-full border border-white/10 text-center">
            <AlertCircle className="w-12 h-12 text-[#F2C230] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Nộp bài?</h3>
            <p className="text-white/60 text-sm mb-6">
              Bạn đã trả lời {answered}/{questions.length} câu.{answered < questions.length && ` Còn ${questions.length - answered} câu chưa trả lời.`}
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" className="flex-1 text-white/70 hover:text-white border border-white/20" onClick={() => setShowSubmitConfirm(false)}>Tiếp tục làm</Button>
              <Button className="flex-1 bg-[#E85A2A] hover:bg-[#d14f23] text-white" onClick={handleSubmit} data-testid="button-confirm-submit">Nộp bài</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

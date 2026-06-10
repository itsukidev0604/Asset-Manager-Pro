import { Link } from "wouter";
import { motion } from "framer-motion";
import { GraduationCap, Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const perks = [
  "Truy cập toàn bộ đề thi miễn phí",
  "Lộ trình học tập cá nhân hóa",
  "Theo dõi tiến độ chi tiết",
  "Cộng đồng 5.000+ học sinh",
];

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col bg-gradient-to-br from-[#E85A2A] to-[#F7941D] p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-white/10"
              style={{ width: `${(i + 1) * 180}px`, height: `${(i + 1) * 180}px`, top: "-10%", left: "-10%", opacity: 0.5 - i * 0.1 }} />
          ))}
        </div>
        <Link href="/" className="relative z-10">
          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white text-lg">TRI ANH EDU</span>
          </div>
        </Link>
        <div className="flex-1 flex flex-col justify-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-4xl font-bold text-white mb-4">Tham gia miễn phí</h2>
            <p className="text-white/80 text-lg mb-10">Bắt đầu hành trình chinh phục HSA & TSA ngay hôm nay.</p>
            <div className="space-y-4">
              {perks.map(perk => (
                <div key={perk} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-white/90">{perk}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex items-center justify-center p-8 bg-[#FFFBF5]">
        <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#E85A2A] to-[#F7941D] flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-[#102A43]">TRI ANH EDU</span>
          </div>

          <h1 className="text-3xl font-bold text-[#102A43] mb-1">Đăng ký tài khoản</h1>
          <p className="text-muted-foreground mb-8">Miễn phí. Không cần thẻ tín dụng.</p>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[#102A43] font-medium">Họ</Label>
                <Input placeholder="Nguyễn" className="py-5 bg-white border-border/60" data-testid="input-lastname" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[#102A43] font-medium">Tên</Label>
                <Input placeholder="Văn A" className="py-5 bg-white border-border/60" data-testid="input-firstname" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[#102A43] font-medium">Email</Label>
              <Input type="email" placeholder="ban@email.com" className="py-5 bg-white border-border/60" data-testid="input-email" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[#102A43] font-medium">Mật khẩu</Label>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} placeholder="Ít nhất 8 ký tự" className="py-5 bg-white border-border/60 pr-11" data-testid="input-password" />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[#102A43] font-medium">Mục tiêu thi</Label>
              <select className="w-full rounded-lg border border-border/60 bg-white px-3 py-3 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#E85A2A]/30" data-testid="select-goal">
                <option value="">Chọn kỳ thi mục tiêu</option>
                <option value="hsa">Kỳ thi HSA (ĐHQGHN)</option>
                <option value="tsa">Kỳ thi TSA (Bách Khoa HN)</option>
                <option value="both">Cả HSA và TSA</option>
              </select>
            </div>
            <Button type="submit" className="w-full bg-[#E85A2A] hover:bg-[#d14f23] text-white font-bold py-5 text-base" data-testid="button-submit-register">
              Đăng ký miễn phí <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Bằng cách đăng ký, bạn đồng ý với{" "}
            <span className="text-[#E85A2A] cursor-pointer">Điều khoản sử dụng</span>{" "}và{" "}
            <span className="text-[#E85A2A] cursor-pointer">Chính sách bảo mật</span>.
          </p>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/50" /></div>
            <div className="relative flex justify-center text-xs text-muted-foreground bg-[#FFFBF5] px-3">Đã có tài khoản?</div>
          </div>

          <Link href="/login">
            <Button variant="outline" className="w-full border-[#102A43]/20 text-[#102A43] hover:bg-[#102A43]/5" data-testid="button-go-to-login">
              Đăng nhập
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

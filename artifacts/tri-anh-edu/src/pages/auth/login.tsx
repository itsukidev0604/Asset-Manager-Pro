import { Link } from "wouter";
import { motion } from "framer-motion";
import { GraduationCap, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col bg-[#102A43] p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-white/5"
              style={{ width: `${(i + 1) * 160}px`, height: `${(i + 1) * 160}px`, bottom: "-10%", right: "-10%", opacity: 0.5 - i * 0.08 }} />
          ))}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#E85A2A]/10 rounded-full blur-3xl" />
        </div>
        <Link href="/" className="relative z-10">
          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E85A2A] to-[#F7941D] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white text-lg">TRI ANH EDU</span>
          </div>
        </Link>
        <div className="flex-1 flex flex-col justify-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">Chào mừng trở lại</h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10">Tiếp tục hành trình chinh phục HSA & TSA của bạn từ nơi đã dừng lại.</p>
            <div className="space-y-4">
              {[
                { stat: "5.000+", label: "học viên tin tưởng" },
                { stat: "95%", label: "tỷ lệ hài lòng" },
                { stat: "300+", label: "đề thi chất lượng" },
              ].map(item => (
                <div key={item.stat} className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-[#F7941D]">{item.stat}</span>
                  <span className="text-white/60">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex items-center justify-center p-8 bg-[#FFFBF5]">
        <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#E85A2A] to-[#F7941D] flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-[#102A43]">TRI ANH EDU</span>
          </div>

          <h1 className="text-3xl font-bold text-[#102A43] mb-1">Đăng nhập</h1>
          <p className="text-muted-foreground mb-8">Nhập thông tin tài khoản để tiếp tục học</p>

          <form className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[#102A43] font-medium">Email</Label>
              <Input id="email" type="email" placeholder="ban@email.com" className="py-5 bg-white border-border/60" data-testid="input-email" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-[#102A43] font-medium">Mật khẩu</Label>
                <Link href="/forgot-password">
                  <span className="text-sm text-[#E85A2A] hover:underline cursor-pointer">Quên mật khẩu?</span>
                </Link>
              </div>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="py-5 bg-white border-border/60 pr-11" data-testid="input-password" />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm text-muted-foreground font-normal cursor-pointer">Ghi nhớ đăng nhập</Label>
            </div>
            <Button type="submit" className="w-full bg-[#E85A2A] hover:bg-[#d14f23] text-white font-bold py-5 text-base" data-testid="button-submit-login">
              Đăng nhập <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/50" /></div>
            <div className="relative flex justify-center text-xs text-muted-foreground bg-[#FFFBF5] px-3">hoặc</div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Chưa có tài khoản?{" "}
            <Link href="/register">
              <span className="text-[#E85A2A] font-semibold hover:underline cursor-pointer">Đăng ký miễn phí</span>
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

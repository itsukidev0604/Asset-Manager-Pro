import { Link } from "wouter";
import { motion } from "framer-motion";
import { GraduationCap, ArrowLeft, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBF5] p-8">
      <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Link href="/login">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#102A43] mb-8 cursor-pointer transition-colors" data-testid="button-back-login">
            <ArrowLeft className="w-4 h-4" /> Quay lại đăng nhập
          </div>
        </Link>

        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E85A2A] to-[#F7941D] flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-[#102A43] text-lg">TRI ANH EDU</span>
        </div>

        {!sent ? (
          <>
            <div className="w-14 h-14 rounded-2xl bg-[#E85A2A]/10 flex items-center justify-center mb-6">
              <Mail className="w-7 h-7 text-[#E85A2A]" />
            </div>
            <h1 className="text-3xl font-bold text-[#102A43] mb-2">Quên mật khẩu?</h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Nhập địa chỉ email của bạn và chúng tôi sẽ gửi link để đặt lại mật khẩu.
            </p>
            <form className="space-y-5" onSubmit={e => { e.preventDefault(); setSent(true); }}>
              <div className="space-y-1.5">
                <Label className="text-[#102A43] font-medium">Email</Label>
                <Input type="email" placeholder="ban@email.com" className="py-5 bg-white border-border/60" data-testid="input-email" />
              </div>
              <Button type="submit" className="w-full bg-[#E85A2A] hover:bg-[#d14f23] text-white font-bold py-5 text-base" data-testid="button-send-reset">
                Gửi link đặt lại mật khẩu <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#102A43] mb-3">Email đã được gửi!</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Kiểm tra hộp thư của bạn và nhấn vào link để đặt lại mật khẩu. Link có hiệu lực trong 30 phút.
            </p>
            <Link href="/login">
              <Button className="bg-[#E85A2A] hover:bg-[#d14f23] text-white font-semibold" data-testid="button-back-to-login">
                Quay lại đăng nhập
              </Button>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

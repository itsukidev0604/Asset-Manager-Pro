import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Award, BookOpen, Camera, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const achievements = [
  { title: "Chiến binh đề thi", desc: "Làm 10+ đề thi", icon: "🎯", earned: true },
  { title: "Điểm HSA 100+", desc: "Đạt trên 100 điểm HSA", icon: "⭐", earned: true },
  { title: "Học viên chăm chỉ", desc: "Học 7 ngày liên tiếp", icon: "🔥", earned: true },
  { title: "Chinh phục TSA", desc: "Đạt trên 90 điểm TSA", icon: "🏆", earned: false },
  { title: "Hành trình 30 ngày", desc: "Học liên tục 30 ngày", icon: "📚", earned: false },
  { title: "Điểm tuyệt đối", desc: "Đạt điểm tối đa 1 phần thi", icon: "💎", earned: false },
];

export default function Profile() {
  return (
    <div className="min-h-screen bg-[#FFFBF5] pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-[#102A43] mb-8">Hồ Sơ</h1>

          {/* Profile Header */}
          <Card className="p-6 mb-6 border-border/60">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#102A43] to-[#1a3a5e] flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  H
                </div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#E85A2A] flex items-center justify-center hover:bg-[#d14f23] transition-colors" data-testid="button-change-avatar">
                  <Camera className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#102A43]">Học Viên</h2>
                <p className="text-muted-foreground text-sm mb-2">hocvien@email.com</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-[#E85A2A]/10 text-[#E85A2A] border-[#E85A2A]/20 text-xs">Mục tiêu: HSA + TSA</Badge>
                  <Badge variant="secondary" className="text-xs">Tham gia: 06/2025</Badge>
                  <Badge className="bg-[#F2C230]/20 text-[#102A43] border-[#F2C230]/30 text-xs">Cấp độ: Trung bình</Badge>
                </div>
              </div>
            </div>
          </Card>

          <Tabs defaultValue="info" className="space-y-6">
            <TabsList className="bg-white border border-border/60 p-1">
              <TabsTrigger value="info" className="data-[state=active]:bg-[#E85A2A] data-[state=active]:text-white" data-testid="tab-info">Thông tin cá nhân</TabsTrigger>
              <TabsTrigger value="achievements" className="data-[state=active]:bg-[#E85A2A] data-[state=active]:text-white" data-testid="tab-achievements">Thành tích</TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-[#E85A2A] data-[state=active]:text-white" data-testid="tab-settings">Cài đặt</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <Card className="p-6 border-border/60">
                <h3 className="font-bold text-[#102A43] mb-5 flex items-center gap-2"><User className="w-4 h-4 text-[#E85A2A]" />Thông tin cá nhân</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { label: "Họ và tên", placeholder: "Nguyễn Văn A", icon: User, testId: "input-fullname" },
                    { label: "Email", placeholder: "ban@email.com", icon: Mail, testId: "input-email" },
                    { label: "Số điện thoại", placeholder: "0123 456 789", icon: Phone, testId: "input-phone" },
                    { label: "Tỉnh/Thành phố", placeholder: "Hà Nội", icon: MapPin, testId: "input-city" },
                  ].map(field => (
                    <div key={field.label} className="space-y-1.5">
                      <Label className="text-[#102A43] font-medium">{field.label}</Label>
                      <div className="relative">
                        <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder={field.placeholder} className="pl-9 bg-white border-border/60" data-testid={field.testId} />
                      </div>
                    </div>
                  ))}
                  <div className="space-y-1.5">
                    <Label className="text-[#102A43] font-medium">Mục tiêu thi</Label>
                    <select className="w-full rounded-lg border border-border/60 bg-white px-3 py-2 text-sm" data-testid="select-goal">
                      <option>Kỳ thi HSA (ĐHQGHN)</option>
                      <option>Kỳ thi TSA (Bách Khoa HN)</option>
                      <option>Cả HSA và TSA</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[#102A43] font-medium">Năm thi dự kiến</Label>
                    <select className="w-full rounded-lg border border-border/60 bg-white px-3 py-2 text-sm" data-testid="select-year">
                      <option>2025</option>
                      <option>2026</option>
                      <option>2027</option>
                    </select>
                  </div>
                </div>
                <Button className="mt-6 bg-[#E85A2A] hover:bg-[#d14f23] text-white font-semibold" data-testid="button-save-profile">
                  <Save className="w-4 h-4 mr-2" /> Lưu thay đổi
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="achievements">
              <Card className="p-6 border-border/60">
                <h3 className="font-bold text-[#102A43] mb-5 flex items-center gap-2"><Award className="w-4 h-4 text-[#E85A2A]" />Huy hiệu thành tích</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {achievements.map((a, i) => (
                    <div key={i} className={`p-4 rounded-xl border text-center transition-all ${a.earned ? "border-[#F2C230]/40 bg-[#F2C230]/5" : "border-border/40 bg-muted/30 opacity-50"}`} data-testid={`achievement-${i}`}>
                      <div className="text-3xl mb-2">{a.icon}</div>
                      <div className={`font-semibold text-sm mb-1 ${a.earned ? "text-[#102A43]" : "text-muted-foreground"}`}>{a.title}</div>
                      <div className="text-xs text-muted-foreground">{a.desc}</div>
                      {a.earned && <Badge className="mt-2 bg-[#F2C230]/20 text-[#102A43] border-[#F2C230]/30 text-xs">Đã đạt</Badge>}
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="p-6 border-border/60">
                <h3 className="font-bold text-[#102A43] mb-5">Cài đặt tài khoản</h3>
                <div className="space-y-6">
                  {[
                    { title: "Thông báo email", desc: "Nhận email về kết quả và tiến độ học tập" },
                    { title: "Nhắc nhở học hàng ngày", desc: "Nhắc nhở vào lúc 7:00 sáng mỗi ngày" },
                    { title: "Hiển thị điểm số công khai", desc: "Cho phép học viên khác xem điểm của bạn" },
                  ].map((setting, i) => (
                    <div key={i} className="flex items-start justify-between" data-testid={`setting-${i}`}>
                      <div>
                        <div className="font-medium text-[#102A43] text-sm">{setting.title}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{setting.desc}</div>
                      </div>
                      <button className="w-10 h-6 rounded-full bg-[#E85A2A] relative flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-white absolute right-0.5 top-0.5 shadow-sm" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-border/50">
                  <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50" data-testid="button-delete-account">
                    Xóa tài khoản
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}

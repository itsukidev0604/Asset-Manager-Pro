import { useState } from "react";
import { Save, Globe, Mail, Image, Shield, ClipboardList, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const tabs = [
  { key: "general", label: "Chung", icon: Globe },
  { key: "email", label: "Email", icon: Mail },
  { key: "storage", label: "Lưu trữ", icon: Image },
  { key: "auth", label: "Xác thực", icon: Shield },
  { key: "exam", label: "Cấu hình thi", icon: ClipboardList },
  { key: "maintenance", label: "Bảo trì", icon: AlertCircle },
];

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      {children}
    </div>
  );
}

function FieldRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div className="flex-1">
        <Label className="text-sm font-medium text-gray-700">{label}</Label>
        {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
      </div>
      <div className="w-64 flex-shrink-0">{children}</div>
    </div>
  );
}

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [maintenance, setMaintenance] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    toast({ title: "Đã lưu cài đặt", description: "Thay đổi của bạn đã được lưu thành công." });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm w-fit overflow-x-auto">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === t.key
                  ? "bg-trust-navy text-white"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      <Card className="p-6 bg-white border-0 shadow-sm">
        {activeTab === "general" && (
          <div className="space-y-6 max-w-2xl">
            <FormSection title="Thông tin nền tảng">
              <FieldRow label="Tên nền tảng">
                <Input defaultValue="TRI ANH EDU" className="h-9 text-sm" />
              </FieldRow>
              <FieldRow label="Mô tả" description="Hiển thị trong meta tags">
                <Input defaultValue="Nền tảng luyện thi HSA & TSA hàng đầu" className="h-9 text-sm" />
              </FieldRow>
              <FieldRow label="Website URL">
                <Input defaultValue="https://trianhedu.vn" className="h-9 text-sm" />
              </FieldRow>
              <FieldRow label="Email liên hệ">
                <Input defaultValue="contact@trianhedu.vn" className="h-9 text-sm" />
              </FieldRow>
            </FormSection>
            <Separator />
            <FormSection title="Ngôn ngữ & Vùng">
              <FieldRow label="Ngôn ngữ mặc định">
                <select className="w-full h-9 px-3 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 outline-none focus:ring-1 focus:ring-brand-orange">
                  <option>Tiếng Việt</option>
                  <option>English</option>
                </select>
              </FieldRow>
              <FieldRow label="Múi giờ">
                <select className="w-full h-9 px-3 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 outline-none focus:ring-1 focus:ring-brand-orange">
                  <option>Asia/Ho_Chi_Minh (UTC+7)</option>
                </select>
              </FieldRow>
            </FormSection>
          </div>
        )}

        {activeTab === "email" && (
          <div className="space-y-6 max-w-2xl">
            <FormSection title="Cấu hình SMTP">
              <FieldRow label="SMTP Host">
                <Input defaultValue="smtp.gmail.com" className="h-9 text-sm" />
              </FieldRow>
              <FieldRow label="SMTP Port">
                <Input defaultValue="587" type="number" className="h-9 text-sm" />
              </FieldRow>
              <FieldRow label="SMTP Username">
                <Input defaultValue="noreply@trianhedu.vn" className="h-9 text-sm" />
              </FieldRow>
              <FieldRow label="SMTP Password">
                <Input type="password" defaultValue="••••••••••" className="h-9 text-sm" />
              </FieldRow>
            </FormSection>
            <Separator />
            <FormSection title="Email từ">
              <FieldRow label="Tên người gửi">
                <Input defaultValue="TRI ANH EDU" className="h-9 text-sm" />
              </FieldRow>
              <FieldRow label="Email người gửi">
                <Input defaultValue="noreply@trianhedu.vn" className="h-9 text-sm" />
              </FieldRow>
            </FormSection>
          </div>
        )}

        {activeTab === "storage" && (
          <div className="space-y-6 max-w-2xl">
            <FormSection title="Cloudinary">
              <FieldRow label="Cloud Name">
                <Input placeholder="your-cloud-name" className="h-9 text-sm" />
              </FieldRow>
              <FieldRow label="API Key">
                <Input placeholder="••••••••••" type="password" className="h-9 text-sm" />
              </FieldRow>
              <FieldRow label="API Secret">
                <Input placeholder="••••••••••" type="password" className="h-9 text-sm" />
              </FieldRow>
            </FormSection>
            <Separator />
            <FormSection title="Giới hạn tải lên">
              <FieldRow label="Kích thước tối đa (MB)" description="Áp dụng cho ảnh thumbnail">
                <Input defaultValue="10" type="number" className="h-9 text-sm" />
              </FieldRow>
            </FormSection>
          </div>
        )}

        {activeTab === "auth" && (
          <div className="space-y-6 max-w-2xl">
            <FormSection title="Đăng ký tài khoản">
              <FieldRow label="Cho phép đăng ký" description="Người dùng mới có thể tạo tài khoản">
                <Switch defaultChecked />
              </FieldRow>
              <FieldRow label="Xác minh email" description="Yêu cầu xác minh email khi đăng ký">
                <Switch defaultChecked />
              </FieldRow>
              <FieldRow label="Đăng nhập Google" description="Cho phép đăng nhập qua Google">
                <Switch defaultChecked />
              </FieldRow>
            </FormSection>
            <Separator />
            <FormSection title="Bảo mật">
              <FieldRow label="Thời gian hết phiên (phút)">
                <Input defaultValue="1440" type="number" className="h-9 text-sm" />
              </FieldRow>
              <FieldRow label="Giới hạn đăng nhập sai" description="Khoá tài khoản sau N lần sai">
                <Input defaultValue="5" type="number" className="h-9 text-sm" />
              </FieldRow>
            </FormSection>
          </div>
        )}

        {activeTab === "exam" && (
          <div className="space-y-6 max-w-2xl">
            <FormSection title="Cấu hình thi">
              <FieldRow label="Thời gian cảnh báo (phút)" description="Hiển thị cảnh báo khi sắp hết thời gian">
                <Input defaultValue="10" type="number" className="h-9 text-sm" />
              </FieldRow>
              <FieldRow label="Cho phép bỏ qua câu hỏi" description="Học viên có thể bỏ qua và quay lại">
                <Switch defaultChecked />
              </FieldRow>
              <FieldRow label="Hiển thị đáp án ngay" description="Cho xem đáp án sau khi nộp bài">
                <Switch defaultChecked />
              </FieldRow>
              <FieldRow label="Xáo trộn câu hỏi" description="Thứ tự ngẫu nhiên khi làm bài">
                <Switch />
              </FieldRow>
            </FormSection>
            <Separator />
            <FormSection title="Giới hạn">
              <FieldRow label="Số lần làm lại tối đa" description="0 = không giới hạn">
                <Input defaultValue="0" type="number" className="h-9 text-sm" />
              </FieldRow>
            </FormSection>
          </div>
        )}

        {activeTab === "maintenance" && (
          <div className="space-y-6 max-w-2xl">
            <div className={`p-4 rounded-xl border-2 ${maintenance ? "border-red-200 bg-red-50" : "border-gray-200 bg-gray-50"}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-semibold ${maintenance ? "text-red-700" : "text-gray-700"}`}>
                    Chế độ bảo trì
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {maintenance ? "Website đang trong chế độ bảo trì. Chỉ admin có thể truy cập." : "Website đang hoạt động bình thường."}
                  </p>
                </div>
                <Switch
                  checked={maintenance}
                  onCheckedChange={setMaintenance}
                />
              </div>
            </div>
            {maintenance && (
              <FormSection title="Thông báo bảo trì">
                <FieldRow label="Tiêu đề thông báo">
                  <Input defaultValue="Website đang bảo trì" className="h-9 text-sm" />
                </FieldRow>
                <FieldRow label="Thời gian dự kiến hoàn thành">
                  <Input type="datetime-local" className="h-9 text-sm" />
                </FieldRow>
              </FormSection>
            )}
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-gray-100">
          <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white" onClick={handleSave}>
            <Save className="w-3.5 h-3.5 mr-2" /> Lưu cài đặt
          </Button>
        </div>
      </Card>
    </div>
  );
}

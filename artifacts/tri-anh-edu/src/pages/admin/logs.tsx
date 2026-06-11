import { useState } from "react";
import { Search, Activity, AlertCircle, Info, CheckCircle, XCircle, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const mockLogs = [
  { id: 1, action: "USER_LOGIN", user: "admin@trianhedu.vn", ip: "116.97.42.15", detail: "Đăng nhập thành công", level: "info", time: "11/06/2025 09:15:33" },
  { id: 2, action: "COURSE_PUBLISHED", user: "minh.tuan@trianhedu.vn", ip: "113.185.55.22", detail: "Xuất bản khóa học 'Toán HSA Nâng Cao'", level: "success", time: "11/06/2025 09:02:11" },
  { id: 3, action: "USER_BANNED", user: "admin@trianhedu.vn", ip: "116.97.42.15", detail: "Khoá tài khoản: pham.duc@email.com", level: "warning", time: "10/06/2025 18:45:07" },
  { id: 4, action: "EXAM_CREATED", user: "minh.tuan@trianhedu.vn", ip: "113.185.55.22", detail: "Tạo đề thi mới: 'Đề thử TSA Toán 2025'", level: "info", time: "10/06/2025 15:30:22" },
  { id: 5, action: "LOGIN_FAILED", user: "unknown@email.com", ip: "45.12.34.56", detail: "Đăng nhập thất bại (lần 3/5)", level: "warning", time: "10/06/2025 12:15:44" },
  { id: 6, action: "SETTINGS_UPDATED", user: "admin@trianhedu.vn", ip: "116.97.42.15", detail: "Cập nhật cài đặt hệ thống", level: "info", time: "10/06/2025 10:05:18" },
  { id: 7, action: "COURSE_DELETED", user: "admin@trianhedu.vn", ip: "116.97.42.15", detail: "Xoá khóa học: 'Demo Course'", level: "error", time: "09/06/2025 16:22:01" },
  { id: 8, action: "BLOG_PUBLISHED", user: "lan.anh@trianhedu.vn", ip: "113.185.55.33", detail: "Xuất bản bài viết: 'Chiến lược ôn thi HSA 2025'", level: "success", time: "09/06/2025 14:10:55" },
  { id: 9, action: "USER_REGISTERED", user: "mai.nguyen@email.com", ip: "27.78.45.120", detail: "Người dùng mới đăng ký", level: "info", time: "09/06/2025 11:33:42" },
  { id: 10, action: "ROLE_CHANGED", user: "admin@trianhedu.vn", ip: "116.97.42.15", detail: "Đổi vai trò thu.le → Teacher", level: "warning", time: "08/06/2025 09:55:16" },
  { id: 11, action: "EXAM_RESULT", user: "system", ip: "—", detail: "Auto-grade: 234 kết quả thi được chấm điểm", level: "success", time: "08/06/2025 00:01:00" },
  { id: 12, action: "BACKUP_COMPLETED", user: "system", ip: "—", detail: "Backup database hoàn thành (2.3GB)", level: "success", time: "07/06/2025 03:00:00" },
  { id: 13, action: "QUESTION_IMPORTED", user: "minh.tuan@trianhedu.vn", ip: "113.185.55.22", detail: "Nhập 50 câu hỏi từ file Excel", level: "info", time: "07/06/2025 14:30:09" },
  { id: 14, action: "PAYMENT_RECEIVED", user: "system", ip: "—", detail: "Thanh toán nhận được: 2.800.000đ", level: "success", time: "07/06/2025 10:22:48" },
  { id: 15, action: "SYSTEM_ERROR", user: "system", ip: "—", detail: "DB connection timeout (recovered in 2s)", level: "error", time: "06/06/2025 23:45:12" },
];

const levelConfig: Record<string, { label: string; class: string; icon: React.ElementType; iconClass: string }> = {
  info: { label: "Info", class: "bg-blue-50 text-blue-700", icon: Info, iconClass: "text-blue-500" },
  success: { label: "Success", class: "bg-green-50 text-green-700", icon: CheckCircle, iconClass: "text-green-500" },
  warning: { label: "Warning", class: "bg-yellow-50 text-yellow-700", icon: AlertCircle, iconClass: "text-yellow-500" },
  error: { label: "Error", class: "bg-red-50 text-red-700", icon: XCircle, iconClass: "text-red-500" },
};

export default function AdminLogs() {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const { toast } = useToast();

  const filtered = mockLogs.filter((l) => {
    const matchSearch =
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.user.toLowerCase().includes(search.toLowerCase()) ||
      l.detail.toLowerCase().includes(search.toLowerCase());
    const matchLevel = levelFilter === "all" || l.level === levelFilter;
    return matchSearch && matchLevel;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <Input placeholder="Tìm nhật ký..." className="pl-8 h-9 text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 bg-gray-100 p-0.5 rounded-lg">
            {["all", "info", "success", "warning", "error"].map((l) => (
              <button
                key={l}
                onClick={() => setLevelFilter(l)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all capitalize ${
                  levelFilter === l ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {l === "all" ? "Tất cả" : l}
              </button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-9 text-xs gap-1.5"
            onClick={() => toast({ title: "Đã xuất nhật ký", description: "File CSV đã được tải xuống." })}
          >
            <Download className="w-3.5 h-3.5" /> Xuất CSV
          </Button>
        </div>
      </div>

      <Card className="bg-white border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Thời gian</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Hành động</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden md:table-cell">Người dùng</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden lg:table-cell">IP Address</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Chi tiết</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Cấp độ</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12">
                    <Activity className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Không có nhật ký</p>
                  </td>
                </tr>
              ) : (
                filtered.map((log) => {
                  const lc = levelConfig[log.level];
                  const Icon = lc.icon;
                  return (
                    <tr key={log.id} className="border-b border-gray-50 hover:bg-gray-50/40 transition-colors">
                      <td className="px-4 py-2.5">
                        <p className="text-[11px] text-gray-500 font-mono whitespace-nowrap">{log.time}</p>
                      </td>
                      <td className="px-4 py-2.5">
                        <code className="text-xs font-mono font-semibold text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded">
                          {log.action}
                        </code>
                      </td>
                      <td className="px-4 py-2.5 hidden md:table-cell">
                        <p className="text-xs text-gray-600 max-w-[160px] truncate">{log.user}</p>
                      </td>
                      <td className="px-4 py-2.5 hidden lg:table-cell">
                        <p className="text-xs font-mono text-gray-400">{log.ip}</p>
                      </td>
                      <td className="px-4 py-2.5 max-w-xs">
                        <p className="text-xs text-gray-700 truncate">{log.detail}</p>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-1">
                          <Icon className={`w-3.5 h-3.5 ${lc.iconClass}`} />
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${lc.class}`}>{lc.label}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-400">{filtered.length} bản ghi</p>
          <div className="flex gap-1">
            <button className="px-2.5 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50 text-gray-600 disabled:opacity-40" disabled>Trước</button>
            <button className="px-2.5 py-1 text-xs bg-brand-orange text-white rounded">1</button>
            <button className="px-2.5 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50 text-gray-600">Sau</button>
          </div>
        </div>
      </Card>
    </div>
  );
}

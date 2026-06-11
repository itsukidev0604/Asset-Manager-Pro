import { useState } from "react";
import { ShieldCheck, Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const permissions = [
  { group: "Khóa học", items: [
    { key: "courses.view", label: "Xem khóa học" },
    { key: "courses.create", label: "Tạo khóa học" },
    { key: "courses.edit", label: "Sửa khóa học" },
    { key: "courses.delete", label: "Xoá khóa học" },
    { key: "courses.publish", label: "Xuất bản khóa học" },
  ]},
  { group: "Đề thi", items: [
    { key: "exams.view", label: "Xem đề thi" },
    { key: "exams.create", label: "Tạo đề thi" },
    { key: "exams.edit", label: "Sửa đề thi" },
    { key: "exams.delete", label: "Xoá đề thi" },
    { key: "questions.manage", label: "Quản lý câu hỏi" },
  ]},
  { group: "Blog", items: [
    { key: "blog.view", label: "Xem bài viết" },
    { key: "blog.create", label: "Tạo bài viết" },
    { key: "blog.edit", label: "Sửa bài viết" },
    { key: "blog.delete", label: "Xoá bài viết" },
    { key: "blog.publish", label: "Xuất bản bài viết" },
  ]},
  { group: "Người dùng", items: [
    { key: "users.view", label: "Xem người dùng" },
    { key: "users.edit", label: "Sửa người dùng" },
    { key: "users.ban", label: "Khoá tài khoản" },
    { key: "users.role", label: "Đổi vai trò" },
  ]},
  { group: "Hệ thống", items: [
    { key: "system.settings", label: "Cài đặt hệ thống" },
    { key: "system.logs", label: "Xem nhật ký" },
    { key: "system.roles", label: "Quản lý phân quyền" },
  ]},
  { group: "Phân tích", items: [
    { key: "analytics.results", label: "Xem kết quả thi" },
    { key: "analytics.revenue", label: "Xem doanh thu" },
    { key: "analytics.users", label: "Xem thống kê người dùng" },
  ]},
];

const defaultMatrix: Record<string, Record<string, boolean>> = {
  admin: Object.fromEntries(permissions.flatMap((g) => g.items.map((i) => [i.key, true]))),
  teacher: {
    "courses.view": true, "courses.create": true, "courses.edit": true, "courses.delete": false, "courses.publish": false,
    "exams.view": true, "exams.create": true, "exams.edit": true, "exams.delete": false,
    "questions.manage": true,
    "blog.view": true, "blog.create": true, "blog.edit": true, "blog.delete": false, "blog.publish": false,
    "users.view": false, "users.edit": false, "users.ban": false, "users.role": false,
    "system.settings": false, "system.logs": false, "system.roles": false,
    "analytics.results": true, "analytics.revenue": false, "analytics.users": false,
  },
  student: {
    "courses.view": true, "courses.create": false, "courses.edit": false, "courses.delete": false, "courses.publish": false,
    "exams.view": true, "exams.create": false, "exams.edit": false, "exams.delete": false,
    "questions.manage": false,
    "blog.view": true, "blog.create": false, "blog.edit": false, "blog.delete": false, "blog.publish": false,
    "users.view": false, "users.edit": false, "users.ban": false, "users.role": false,
    "system.settings": false, "system.logs": false, "system.roles": false,
    "analytics.results": false, "analytics.revenue": false, "analytics.users": false,
  },
};

const roles = [
  { key: "admin", label: "Quản trị viên", color: "bg-purple-100 text-purple-700", desc: "Toàn quyền truy cập" },
  { key: "teacher", label: "Giáo viên", color: "bg-blue-100 text-blue-700", desc: "Quản lý nội dung" },
  { key: "student", label: "Học viên", color: "bg-gray-100 text-gray-600", desc: "Chỉ xem & học" },
];

export default function AdminRoles() {
  const [matrix, setMatrix] = useState(defaultMatrix);
  const [activeRole, setActiveRole] = useState("teacher");
  const { toast } = useToast();

  const toggle = (roleKey: string, permKey: string) => {
    if (roleKey === "admin") return;
    setMatrix((prev) => ({
      ...prev,
      [roleKey]: { ...prev[roleKey], [permKey]: !prev[roleKey][permKey] },
    }));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {roles.map((r) => (
          <button
            key={r.key}
            onClick={() => setActiveRole(r.key)}
            className={`p-4 rounded-xl border-2 text-left transition-all ${activeRole === r.key ? "border-brand-orange bg-orange-50" : "border-gray-100 bg-white hover:border-gray-200"}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className={`w-4 h-4 ${activeRole === r.key ? "text-brand-orange" : "text-gray-400"}`} />
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${r.color}`}>{r.label}</span>
            </div>
            <p className="text-xs text-gray-500">{r.desc}</p>
          </button>
        ))}
      </div>

      {activeRole === "admin" && (
        <div className="flex items-center gap-2 px-4 py-3 bg-purple-50 rounded-xl border border-purple-200">
          <ShieldCheck className="w-4 h-4 text-purple-600" />
          <p className="text-xs text-purple-700 font-medium">Quản trị viên có toàn quyền truy cập và không thể bị giới hạn.</p>
        </div>
      )}

      <Card className="bg-white border-0 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-800">
            Quyền hạn cho: <span className="text-brand-orange">{roles.find((r) => r.key === activeRole)?.label}</span>
          </p>
          {activeRole !== "admin" && (
            <Button
              size="sm"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white h-8 text-xs"
              onClick={() => toast({ title: "Đã lưu phân quyền", description: "Cấu hình quyền hạn đã được cập nhật." })}
            >
              Lưu thay đổi
            </Button>
          )}
        </div>
        <div className="divide-y divide-gray-50">
          {permissions.map((group) => (
            <div key={group.group} className="px-5 py-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{group.group}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {group.items.map((item) => {
                  const granted = matrix[activeRole]?.[item.key] ?? false;
                  const isAdmin = activeRole === "admin";
                  return (
                    <button
                      key={item.key}
                      onClick={() => toggle(activeRole, item.key)}
                      disabled={isAdmin}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all ${
                        isAdmin || granted
                          ? "bg-green-50 border border-green-200"
                          : "bg-gray-50 border border-gray-200 hover:border-gray-300"
                      } ${isAdmin ? "cursor-default" : "cursor-pointer"}`}
                    >
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${granted || isAdmin ? "bg-green-500" : "bg-gray-300"}`}>
                        {granted || isAdmin ? <Check className="w-2.5 h-2.5 text-white" /> : <X className="w-2.5 h-2.5 text-white" />}
                      </div>
                      <span className={`text-xs font-medium ${granted || isAdmin ? "text-green-700" : "text-gray-500"}`}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

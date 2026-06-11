import { useState } from "react";
import { Search, MoreHorizontal, UserPlus, Eye, Pencil, Ban, ShieldCheck, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const mockUsers = [
  { id: 1, name: "Nguyễn Thị Mai", email: "mai.nguyen@email.com", role: "student", status: "active", courses: 3, joined: "12/01/2025", initials: "NM" },
  { id: 2, name: "Trần Văn Hùng", email: "hung.tran@email.com", role: "student", status: "active", courses: 2, joined: "15/01/2025", initials: "TH" },
  { id: 3, name: "Lê Thị Thu", email: "thu.le@email.com", role: "teacher", status: "active", courses: 8, joined: "01/11/2024", initials: "LT" },
  { id: 4, name: "Phạm Minh Đức", email: "duc.pham@email.com", role: "student", status: "banned", courses: 1, joined: "20/02/2025", initials: "PD" },
  { id: 5, name: "Hoàng Thị Lan", email: "lan.hoang@email.com", role: "student", status: "active", courses: 5, joined: "05/03/2025", initials: "HL" },
  { id: 6, name: "Vũ Quang Minh", email: "minh.vu@email.com", role: "teacher", status: "active", courses: 4, joined: "10/09/2024", initials: "VM" },
  { id: 7, name: "Đỗ Thị Hằng", email: "hang.do@email.com", role: "student", status: "active", courses: 2, joined: "18/03/2025", initials: "DH" },
  { id: 8, name: "Bùi Văn Thắng", email: "thang.bui@email.com", role: "student", status: "active", courses: 4, joined: "22/03/2025", initials: "BT" },
  { id: 9, name: "Ngô Thị Hoa", email: "hoa.ngo@email.com", role: "student", status: "inactive", courses: 0, joined: "28/03/2025", initials: "NH" },
  { id: 10, name: "Đinh Văn An", email: "an.dinh@email.com", role: "admin", status: "active", courses: 0, joined: "01/01/2024", initials: "DA" },
];

const roleLabels: Record<string, { label: string; class: string }> = {
  admin: { label: "Quản trị", class: "bg-purple-100 text-purple-700" },
  teacher: { label: "Giáo viên", class: "bg-blue-100 text-blue-700" },
  student: { label: "Học viên", class: "bg-gray-100 text-gray-600" },
};

const statusLabels: Record<string, { label: string; class: string }> = {
  active: { label: "Hoạt động", class: "bg-green-100 text-green-700" },
  banned: { label: "Bị khoá", class: "bg-red-100 text-red-700" },
  inactive: { label: "Không HĐ", class: "bg-gray-100 text-gray-500" },
};

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [banTarget, setBanTarget] = useState<typeof mockUsers[0] | null>(null);
  const { toast } = useToast();

  const filtered = mockUsers.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleBan = () => {
    toast({
      title: banTarget?.status === "banned" ? "Đã mở khoá tài khoản" : "Đã khoá tài khoản",
      description: `${banTarget?.name} đã được ${banTarget?.status === "banned" ? "mở khoá" : "khoá"}.`,
    });
    setBanTarget(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <Input placeholder="Tìm người dùng..." className="pl-8 h-9 text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 bg-gray-100 p-0.5 rounded-lg">
            {["all", "student", "teacher", "admin"].map((r) => (
              <button key={r} onClick={() => setRoleFilter(r)} className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${roleFilter === r ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"}`}>
                {r === "all" ? "Tất cả" : roleLabels[r].label}
              </button>
            ))}
          </div>
          <Button size="sm" className="bg-brand-orange hover:bg-brand-orange/90 text-white h-9 gap-1.5 text-xs">
            <UserPlus className="w-3.5 h-3.5" /> Thêm người dùng
          </Button>
        </div>
      </div>

      <Card className="bg-white border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Người dùng</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden md:table-cell">Email</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Vai trò</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Trạng thái</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden lg:table-cell">Khóa học</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden lg:table-cell">Ngày tạo</th>
                <th className="text-right text-xs font-semibold text-gray-500 px-4 py-3">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <Users className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Không tìm thấy người dùng</p>
                  </td>
                </tr>
              ) : (
                filtered.map((user) => {
                  const r = roleLabels[user.role];
                  const s = statusLabels[user.status];
                  return (
                    <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-primary-orange flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {user.initials}
                          </div>
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${r.class}`}>{r.label}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.class}`}>{s.label}</span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <p className="text-xs text-gray-700">{user.courses}</p>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <p className="text-xs text-gray-500">{user.joined}</p>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40 text-sm">
                            <DropdownMenuItem><Eye className="w-3.5 h-3.5 mr-2" /> Xem chi tiết</DropdownMenuItem>
                            <DropdownMenuItem><Pencil className="w-3.5 h-3.5 mr-2" /> Chỉnh sửa</DropdownMenuItem>
                            <DropdownMenuItem><ShieldCheck className="w-3.5 h-3.5 mr-2" /> Đổi vai trò</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => setBanTarget(user)}>
                              <Ban className="w-3.5 h-3.5 mr-2" />
                              {user.status === "banned" ? "Mở khoá" : "Khoá tài khoản"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-400">{filtered.length} / {mockUsers.length} người dùng</p>
          <div className="flex gap-1">
            <button className="px-2.5 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50 text-gray-600 disabled:opacity-40" disabled>Trước</button>
            <button className="px-2.5 py-1 text-xs bg-brand-orange text-white rounded">1</button>
            <button className="px-2.5 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50 text-gray-600">Sau</button>
          </div>
        </div>
      </Card>

      <Dialog open={!!banTarget} onOpenChange={() => setBanTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{banTarget?.status === "banned" ? "Mở khoá tài khoản?" : "Khoá tài khoản?"}</DialogTitle>
            <DialogDescription>
              {banTarget?.status === "banned"
                ? `Tài khoản của ${banTarget?.name} sẽ được mở lại.`
                : `Tài khoản của ${banTarget?.name} sẽ bị khoá. Họ sẽ không thể đăng nhập.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBanTarget(null)}>Huỷ</Button>
            <Button variant={banTarget?.status === "banned" ? "default" : "destructive"} onClick={handleBan}>
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

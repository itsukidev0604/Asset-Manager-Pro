import { useState } from "react";
import { Plus, Pencil, Trash2, FolderOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const initialCategories = [
  { id: 1, name: "Toán học", slug: "toan-hoc", type: "HSA", count: 4, status: "active" },
  { id: 2, name: "Ngữ văn", slug: "ngu-van", type: "HSA", count: 3, status: "active" },
  { id: 3, name: "Khoa học tự nhiên", slug: "khoa-hoc-tu-nhien", type: "HSA", count: 2, status: "active" },
  { id: 4, name: "Tư duy Toán học", slug: "tu-duy-toan-hoc", type: "TSA", count: 3, status: "active" },
  { id: 5, name: "Tư duy Đọc hiểu", slug: "tu-duy-doc-hieu", type: "TSA", count: 2, status: "active" },
  { id: 6, name: "Tổng hợp", slug: "tong-hop", type: "Cả hai", count: 2, status: "active" },
  { id: 7, name: "Khoa học xã hội", slug: "khoa-hoc-xa-hoi", type: "HSA", count: 1, status: "active" },
  { id: 8, name: "Giải tích", slug: "giai-tich", type: "HSA", count: 2, status: "active" },
];

export default function AdminCategories() {
  const [categories, setCategories] = useState(initialCategories);
  const [showCreate, setShowCreate] = useState(false);
  const [editTarget, setEditTarget] = useState<typeof initialCategories[0] | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<typeof initialCategories[0] | null>(null);
  const [form, setForm] = useState({ name: "", slug: "", type: "HSA" });
  const { toast } = useToast();

  const handleCreate = () => {
    setCategories((prev) => [
      ...prev,
      { id: Date.now(), ...form, count: 0, status: "active" },
    ]);
    toast({ title: "Đã tạo danh mục", description: `"${form.name}" đã được thêm.` });
    setForm({ name: "", slug: "", type: "HSA" });
    setShowCreate(false);
  };

  const handleDelete = () => {
    setCategories((prev) => prev.filter((c) => c.id !== deleteTarget?.id));
    toast({ title: "Đã xoá danh mục" });
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm" className="bg-brand-orange hover:bg-brand-orange/90 text-white h-9 gap-1.5 text-xs" onClick={() => { setForm({ name: "", slug: "", type: "HSA" }); setShowCreate(true); }}>
          <Plus className="w-3.5 h-3.5" /> Tạo danh mục
        </Button>
      </div>

      <Card className="bg-white border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Tên danh mục</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Slug</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Loại</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Số khóa học</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Trạng thái</th>
                <th className="text-right text-xs font-semibold text-gray-500 px-4 py-3">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center">
                        <FolderOpen className="w-3.5 h-3.5 text-primary-orange" />
                      </div>
                      <p className="text-sm font-medium text-gray-900">{cat.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{cat.slug}</code>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${cat.type === "HSA" ? "bg-orange-100 text-orange-700" : cat.type === "TSA" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                      {cat.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-700">{cat.count}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Hoạt động</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => { setEditTarget(cat); setForm({ name: cat.name, slug: cat.slug, type: cat.type }); }}
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(cat)}
                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">{categories.length} danh mục</p>
        </div>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={showCreate || !!editTarget} onOpenChange={(o) => { if (!o) { setShowCreate(false); setEditTarget(null); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editTarget ? "Chỉnh sửa danh mục" : "Tạo danh mục mới"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Tên danh mục</Label>
              <Input placeholder="Toán học" value={form.name} onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[àáâãäå]/g, "a") })); }} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Slug</Label>
              <Input placeholder="toan-hoc" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Loại</Label>
              <div className="flex gap-2">
                {["HSA", "TSA", "Cả hai"].map((t) => (
                  <button key={t} onClick={() => setForm((f) => ({ ...f, type: t }))} className={`px-3 py-1.5 text-xs rounded-lg border font-medium transition-all ${form.type === t ? "border-brand-orange bg-orange-50 text-brand-orange" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowCreate(false); setEditTarget(null); }}>Huỷ</Button>
            <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white" onClick={handleCreate}>
              {editTarget ? "Lưu thay đổi" : "Tạo danh mục"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xoá danh mục "{deleteTarget?.name}"?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">Hành động này không thể hoàn tác.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Huỷ</Button>
            <Button variant="destructive" onClick={handleDelete}>Xoá</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

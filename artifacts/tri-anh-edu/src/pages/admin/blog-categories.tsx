import { useState } from "react";
import { Plus, Pencil, Trash2, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const initialCategories = [
  { id: 1, name: "Tin tức", slug: "tin-tuc", count: 8 },
  { id: 2, name: "Hướng dẫn ôn thi", slug: "huong-dan-on-thi", count: 12 },
  { id: 3, name: "Kinh nghiệm", slug: "kinh-nghiem", count: 6 },
  { id: 4, name: "HSA", slug: "hsa", count: 15 },
  { id: 5, name: "TSA", slug: "tsa", count: 9 },
  { id: 6, name: "Tài liệu", slug: "tai-lieu", count: 4 },
];

export default function AdminBlogCategories() {
  const [categories, setCategories] = useState(initialCategories);
  const [showCreate, setShowCreate] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<typeof initialCategories[0] | null>(null);
  const [form, setForm] = useState({ name: "", slug: "" });
  const { toast } = useToast();

  const handleCreate = () => {
    setCategories((prev) => [...prev, { id: Date.now(), ...form, count: 0 }]);
    toast({ title: "Đã tạo danh mục blog" });
    setForm({ name: "", slug: "" });
    setShowCreate(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm" className="bg-brand-orange hover:bg-brand-orange/90 text-white h-9 gap-1.5 text-xs" onClick={() => setShowCreate(true)}>
          <Plus className="w-3.5 h-3.5" /> Tạo danh mục
        </Button>
      </div>

      <Card className="bg-white border-0 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Tên</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Slug</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Số bài viết</th>
                <th className="text-right text-xs font-semibold text-gray-500 px-4 py-3">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center">
                        <Tag className="w-3.5 h-3.5 text-primary-orange" />
                      </div>
                      <p className="text-sm font-medium text-gray-900">{cat.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{cat.slug}</code>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-700">{cat.count}</p>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setDeleteTarget(cat)} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent>
          <DialogHeader><DialogTitle>Tạo danh mục Blog mới</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Tên danh mục</Label>
              <Input placeholder="Tin tức" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") }))} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Slug</Label>
              <Input placeholder="tin-tuc" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreate(false)}>Huỷ</Button>
            <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white" onClick={handleCreate}>Tạo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Xoá danh mục "{deleteTarget?.name}"?</DialogTitle></DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Huỷ</Button>
            <Button variant="destructive" onClick={() => { setCategories((p) => p.filter((c) => c.id !== deleteTarget?.id)); setDeleteTarget(null); }}>Xoá</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

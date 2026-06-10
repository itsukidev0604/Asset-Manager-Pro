import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useListBlogPosts } from "@workspace/api-client-react";

const CATEGORIES = ["Tất cả", "Học thuật", "Phân tích đề thi", "Kinh nghiệm", "Tư vấn"];

export default function Blog() {
  const [category, setCategory] = useState("Tất cả");
  const [search, setSearch] = useState("");
  const { data: posts, isLoading } = useListBlogPosts();

  const filtered = (posts ?? []).filter(p => {
    const matchCat = category === "Tất cả" || p.category === category;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#FFFBF5] pt-20">
      <div className="bg-[#102A43] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">Blog</h1>
            <p className="text-white/60 text-lg">Kiến thức và kinh nghiệm từ các chuyên gia luyện thi HSA & TSA</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Tìm kiếm bài viết..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} data-testid="input-search-blog" />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <Button key={cat} size="sm" variant={category === cat ? "default" : "outline"}
                onClick={() => setCategory(cat)}
                className={category === cat ? "bg-[#E85A2A] hover:bg-[#d14f23]" : "border-[#E85A2A]/30 text-[#E85A2A] hover:bg-[#E85A2A]/5"}
                data-testid={`filter-category-${cat}`}>
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <div key={i} className="h-80 rounded-xl bg-muted animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} data-testid={`blog-card-${post.id}`}>
                <Link href={`/blog/${post.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all group cursor-pointer border-border/60 hover:border-[#E85A2A]/30 h-full flex flex-col">
                    <div className="aspect-[16/9] overflow-hidden bg-muted">
                      <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="secondary" className="text-xs bg-[#E85A2A]/10 text-[#E85A2A] border-[#E85A2A]/20">{post.category}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />{post.readingTimeMinutes} phút đọc
                        </span>
                      </div>
                      <h3 className="font-bold text-[#102A43] text-base leading-snug group-hover:text-[#E85A2A] transition-colors mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{post.excerpt}</p>
                      <div className="mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
                        {new Date(post.publishedAt).toLocaleDateString("vi-VN", { year: "numeric", month: "long", day: "numeric" })}
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-20">
            <h3 className="font-semibold text-[#102A43] text-lg mb-2">Không tìm thấy bài viết</h3>
            <p className="text-muted-foreground">Thử thay đổi từ khóa tìm kiếm hoặc danh mục</p>
          </div>
        )}
      </div>
    </div>
  );
}

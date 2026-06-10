import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, ArrowLeft, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useGetBlogPost, getGetBlogPostQueryKey } from "@workspace/api-client-react";

export default function BlogDetail() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id ?? "0", 10);
  const { data: post, isLoading } = useGetBlogPost(id, { query: { enabled: !!id, queryKey: getGetBlogPostQueryKey(id) } });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFBF5] pt-20">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-4 animate-pulse">
          <div className="h-12 bg-muted rounded w-2/3" />
          <div className="h-64 bg-muted rounded-xl" />
          <div className="h-6 bg-muted rounded w-full" />
          <div className="h-6 bg-muted rounded w-5/6" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FFFBF5] pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#102A43] mb-4">Không tìm thấy bài viết</h2>
          <Link href="/blog"><Button className="bg-[#E85A2A]">Quay lại Blog</Button></Link>
        </div>
      </div>
    );
  }

  const contentLines = post.content.split("\n").filter(l => l.trim());

  return (
    <div className="min-h-screen bg-[#FFFBF5] pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/blog">
          <Button variant="ghost" className="text-muted-foreground hover:text-[#102A43] mb-6 -ml-2" data-testid="button-back-blog">
            <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại Blog
          </Button>
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-5">
            <Badge className="bg-[#E85A2A]/10 text-[#E85A2A] border-[#E85A2A]/20">{post.category}</Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readingTimeMinutes} phút đọc</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-[#102A43] mb-6 leading-tight" data-testid="blog-post-title">{post.title}</h1>

          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border/50">
            <img src={post.authorAvatar} alt={post.authorName} className="w-12 h-12 rounded-full border-2 border-[#E85A2A]/20" />
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#102A43]"><User className="w-3.5 h-3.5" />{post.authorName}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5"><Calendar className="w-3 h-3" />{new Date(post.publishedAt).toLocaleDateString("vi-VN", { year: "numeric", month: "long", day: "numeric" })}</div>
            </div>
          </div>

          <div className="aspect-[16/7] rounded-2xl overflow-hidden mb-10">
            <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-lg max-w-none text-[#1F2937]">
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed font-medium">{post.excerpt}</p>
            {contentLines.map((line, i) => {
              if (line.startsWith("# ")) return <h1 key={i} className="text-2xl font-bold text-[#102A43] mt-8 mb-4">{line.slice(2)}</h1>;
              if (line.startsWith("## ")) return <h2 key={i} className="text-xl font-bold text-[#102A43] mt-6 mb-3">{line.slice(3)}</h2>;
              if (line.startsWith("### ")) return <h3 key={i} className="text-lg font-semibold text-[#102A43] mt-4 mb-2">{line.slice(4)}</h3>;
              return <p key={i} className="mb-4 leading-relaxed text-[#1F2937]">{line}</p>;
            })}
          </div>
        </motion.div>

        <div className="mt-12 pt-8 border-t border-border/50">
          <Card className="p-6 bg-gradient-to-r from-[#102A43] to-[#1a3a5e] text-white">
            <h3 className="font-bold text-lg mb-2">Sẵn sàng luyện thi?</h3>
            <p className="text-white/70 text-sm mb-4">Áp dụng những kiến thức vừa học vào luyện đề thực tế ngay hôm nay.</p>
            <div className="flex gap-3">
              <Link href="/exams"><Button className="bg-[#E85A2A] hover:bg-[#d14f23] text-white font-semibold" data-testid="button-go-to-exams">Luyện đề ngay</Button></Link>
              <Link href="/courses"><Button variant="outline" className="border-white/30 text-white hover:bg-white/10">Xem khóa học</Button></Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

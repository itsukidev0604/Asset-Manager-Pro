import { Link } from "wouter";
import { motion } from "framer-motion";
import { Star, Users, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useListTeachers } from "@workspace/api-client-react";

export default function Teachers() {
  const { data: teachers, isLoading } = useListTeachers();

  return (
    <div className="min-h-screen bg-[#FFFBF5] pt-20">
      <div className="bg-[#102A43] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">Đội Ngũ Giáo Viên</h1>
            <p className="text-white/60 text-lg">Những chuyên gia hàng đầu về luyện thi HSA và TSA tại Việt Nam</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => <div key={i} className="h-72 rounded-xl bg-muted animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(teachers ?? []).map((teacher, i) => (
              <motion.div key={teacher.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} data-testid={`teacher-card-${teacher.id}`}>
                <Link href={`/teachers/${teacher.id}`}>
                  <Card className="p-6 text-center hover:shadow-lg transition-all group cursor-pointer border-border/60 hover:border-[#E85A2A]/30">
                    <img src={teacher.avatar} alt={teacher.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-[#E85A2A]/20 group-hover:border-[#E85A2A]/50 transition-all" />
                    <h3 className="font-bold text-[#102A43] text-lg mb-1 group-hover:text-[#E85A2A] transition-colors">{teacher.name}</h3>
                    <p className="text-xs text-muted-foreground mb-4 leading-relaxed min-h-[2.5rem]">{teacher.specialization}</p>
                    <div className="flex items-center justify-center gap-4 text-sm mb-4">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Star className="w-4 h-4 text-[#F2C230] fill-[#F2C230]" />
                        <span className="font-bold text-[#1F2937]">{teacher.rating?.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">{teacher.studentsCount.toLocaleString("vi-VN")}</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border/50">
                      <Badge variant="secondary" className="text-xs">{teacher.experienceYears} năm kinh nghiệm</Badge>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

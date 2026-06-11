import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Card } from "@/components/ui/card";
import { TrendingUp, Award, Target, Users } from "lucide-react";

const scoreDistribution = [
  { range: "0-20", count: 12 },
  { range: "21-40", count: 34 },
  { range: "41-60", count: 89 },
  { range: "61-80", count: 156 },
  { range: "81-100", count: 210 },
  { range: "101-120", count: 178 },
  { range: "121-140", count: 95 },
  { range: "141-150", count: 48 },
];

const weeklyAttempts = [
  { day: "T2", hsa: 45, tsa: 28 },
  { day: "T3", hsa: 62, tsa: 35 },
  { day: "T4", hsa: 58, tsa: 42 },
  { day: "T5", hsa: 71, tsa: 38 },
  { day: "T6", hsa: 84, tsa: 55 },
  { day: "T7", hsa: 110, tsa: 72 },
  { day: "CN", hsa: 95, tsa: 63 },
];

const topicPerformance = [
  { topic: "Toán đại số", score: 72 },
  { topic: "Toán giải tích", score: 65 },
  { topic: "Đọc hiểu Văn", score: 78 },
  { topic: "Nghị luận", score: 61 },
  { topic: "Khoa học TN", score: 70 },
  { topic: "Tư duy logic", score: 68 },
];

const completionData = [
  { name: "Hoàn thành", value: 76, color: "#E85A2A" },
  { name: "Bỏ dở", value: 15, color: "#F7941D" },
  { name: "Chưa bắt đầu", value: 9, color: "#E5E7EB" },
];

const topStudents = [
  { rank: 1, name: "Nguyễn Thị Mai", score: 148, exams: 12, initials: "NM" },
  { rank: 2, name: "Trần Văn Hùng", score: 145, exams: 9, initials: "TH" },
  { rank: 3, name: "Lê Minh Khoa", score: 142, exams: 15, initials: "LK" },
  { rank: 4, name: "Phạm Thị Lan", score: 139, exams: 8, initials: "PL" },
  { rank: 5, name: "Hoàng Văn Đức", score: 137, exams: 11, initials: "HD" },
];

const statsCards = [
  { label: "Tổng lượt thi", value: "8.420", icon: Users, color: "bg-blue-50 text-blue-600", sub: "tuần này" },
  { label: "Điểm trung bình", value: "87.3", icon: TrendingUp, color: "bg-green-50 text-green-600", sub: "/150 điểm" },
  { label: "Tỉ lệ hoàn thành", value: "76%", icon: Target, color: "bg-orange-50 text-orange-600", sub: "trên tổng" },
  { label: "Điểm cao nhất", value: "148", icon: Award, color: "bg-purple-50 text-purple-600", sub: "/150 điểm" },
];

export default function AdminResults() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {statsCards.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="p-4 bg-white border-0 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-medium">{s.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-0.5">{s.value}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{s.sub}</p>
                </div>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.color}`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2 p-5 bg-white border-0 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Lượt thi theo ngày</h3>
            <p className="text-xs text-gray-400">Tuần này</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyAttempts} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", fontSize: 12 }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="hsa" name="HSA" fill="#E85A2A" radius={[3, 3, 0, 0]} />
              <Bar dataKey="tsa" name="TSA" fill="#F7941D" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5 bg-white border-0 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Tỉ lệ hoàn thành</h3>
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={completionData} cx="50%" cy="50%" innerRadius={42} outerRadius={65} paddingAngle={2} dataKey="value">
                {completionData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-1">
            {completionData.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                  <span className="text-xs text-gray-600">{d.name}</span>
                </div>
                <span className="text-xs font-semibold text-gray-800">{d.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card className="p-5 bg-white border-0 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Phân bổ điểm số</h3>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={scoreDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="range" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", fontSize: 12 }} />
              <Bar dataKey="count" name="Học viên" fill="#102A43" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5 bg-white border-0 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Điểm trung bình theo chủ đề</h3>
          </div>
          <div className="space-y-3">
            {topicPerformance.map((t) => (
              <div key={t.topic}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-700">{t.topic}</span>
                  <span className="text-xs font-semibold text-gray-900">{t.score}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${t.score}%`, background: t.score >= 75 ? "#E85A2A" : t.score >= 65 ? "#F7941D" : "#F2C230" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5 bg-white border-0 shadow-sm">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-900">Top học viên xuất sắc</h3>
        </div>
        <div className="space-y-2">
          {topStudents.map((s) => (
            <div key={s.rank} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${s.rank === 1 ? "bg-yellow-100 text-yellow-700" : s.rank === 2 ? "bg-gray-100 text-gray-600" : s.rank === 3 ? "bg-orange-100 text-orange-700" : "bg-gray-50 text-gray-500"}`}>
                {s.rank}
              </div>
              <div className="w-7 h-7 rounded-full bg-primary-orange flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                {s.initials}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{s.name}</p>
                <p className="text-xs text-gray-400">{s.exams} đề đã làm</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-brand-orange">{s.score}</p>
                <p className="text-[10px] text-gray-400">điểm cao nhất</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

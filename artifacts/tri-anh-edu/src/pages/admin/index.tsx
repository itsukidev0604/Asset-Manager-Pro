import { useState, useEffect } from "react";
import {
  Users, BookOpen, ClipboardList, TrendingUp, ArrowUp,
  ArrowDown, CheckCircle, Clock, Star, BookMarked, UserPlus,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { useGetStats } from "@workspace/api-client-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const enrollmentData = [
  { month: "T1", hsa: 120, tsa: 80 },
  { month: "T2", hsa: 145, tsa: 95 },
  { month: "T3", hsa: 160, tsa: 110 },
  { month: "T4", hsa: 200, tsa: 140 },
  { month: "T5", hsa: 230, tsa: 160 },
  { month: "T6", hsa: 280, tsa: 195 },
];

const revenueData = [
  { month: "T1", revenue: 42000000 },
  { month: "T2", revenue: 58000000 },
  { month: "T3", revenue: 51000000 },
  { month: "T4", revenue: 74000000 },
  { month: "T5", revenue: 89000000 },
  { month: "T6", revenue: 102000000 },
];

const examPieData = [
  { name: "HSA", value: 68, color: "#E85A2A" },
  { name: "TSA", value: 32, color: "#F7941D" },
];

const activities = [
  { icon: UserPlus, color: "bg-blue-100 text-blue-600", text: "Nguyễn Thị Mai đăng ký khóa Toán HSA", time: "2 phút trước" },
  { icon: CheckCircle, color: "bg-green-100 text-green-600", text: "Trần Văn Hùng hoàn thành đề thi HSA 2024", time: "15 phút trước" },
  { icon: BookMarked, color: "bg-purple-100 text-purple-600", text: "Bài viết 'Chiến lược ôn thi HSA' đã xuất bản", time: "1 giờ trước" },
  { icon: Star, color: "bg-yellow-100 text-yellow-600", text: "Lê Minh Đức đánh giá 5★ khóa Ngữ văn HSA", time: "2 giờ trước" },
  { icon: UserPlus, color: "bg-blue-100 text-blue-600", text: "Phạm Thị Hoa đăng ký tài khoản mới", time: "3 giờ trước" },
  { icon: ClipboardList, color: "bg-orange-100 text-orange-600", text: "Đề thi thử TSA Toán 2025 đã được tạo", time: "5 giờ trước" },
];

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [displayed, setDisplayed] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(value / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setDisplayed(value); clearInterval(timer); }
      else setDisplayed(start);
    }, 30);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{prefix}{displayed.toLocaleString("vi-VN")}{suffix}</span>;
}

function formatRevenue(v: number) {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(0)}M`;
  return v.toLocaleString("vi-VN");
}

export default function AdminOverview() {
  const { data: stats } = useGetStats();

  const kpis = [
    {
      label: "Tổng học viên",
      value: stats?.totalStudents ?? 5240,
      change: "+12%",
      up: true,
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Tổng khóa học",
      value: stats?.totalCourses ?? 24,
      change: "+2",
      up: true,
      icon: BookOpen,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Tổng đề thi",
      value: stats?.totalExams ?? 312,
      change: "+18",
      up: true,
      icon: ClipboardList,
      color: "bg-orange-50 text-orange-600",
    },
    {
      label: "Doanh thu tháng",
      value: 102000000,
      prefix: "",
      suffix: "đ",
      change: "+15%",
      up: true,
      icon: TrendingUp,
      color: "bg-green-50 text-green-600",
    },
  ];

  return (
    <div className="space-y-5">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className="p-5 bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">{kpi.label}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {kpi.label === "Doanh thu tháng" ? (
                      <span>
                        <AnimatedNumber value={102} />M đ
                      </span>
                    ) : (
                      <AnimatedNumber value={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} />
                    )}
                  </p>
                  <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${kpi.up ? "text-green-600" : "text-red-500"}`}>
                    {kpi.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    {kpi.change} so với tháng trước
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Enrollment Chart */}
        <Card className="xl:col-span-2 p-5 bg-white border-0 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Lượt đăng ký</h3>
              <p className="text-xs text-gray-400">6 tháng gần nhất</p>
            </div>
            <Badge variant="secondary" className="text-xs">HSA & TSA</Badge>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={enrollmentData}>
              <defs>
                <linearGradient id="hsaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E85A2A" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#E85A2A" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="tsaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F7941D" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#F7941D" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", fontSize: 12 }}
              />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="hsa" name="HSA" stroke="#E85A2A" fill="url(#hsaGrad)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="tsa" name="TSA" stroke="#F7941D" fill="url(#tsaGrad)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Exam type pie */}
        <Card className="p-5 bg-white border-0 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Phân bổ lượt thi</h3>
            <p className="text-xs text-gray-400">HSA vs TSA</p>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={examPieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                {examPieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {examPieData.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-xs text-gray-600">{d.name}</span>
                </div>
                <span className="text-xs font-semibold text-gray-800">{d.value}%</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">87.3</p>
              <p className="text-[10px] text-gray-400">Điểm TB</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">76%</p>
              <p className="text-[10px] text-gray-400">Hoàn thành</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <Card className="xl:col-span-2 p-5 bg-white border-0 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Doanh thu</h3>
              <p className="text-xs text-gray-400">6 tháng gần nhất (VNĐ)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={revenueData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={formatRevenue} tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(v: number) => [`${(v / 1_000_000).toFixed(0)}M đ`, "Doanh thu"]}
                contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", fontSize: 12 }}
              />
              <Bar dataKey="revenue" fill="#E85A2A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent Activity */}
        <Card className="p-5 bg-white border-0 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Hoạt động gần đây</h3>
          </div>
          <div className="space-y-3">
            {activities.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="flex gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${a.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 leading-relaxed">{a.text}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Clock className="w-2.5 h-2.5 text-gray-300" />
                      <p className="text-[10px] text-gray-400">{a.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

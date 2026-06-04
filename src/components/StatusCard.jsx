import {
  Package,
  Users,
  FileText,
  MessageSquareText,
} from "lucide-react";
import { useProduct } from "../context/ProductContext";

const StatsCards = () => {
  const {
    totalProducts,
    totalUsers,
    totalPost,
    totalComments,
  } = useProduct();

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      subtitle: "Available products",
      icon: Package,
    },
    {
      title: "Total Users",
      value: totalUsers,
      subtitle: "Registered users",
      icon: Users,
    },
    {
      title: "Total Posts",
      value: totalPost,
      subtitle: "Published posts",
      icon: FileText,
    },
    {
      title: "Total Comments",
      value: totalComments,
      subtitle: "User comments",
      icon: MessageSquareText,
    },
  ];

  return (
    <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
         <h2 className="mb-6 text-xl font-bold text-slate-900">
      Dashboard Overview
    </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-100 bg-slate-50 p-6 "
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100">
                <Icon size={24} className="text-violet-600" />
              </div>

              <div>
                <p className="text-sm text-slate-500">{item.title}</p>

                <h2 className="text-3xl font-bold text-slate-900">
                  {item.value}
                </h2>

                <p className="text-sm text-slate-500">
                  {item.subtitle}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      </div>
      
    </section>
  );
};

export default StatsCards;
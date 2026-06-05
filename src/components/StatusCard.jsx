import { Package, Users, FileText, MessageSquareText } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const AnimatedCount = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const duration = 0.8;
    const totalFrames = Math.round(duration * 60);
    const frameDuration = 1000 / 60;

    const counter = setInterval(() => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      setCount(Math.round(value * progress));

      if (progress === 1) {
        clearInterval(counter);
      }
    }, frameDuration);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="text-3xl font-bold text-slate-900"
    >
      {count}
    </motion.span>
  );
};

const cardsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const StatsCards = () => {


  const { totalProducts, totalUsers, totalPost, totalComments } = useSelector(
    (state) => ({
      totalProducts: state.products.totalProducts,
      totalUsers: state.users.totalUsers,
      totalPost: state.posts.totalPost,
      totalComments: state.comments.totalComments,
    }),
  );

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
    <motion.section
      initial="hidden"
      animate="visible"
      variants={cardsVariants}
      className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-6 text-xl font-bold text-slate-900">
        Dashboard Overview
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              variants={cardVariants}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100">
                  <Icon size={24} className="text-violet-600" />
                </div>

                <div>
                  <p className="text-sm text-slate-500">{item.title}</p>

                  <AnimatedCount value={item.value} />

                  <p className="text-sm text-slate-500">{item.subtitle}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default StatsCards;

import React from "react";

interface StatCardProps {
  title: string;
  amount: number;
  color: string;
  icon: React.ReactNode;
}

const StatCard = ({
  title,
  amount,
  color,
  icon,
}: StatCardProps) => {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      p-6
      shadow-lg
      hover:shadow-2xl
      hover:-translate-y-1
      duration-300
      "
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2
            className={`text-4xl font-bold mt-2 ${color}`}
          >
            {amount} TJS
          </h2>
        </div>

        <div
          className="
          w-14
          h-14
          rounded-2xl
          bg-slate-100
          flex
          items-center
          justify-center
          "
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
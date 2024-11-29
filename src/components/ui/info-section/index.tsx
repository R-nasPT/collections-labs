import { cn } from "@/utils";
import { FaChevronRight } from "react-icons/fa";
import { IconType } from "react-icons/lib";

interface InfoSectionProps {
  title: string;
  icon: IconType;
  subtitle?: string;
  infoItems: {
    label: string;
    value: string | number;
    valueClassName?: string;
  }[];
  onClickAction?: () => void;
}

export default function InfoSection({
  title,
  icon: Icon,
  subtitle,
  infoItems,
  onClickAction,
}: InfoSectionProps) {
  return (
    <section
      className={cn(
        "bg-white border border-gray-200 rounded-xl p-4 mb-4",
        onClickAction &&
          "cursor-pointer group hover:shadow-md hover:border-purple-200",
        "transition-all duration-300 active:scale-[0.99]"
      )}
      onClick={onClickAction}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Icon className="text-purple-500" size={24} />
          <div className="flex items-center">
            <h2 className="text-2xl text-[#6134bd] font-semibold">
              {title}
              {subtitle && (
                <span className="text-purple-600 text-sm ml-2 font-normal">
                  {subtitle}
                </span>
              )}
            </h2>
          </div>
        </div>
        {onClickAction && (
          <FaChevronRight
            className="text-purple-500 group-hover:translate-x-1 transition-transform"
            size={24}
          />
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm text-gray-600 mb-3">
        {infoItems.map((item, index) => (
          <div key={index} className="flex flex-col">
            <span className="font-medium text-gray-800">{item.label}</span>
            <span className={item.valueClassName}>{item.value}</span>
          </div>
        ))}
      </div>

      {onClickAction && (
        <p className="text-gray-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          คลิกเพื่อดูรายละเอียดเพิ่มเติม
        </p>
      )}
    </section>
  );
}

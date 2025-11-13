import { useState } from "react";
import { FaChevronDown, FaChevronRight, FaTrash, FaEdit } from "react-icons/fa";

interface NodeProps {
  item: any;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
}

const CategoryNode = ({ item, onEdit, onDelete }: NodeProps) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full">
      <div
        className="flex items-center justify-between bg-gray-200 rounded px-3 py-2 cursor-pointer"
      >
        {/* عنوان */}
        <div className="flex items-center gap-2">
          {item.children?.length > 0 ? (
            <span onClick={() => setOpen(!open)}>
              {open ? <FaChevronDown /> : <FaChevronRight />}
            </span>
          ) : (
            <span className="w-3"></span>
          )}

          <span>{item.title}</span>
        </div>

        {/* دکمه‌ها */}
        <div className="flex gap-4 text-blue-700 text-sm">
          <button
            onClick={() => onEdit(item)}
            className="flex items-center gap-1"
          >
            <FaEdit className="text-cyan-600" /> ویرایش
          </button>

          <button
            onClick={() => onDelete(item)}
            className="flex items-center gap-1 text-red-500"
          >
            <FaTrash /> حذف
          </button>
        </div>
      </div>

      {/* نمایش زیر دسته‌ها */}
      {open && item.children?.length > 0 && (
        <div className="pl-6 mt-2 flex flex-col gap-2 border-r pr-3 border-gray-300">
          {item.children.map((child: any) => (
            <CategoryNode
              key={child.id}
              item={child}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryNode;


import CategoryNode from "../../pages/courseManagment/CategoryNode.tsx";

interface CategoryItem {
  id: number;
  title: string;
  children: CategoryItem[];
}

interface Props {
  data: CategoryItem[];
  onEdit: (item: CategoryItem) => void;
  onDelete: (item: CategoryItem) => void;
}

const CategoryTree = ({ data, onEdit, onDelete }: Props) => {
  return (
    <div className="w-full flex flex-col gap-2 px-2 md:px-10">
      {data.map((cat) => (
        <CategoryNode
          key={cat.id}
          item={cat}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CategoryTree;

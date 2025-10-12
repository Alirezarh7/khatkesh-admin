import { Link } from 'react-router-dom';
interface IProps {
  items: {
    label: string;
    url?: string;
  }[];
}
const Breadcrumb = ({ items = [] }: IProps) => {
  const isNotFinalIndex = (index: number) => {
    return items.length > 1 && index < items.length - 1;
  };

  return (
    <nav>
      <ol className='flex items-center gap-2'>
        <li>
          <Link className='font-medium' to='/'>
            خانه /
          </Link>
        </li>
        {items.map((item, index) =>
          isNotFinalIndex(index) && item.url ? (
            <Link key={index} className='font-medium' to={item.url}>
              {item.label} /
            </Link>
          ) : (
            <li key={index} className='font-medium text-primary'>
              {item.label}
            </li>
          )
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

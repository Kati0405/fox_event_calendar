import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  let currentLink = '';

  const crumbs = location.pathname
    .split('/')
    .filter((crumb) => crumb !== '')
    .map((crumb, index, array) => {
      currentLink += `/${crumb}`;
      const formattedCrumb = crumb.replace('_', ' ');
      const capitalizedCrumb =
        formattedCrumb.charAt(0).toUpperCase() + formattedCrumb.slice(1);
      return (
        <div
          className={`crumb text-base ${
            index === array.length - 1 ? 'text-green-500' : 'text-dark-blue'
          } flex items-center`}
          key={crumb}
        >
          <Link
            to={currentLink}
            className='hover:underline underline-offset-2  '
          >
            {capitalizedCrumb}
          </Link>
          {index < array.length - 1 && <span className='mx-2'>{'>'}</span>}
        </div>
      );
    });
  return (
    <div className='flex flex-row breadcrumbs text-base my-4'>{crumbs}</div>
  );
};

export default Breadcrumbs;

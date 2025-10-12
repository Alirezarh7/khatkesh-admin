import {Link} from "react-router-dom";


const LinkPages = () => {
    const pages = [
        { name: 'صفحه اصلی', href: '/' },
        { name: 'فروشگاه', href: '/shop' },
        { name: 'تماس با ما', href: '/contact' }
    ];

    return (
        <div className=' max-lg:hidden flex items-center justify-center space-x-24 mt-2 space-x-reverse'>
            {pages.map((page) => (
                <Link key={page.name} to={page.href}>
                    <p className='font-bold '>{page.name}</p>
                </Link>
            ))}
        </div>
    );
};

export default LinkPages;


// bg-gradient-to-l from-[#e0bd2f] to-black inline-block text-transparent bg-clip-text
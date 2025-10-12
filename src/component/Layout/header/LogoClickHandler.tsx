import {Link} from "react-router-dom";

const LogoClickHandler = () => {

	return (
		<>
			<div className=' max-lg:hidden bg-amber-50 w-28 h-28 rounded-b-2xl shadow-md '>
				<Link to="/">
				<img
					src="/image/zamani-fard-logo.jpg"
					alt="ایمن پوشاک زمانی فرد"
					className="p-2 cursor-pointer h-full w-full rounded-2xl"
				/>
				</Link>
			</div>
			<div className=' lg:hidden bg-amber-50 w-24 h-24 rounded-b-2xl shadow-md '>
			</div>
		</>
	);
};

export default LogoClickHandler;

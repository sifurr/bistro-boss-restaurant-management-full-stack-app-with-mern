import Cover from "../../shared/Cover/Cover";
import MenuItem from "../../shared/MenuItem/MenuItem";
import {Link} from 'react-router-dom'



const MenuCategory = ({ items, title, img }) => {
    return (
        <div className="pt-20">
            {title && <Cover img={img} title={title}></Cover>}
            <div className="grid md:grid-cols-2 my-8 gap-10">
                {
                    items?.map(item =>
                        <MenuItem
                            key={item._id}
                            item={item}
                        >

                        </MenuItem>)
                }
            </div>
            <Link to={`/order/${title}`}>
                <button className="btn btn-outline border-0 border-b-4 text-black">Order Now</button>
            </Link>
        </div>
    );
};

export default MenuCategory;
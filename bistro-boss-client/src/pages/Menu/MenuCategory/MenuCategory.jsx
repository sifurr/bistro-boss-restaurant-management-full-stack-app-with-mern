import Cover from "../../shared/Cover/Cover";
import MenuItem from "../../shared/MenuItem/MenuItem";

        
        
const MenuCategory = ({items, title, img}) => {
    return (
        <div className="pt-20">
           { title && <Cover img={img} title={title}></Cover>}
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
        </div>
    );
};

export default MenuCategory;
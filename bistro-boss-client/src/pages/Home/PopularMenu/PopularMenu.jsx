import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";



const PopularMenu = () => {
    const [menu] = useMenu()
    const popular = menu.filter(item => item.category === 'popular');

    return (
        <div className="mb-8">
            <SectionTitle
                subHeading={"Check it out"}
                heading={"FROM OUR MENU"}
            >
            </SectionTitle>
            <div className="grid md:grid-cols-2 gap-10">
                {
                    popular?.map(item =>
                        <MenuItem
                            key={item._id}
                            item={item}
                        >

                        </MenuItem>)
                }
            </div>
            <div className="flex justify-center items-center mt-14">
                <button className="btn text-center btn-outline border-0 border-b-4 text-black">View Full Menu</button>
            </div>
        </div>
    );
};

export default PopularMenu;
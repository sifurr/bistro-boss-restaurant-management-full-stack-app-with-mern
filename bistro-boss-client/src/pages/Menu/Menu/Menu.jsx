import { Helmet } from 'react-helmet-async';        
import Cover from '../../shared/Cover/Cover';
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

import menuImg from '../../../assets/menu/banner3.jpg'
import desertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'


        
const Menu = () => {
    const [menu] = useMenu()
    const desserts = menu.filter(item => item.category === 'dessert');
    const soups = menu.filter(item => item.category === 'soup');
    const salads = menu.filter(item => item.category === 'salad');
    const pizzas = menu.filter(item => item.category === 'pizza');
    const offered = menu.filter(item => item.category === 'offered');

    return (
        <div>
            <Helmet>
                <title>Bistro Boss| Menu</title>
            </Helmet>
            {/* main cover */}
           <Cover 
           img={menuImg}
           title="our menu"
           subHeading="Would you like to try a dish?"
           >            
           </Cover>
           <SectionTitle
           subHeading="Don't Miss"
           heading="Today's Offer"
           >
           </SectionTitle>
        {/* offered menu */}
           <MenuCategory items={offered} ></MenuCategory>
           {/* desert */}
           <MenuCategory items={desserts} title="dessert" img={desertImg}></MenuCategory>
          {/* pizza */}
           <MenuCategory items={pizzas} title="Pizza" img={pizzaImg}></MenuCategory>
          {/* salad */}
           <MenuCategory items={salads} title="Salads" img={saladImg}></MenuCategory>
           {/* soup */}
           <MenuCategory items={soups} title="soup" img={soupImg}></MenuCategory>
           
        </div>
    );
};

export default Menu;
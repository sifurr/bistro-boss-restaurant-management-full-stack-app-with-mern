import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featured from '../../../assets/home/featured.jpg'
import './Featured.css'

        
const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-8 my-20">
           <SectionTitle
           subHeading={"Check it out"}
           heading={"from our menu"}
           >
           </SectionTitle>
           <div className="md:flex justify-center items-center bg-slate-700 bg-opacity-50 pb-20 pt-8 px-36">
            <div>
                <img src={featured} alt="" />
            </div>
            <div className="md:ml-10 text-white space-y-2">
                <p className="text-xl">March 20, 2023</p>
                <h3 className="uppercase text-2xl">WHERE CAN I GET SOME?</h3>
                <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.
                </p>
                <button className="btn btn-outline border-0 border-b-4 text-white">Default</button>
            </div>
           </div>
        </div>
        
    );
};

export default Featured;
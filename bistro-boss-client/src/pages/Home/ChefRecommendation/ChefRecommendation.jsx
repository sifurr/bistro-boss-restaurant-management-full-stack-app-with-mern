import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useEffect, useState } from "react";
import ChefItem from "../../shared/ChefItem/ChefItem";


const ChefRecommendation = () => {

    const [recommendations, setRecommendations] = useState()

    useEffect(() => {
        fetch("./menu.json")
            .then(res => res.json())
            .then(data => {
                const popularItems = data.filter(item => item.category === 'salad')
                setRecommendations(popularItems)
            })
    }, [])

    return (
        <section>
            <SectionTitle
                subHeading="CHEF RECOMMENDS"
                heading="Should Try"
            >
            </SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    recommendations?.slice(0,3).map(item =>
                        <ChefItem 
                        key={item._id}
                        item={item}
                        >
                        </ChefItem>
                        )
                }
            </div>
        </section>
    );
};

export default ChefRecommendation;
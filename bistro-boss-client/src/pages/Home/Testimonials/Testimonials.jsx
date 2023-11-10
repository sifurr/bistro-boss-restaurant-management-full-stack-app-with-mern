import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'


const Testimonials = () => {
    const [reviews, setReviews] = useState()

    useEffect(() => {
        fetch("./reviews.json")
            .then(res => res.json())
            .then(data => {
                setReviews(data)
            })
    }, [])

    console.log(reviews?.length);

    return (
        <section className="my-20">
            <SectionTitle
                subHeading={"What Our Clients Say"}
                heading={"TESTIMONIALS"}
            >
            </SectionTitle>

            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews?.map(review =>
                        <SwiperSlide key={review._id}>

                            <div className="mx-20 my-8 flex flex-col items-center">
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <p className="py-8">{review.details}</p>
                                <h3 className="text-2xl text-[#CD9003]">{review.name}</h3>
                            </div>

                        </SwiperSlide>
                    )
                }

            </Swiper>


        </section>
    );
};

export default Testimonials;
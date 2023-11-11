

const ChefItem = ({ item }) => {
    const { name, image, recipe } = item || {}
    return (
        <div className="flex">
            <div className="flex-1 bg-base-100 shadow-xl text-center flex flex-col">
                <figure>
                    <img className="w-full" src={image} alt="chef recommendation" />
                </figure>
                <div className="space-y-3 p-4 flex-grow">
                    <h2 className="text-center font-semibold text-2xl">{name}</h2>
                    <p>{recipe}</p>
                </div>
                <div className="mt-auto">
                    <button className="btn mb-5 bg-[#E8E8E8] rounded-t-none rounded-b-2 text-[#BB8506] border border-b-2 border-b-[#BB8506]">
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>




    );
};

export default ChefItem;
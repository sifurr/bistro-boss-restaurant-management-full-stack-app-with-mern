import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from 'sweetalert2'
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
    const { name, image, price, recipe, _id } = item || {}
    const { user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const axiosSecure = useAxiosSecure()
    const [, refetch] = useCart()

    const handleAddToCart = () => {
       
        if (user && user.email) {
            // add data to the database
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }

            axiosSecure.post(`/carts`, cartItem)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${name} added to your cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // refetch the cart to update the cart item's count
                        refetch();
                    }
                })
        } else {
            Swal.fire({
                title: "You are not logged in",
                text: "Please login to add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }

    return (
        <div className="flex">
            <div className="flex-1 shadow-xl bg-[#F3F3F3] text-center flex flex-col">
                <figure>
                    <img className="w-full" src={image} alt="chef recommendation" />
                    <p className="bg-[#BB8506] font-bold  text-white">${price}</p>
                </figure>
                <div className="space-y-3 p-4 flex-grow ">
                    <h2 className="text-center font-semibold text-2xl">{name}</h2>
                    <p>{recipe}</p>
                </div>
                <div className="mt-auto">
                    <button
                        onClick={handleAddToCart}
                        className="btn mb-5 hover:bg-black   bg-[#E8E8E8] rounded-t-none rounded-b-2 text-[#BB8506] border border-b-2 border-b-[#BB8506]">
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
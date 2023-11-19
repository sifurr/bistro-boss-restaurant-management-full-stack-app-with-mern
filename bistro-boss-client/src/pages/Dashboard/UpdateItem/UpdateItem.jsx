import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

    
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
        

const UpdateItem = () => {
    const {name, category, recipe, price, _id} = useLoaderData();
    const { register, handleSubmit, reset } = useForm()
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    

    const onSubmit = async (data) => {
        
        // upload an image to the imagebb, and then get an url
        const imageFile = {image: data.image[0]} ;
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {"content-type": "multipart/form-data"}
        } )
        console.log(res.data)
        if(res.data.success){
            // now send the menu item data to the server with image url
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }

            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);

            console.log(menuRes.data);

            if(menuRes.data.modifiedCount > 0)
            {
                reset();
                
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${name} has been added in the menu`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }

        console.log("Image url",data)
    }

    return (
        <div>
           <SectionTitle
           heading="Update Item"
           subHeading="Edit and update the item"
           >
           </SectionTitle>

           <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Recipe name</span>
                        </label>
                        <input {...register("name", { required: true })}
                            type="text"
                            defaultValue={name}
                            placeholder="Recipe name"
                            className="input input-bordered w-full" />
                    </div>
                    {/* price and category */}
                    <div className="flex gap-6">
                        {/* category  */}

                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <select {...register("category", { required: true })}
                                defaultValue={category}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>

                        {/* price  */}
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input {...register("price", { required: true })}
                                type="number"
                                defaultValue={price}
                                placeholder="Price"
                                className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe Details</span>
                        </label>
                        <textarea
                            {...register("recipe", { required: true })}
                            className="textarea textarea-bordered h-24"
                            defaultValue={recipe}
                            placeholder="Recipe Details">
                        </textarea>
                    </div>
                    <div>
                        <input {...register("image", { required: true })}
                            type="file"
                            className="file-input w-full max-w-xs" />
                    </div>
                    <br />
                    <button className="btn">Update Menu Item <FaSave /></button>
                </form>
            </div>

        </div>
    );
};

export default UpdateItem;
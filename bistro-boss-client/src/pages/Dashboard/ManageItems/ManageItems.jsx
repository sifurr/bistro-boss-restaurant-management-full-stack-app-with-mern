import { FaEdit, FaTrash } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageItems = () => {

    const [menu, refetch, loading] = useMenu();
    const axiosSecure = useAxiosSecure()

    const handleDeleteItem = item => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, delete ${item.name}`
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`);
                // console.log(res.data);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: `${item.name} has been deleted.`,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500

                    });
                }


            }
        });

    }

    return (
        <div>
            <SectionTitle
                heading="Manage All Items"
                subHeading="Hurry up"
            >
            </SectionTitle>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menu.map((item, index) =>

                                <tr key={item._id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="menu item" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td className="text-right">
                                        ${item.price}
                                    </td>
                                    <td>
                                        <Link to={`/dashboard/update-tem/${item._id}`}>
                                            <button className="btn btn-ghost btn-lg">
                                                <FaEdit className="text-blue-500"></FaEdit>
                                            </button>
                                        </Link>
                                    </td>
                                    <button onClick={() => handleDeleteItem(item)} className="btn btn-ghost btn-lg">
                                        <FaTrash className="text-red-500"></FaTrash>
                                    </button>
                                </tr>

                            )
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default ManageItems;
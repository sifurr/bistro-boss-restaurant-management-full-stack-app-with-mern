import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrash, FaUserAlt } from "react-icons/fa";
import Swal from "sweetalert2";


const AllUsers = () => {

    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            // get users with access token
            // using 2nd best option of sending cookies to the server
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })


    const handleMakeAdmin = user => {
        Swal.fire({
            title: "Change user to Admin?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "No",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${user._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: `${user.name} is admin now`,
                                text: "",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        });

    }

    const handleDelete = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete the user!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });

    }
    return (
        <div>
            <div className="flex justify-evenly">
                <h2 className='text-3xl text-center'>All Users</h2>
                <h2 className='text-3xl text-center'>Total user: {users.length}</h2>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((user, index) =>
                                    <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td> {user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                user?.role === 'admin' ? "Admin"
                                                    :
                                                    <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost btn-lg">
                                                        <FaUserAlt className="text-blue-500"></FaUserAlt>
                                                    </button>}
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(user)} className="btn btn-ghost btn-lg">
                                                <FaTrash className="text-red-500"></FaTrash>
                                            </button>
                                        </td>
                                    </tr>


                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
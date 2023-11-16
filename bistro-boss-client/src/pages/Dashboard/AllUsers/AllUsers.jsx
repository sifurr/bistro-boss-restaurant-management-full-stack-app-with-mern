import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrash, FaUserAlt } from "react-icons/fa";



const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })

    const handleDelete = id => {

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
                                users?.map(user =>
                                    <tr key={user._id}>
                                        <th>1</th>
                                        <td> {user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button onClick={() => handleDelete(user)} className="btn btn-ghost btn-lg">
                                                <FaUserAlt className="text-blue-500"></FaUserAlt>
                                            </button>
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
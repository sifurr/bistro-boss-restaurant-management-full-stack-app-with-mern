import useAuth from "../../../hooks/useAuth";



const AdminHome = () => {
    const { user } = useAuth();
    return (
        <div>
            <h2 className='text-2xl text-center'>
                <span>Hi, Welcome</span>
                {
                    user?.displayName ? user?.displayName : "back!"
                }
            </h2>
        </div>
    );
};

export default AdminHome;
import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const {googleSingIn} = useAuth();
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const handleGoogleSignIn = () =>{
        googleSingIn()
        .then(res => {
            console.log(res.user)
            const userInfo = {
                name: res.user?.displayName,
                email: res.user?.email,
            }
            axiosPublic.post('/users', userInfo)
            .then(res => {
                console.log(res.data)
                navigate('/')
            })
        })
        .catch(err => console.log(err))
    }
    return (
        <div>
             <div className="divider">OR</div>
            <button onClick={handleGoogleSignIn} className="btn">
                <FaGoogle></FaGoogle>
                Google
            </button>
        </div>
    );
};

export default SocialLogin;
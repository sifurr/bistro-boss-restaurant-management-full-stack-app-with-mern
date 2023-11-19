import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form"
import { Helmet } from 'react-helmet-async'
import Swal from 'sweetalert2'
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";


const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const { createUser, updateNewUserProfile, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic()

    const onSubmit = (data) => {
        // console.log(data);

        createUser(data.email, data.password)
            .then(res => {
                const loggedInUser = res.user;

                setLoading(true)
                updateNewUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                console.log("user added to the database");
                                if (res.data.insertedId) {
                                    // console.log("user profile updated")
                                    reset();
                                    Swal.fire({
                                        title: "Signed up successfully!",
                                        text: "",
                                        icon: "success"
                                    });
                                    setLoading(false)
                                    navigate('/')
                                }
                            })
                    })
                    .catch(err => {
                        // console.log(err)
                    })

                // console.log("logged in User: ", loggedInUser);

            })
            .catch(err => {
                // console.log(err.message);
            })
    }

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Sign up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign up!</h1>
                        <p className="py-6">Provident In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} placeholder="name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600 text-xs">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Profile Picture</span>
                                </label>
                                <input type="text" {...register("photoURL", { required: true })} placeholder="photo url" className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-600 text-xs">Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600 text-xs">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="text" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })
                                } placeholder="password" className="input input-bordered" />
                                {errors.password?.type === "required" && (
                                    <p className="text-red-600 text-xs"> Password is required</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className="text-red-600 text-xs"> Must be more than 6 characters</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className="text-red-600 text-xs"> Must be less than 20 characters</p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p className="text-red-600 text-xs"> Must have one uppercase, one lowercase, one number, and one special character!</p>
                                )}
                            </div>

                            <div className="form-control mt-6">
                                <input type="submit" className="btn btn-primary" value="Sign-up" />
                            </div>
                        </form>
                        <p className='text-center mb-2'><small>Already registered? <Link className='font-bold' to="/login">Login</Link>  </small></p>
                        <div className="flex justify-center mb-5">
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
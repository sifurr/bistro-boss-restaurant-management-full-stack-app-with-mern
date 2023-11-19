import { useContext, useEffect, useRef, useState } from 'react';
import {
    loadCaptchaEnginge,
    LoadCanvasTemplate,
    validateCaptcha
} from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'
import Swal from 'sweetalert2'
import SocialLogin from '../../components/SocialLogin/SocialLogin';


const Login = () => {
    const { signIn } = useContext(AuthContext)
    const captchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'
    // console.log("visited location before login: ", location.state)

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);

        signIn(email, password)
            .then(res => {
           
                Swal.fire({
                    title: "Logged in successfully!",
                    text: "",
                    icon: "success"
                });
                const user = res.user;
                // console.log("user: ", user);
                
                navigate(from, {replace:true})
            })
            .catch(err => {
                // console.log(err.message)
            })
    }

    const handleValidateCaptcha = () => {
        const user_captcha_value = captchaRef.current.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
            <div className="hero-content flex">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name="email" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="text" name="password" placeholder="password" className="input input-bordered" />

                        </div>
                        <div className="form-control">
                            <LoadCanvasTemplate />
                            <input ref={captchaRef} onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type the captcha above" className="input input-bordered"  />
                            
                        </div>
                        <div className="form-control mt-6">
                            {/* TODO: enable the disable button temporarily */}
                            <input disabled={false} type="submit" className="btn btn-primary" value="Login" />
                        </div>
                    </form>
                    <p className='text-center mb-2'><small>New here? <Link className='font-bold' to="/sign-up">Sign-up</Link>  </small></p>
                    <div className="flex justify-center mb-5">
                            <SocialLogin></SocialLogin>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
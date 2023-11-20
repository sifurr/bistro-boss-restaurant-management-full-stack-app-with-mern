import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";


const CheckoutForm = () => {

    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState('');
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const [transactionId, setTransactionId] = useState('');


    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setError(error.message);
            console.log("error", error);
        }
        else {
            setError('');
            console.log("payment method", paymentMethod)
        }

        // confirm payment
        const { paymentIntent, error: confirmationError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'anonymous',
                        email: user?.email || 'anonymous'
                    }
                }
            }
        )

        if (confirmationError) {
            console.log("Confirmation error", confirmationError);
        } else {
            console.log("Payment intent", paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                const trxId = paymentIntent.id;
                setTransactionId(trxId);
                console.log("Payment succeeded, TrxID:", trxId);

                // now, save the payment in the database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), // convert utc date, use moment.js
                    cartIds: cart.map(item => item._id),
                    menuIds: cart.map(item => item.menuId),
                    status: 'pending'
                }

                const res = await axiosSecure.post("/payments", payment);
                console.log(res.data)
                refetch();
                if(res.data?.paymentResult?.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you for the payment!",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            }
        }
    }

    return (
        <div>
            <h2 className='text-3xl text-center'>Checkout Form</h2>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-secondary" type="submit"
                    disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
            <p className="text-red-500">{error}</p>
            {
                transactionId && <p className="text-green-500"> Your transaction ID: {transactionId} </p>
            }
        </div>
    );
};

export default CheckoutForm;
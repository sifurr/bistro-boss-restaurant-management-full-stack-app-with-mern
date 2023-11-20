import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";



const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })
    return (
        <div>
            <SectionTitle
                heading="Payment History"
                subHeading="Complete payment details"
            >
            </SectionTitle>
            <h2 className="text-xl">Total payments: {payments.length}</h2>
            <div>
                <div className="overflow-x-auto w-full">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Price</th>
                                <th>Transaction ID</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments.map((payment, index) =>

                                    <tr key={payment._id}>
                                        <th>{index + 1}</th>
                                        <td>{payment.price}</td>
                                        <td>{payment.transactionId}</td>
                                        <td>{payment.status}</td>
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

export default PaymentHistory;
import React from "react";
import UseAuth from "../../../hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const PaymentHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { isPending, data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isPending) return "loading...";

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-semibold mb-6">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm text-gray-600">
              <th className="px-4 py-2 border-b">#</th>
              <th className="px-4 py-2 border-b">Parcel ID</th>
              <th className="px-4 py-2 border-b">Amount</th>
              <th className="px-4 py-2 border-b">Transaction ID</th>
              <th className="px-4 py-2 border-b">Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  No payment history found.
                </td>
              </tr>
            ) : (
              payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="text-sm text-gray-700 hover:bg-gray-50"
                >
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b">{payment.parcelId}</td>
                  <td className="px-4 py-2 border-b">${payment.amount}</td>
                  <td className="px-4 py-2 border-b">
                    {payment.transactionId}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {new Date(payment.paid_at).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;

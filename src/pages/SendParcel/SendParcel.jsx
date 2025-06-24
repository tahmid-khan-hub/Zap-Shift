import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoaderData } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const SendParcel = () => {
  const serviceCenter = useLoaderData();
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const regions = Array.from(new Set(serviceCenter.map((sc) => sc.region)));

  const [senderRegion, setSenderRegion] = useState("");
  const [senderCenters, setSenderCenters] = useState([]);
  const [receiverRegion, setReceiverRegion] = useState("");
  const [receiverCenters, setReceiverCenters] = useState([]);

  useEffect(() => {
    if (senderRegion) {
      setSenderCenters(
        serviceCenter.filter((sc) => sc.region === senderRegion)
      );
    } else {
      setSenderCenters([]);
    }
  }, [senderRegion, serviceCenter]);

  useEffect(() => {
    if (receiverRegion) {
      setReceiverCenters(
        serviceCenter.filter((sc) => sc.region === receiverRegion)
      );
    } else {
      setReceiverCenters([]);
    }
  }, [receiverRegion, serviceCenter]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [cost, setCost] = useState(0);
  const [submittedData, setSubmittedData] = useState(null);

  const { register, handleSubmit, watch, reset } = useForm();
  const watchType = watch("type");

  const calculateCost = (data) => {
    const type = data.type;
    const weight = parseFloat(data.weight || 0);
    const isSameCenter =
      data.receiverServiceCenter === data.senderServiceCenter;

    if (type === "document") {
      return isSameCenter ? 60 : 80;
    }

    if (type === "non-document") {
      if (weight <= 3) {
        return isSameCenter ? 110 : 150;
      } else {
        const base = isSameCenter ? 110 : 150;
        const extra = weight * 40;
        return isSameCenter ? base + extra : base + extra + 40;
      }
    }

    return 0;
  };

  const getFormattedDateTime = () => {
    return new Date().toLocaleString("en-BD", {
      timeZone: "Asia/Dhaka",
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const onSubmit = (data) => {
    const deliveryCost = calculateCost(data);
    setCost(deliveryCost);
    setSubmittedData(data);
    toast.info(`Delivery cost is ৳${deliveryCost}`);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    const finalParcel = {
      ...submittedData,
      email: user?.email || "unknown",
      payment_status: "unpaid",
      delivery_status: "not_collected",
      tracking_id: `TRK-${Date.now()}`,
      creation_date: getFormattedDateTime(),
    };

    console.log("Parcel saved:", finalParcel);

    // DB/API logic
    axiosSecure.post("/parcels", finalParcel).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "parcel added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });

    toast.success("Parcel submitted and saved!");
    reset();
    setShowConfirm(false);
    setSenderRegion("");
    setSenderCenters([]);
    setReceiverRegion("");
    setReceiverCenters([]);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 my-12 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-2">Add New Parcel</h2>
      <p className="text-center text-gray-500 mb-6">
        Fill in the form to send a new parcel
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Parcel Info */}
        <div className="border p-3 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Parcel Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              {...register("type", { required: true })}
              className="input"
              placeholder="Type"
            >
              <option value="">Select Type</option>
              <option value="document">Document</option>
              <option value="non-document">Non-Document</option>
            </select>

            <input
              {...register("title", { required: true })}
              className="input"
              placeholder="Parcel Title"
            />

            {watchType === "non-document" && (
              <input
                type="number"
                {...register("weight")}
                className="input"
                placeholder="Weight (kg)"
              />
            )}
          </div>
        </div>

        {/* Sender + Receiver Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sender Info */}
          <div className="border p-3 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Sender Info</h3>
            <div className="flex flex-col space-y-4">
              <input
                className="input"
                placeholder="Sender Name"
                {...register("senderName")}
              />
              <input
                {...register("senderContact", { required: true })}
                className="input"
                placeholder="Sender Contact"
              />
              <select
                value={senderRegion}
                onChange={(e) => setSenderRegion(e.target.value)}
                className="input"
                required
              >
                <option value="">Select Sender Region</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <select
                {...register("senderServiceCenter", { required: true })}
                className="input"
                disabled={!senderRegion}
                required
              >
                <option value="">Select Sender Service Center</option>
                {senderCenters.map((center) => (
                  <option key={center.city} value={center.city}>
                    {center.city} ({center.district})
                  </option>
                ))}
              </select>
              <input
                {...register("senderAddress", { required: true })}
                className="input"
                placeholder="Sender Address"
              />
              <textarea
                {...register("pickupInstruction", { required: true })}
                className="input resize-y min-h-[100px]"
                placeholder="Pickup Instruction"
                rows={3}
              />
            </div>
          </div>

          {/* Receiver Info */}
          <div className="border p-3 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Receiver Info</h3>
            <div className="flex flex-col space-y-4">
              <input
                {...register("receiverName", { required: true })}
                className="input"
                placeholder="Receiver Name"
              />
              <input
                {...register("receiverContact", { required: true })}
                className="input"
                placeholder="Receiver Contact"
              />
              <select
                value={receiverRegion}
                onChange={(e) => setReceiverRegion(e.target.value)}
                className="input"
                required
              >
                <option value="">Select Receiver Region</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <select
                {...register("receiverServiceCenter", { required: true })}
                className="input"
                disabled={!receiverRegion}
                required
              >
                <option value="">Select Receiver Service Center</option>
                {receiverCenters.map((center) => (
                  <option key={center.city} value={center.city}>
                    {center.city} ({center.district})
                  </option>
                ))}
              </select>
              <input
                {...register("receiverAddress", { required: true })}
                className="input"
                placeholder="Receiver Address"
              />
              <textarea
                {...register("deliveryInstruction", { required: true })}
                className="input resize-y min-h-[100px]"
                placeholder="Delivery Instruction"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="text-center mt-6">
          <button type="submit" className="btn bg-lime-400">
            Submit
          </button>
        </div>

        {/* Confirm */}
        {showConfirm && (
          <div className="text-center mt-6">
            <p className="text-lg mb-2 font-medium">Delivery Cost: ৳{cost}</p>
            <button onClick={handleConfirm} className="btn btn-success">
              Confirm & Save
            </button>
          </div>
        )}
      </form>

      <ToastContainer />
    </div>
  );
};

export default SendParcel;

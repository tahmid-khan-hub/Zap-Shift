import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UseAuth from "../../hooks/UseAuth";
import { useLoaderData } from "react-router";

const SendParcel = () => {
  const serviceCenter = useLoaderData(); // your JSON array of service centers
//   const { user } = UseAuth();
//   const userName = user?.displayName || "Unknown";

  // Extract unique regions for dropdowns
  const regions = Array.from(new Set(serviceCenter.map((sc) => sc.region)));

  // Sender state
  const [senderRegion, setSenderRegion] = useState("");
  const [senderCenters, setSenderCenters] = useState([]);

  // Receiver state
  const [receiverRegion, setReceiverRegion] = useState("");
  const [receiverCenters, setReceiverCenters] = useState([]);

  // Update sender centers when senderRegion changes
  useEffect(() => {
    if (senderRegion) {
      setSenderCenters(
        serviceCenter.filter((sc) => sc.region === senderRegion)
      );
    } else {
      setSenderCenters([]);
    }
  }, [senderRegion, serviceCenter]);

  // Update receiver centers when receiverRegion changes
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
    let base = data.type === "document" ? 50 : 100;
    if (data.type === "non-document" && data.weight) {
      base += parseFloat(data.weight) * 10;
    }
    if (data.receiverServiceCenter !== data.senderServiceCenter) {
      base += 40;
    }
    return base;
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
      creation_date: new Date().toISOString(),
    };
    console.log("Parcel saved:", finalParcel); // replace with real DB logic
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
              {/* Sender Name */}
              <input
                // defaultValue={userName}
                // readOnly
                className="input"
                placeholder="Sender Name"
                {...register("senderName")}
              />

              {/* Sender Contact */}
              <input
                {...register("senderContact", { required: true })}
                className="input"
                placeholder="Sender Contact"
              />

              {/* Sender Region Dropdown */}
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

              {/* Sender Service Center Dropdown */}
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

              {/* Sender Address & Instruction flex for large, stacked on mobile */}
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

              {/* Receiver Region Dropdown */}
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

              {/* Receiver Service Center Dropdown */}
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

              {/* Receiver Address & Instruction flex for large, stacked on mobile */}
                <input
                  {...register("receiverAddress", { required: true })}
                  className="input "
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

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import UseAuth from "../../../hooks/UseAuth";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const BeARider = () => {
  const { user } = UseAuth()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    // reset,
    formState: { errors },
  } = useForm();

  const axiosSecure = UseAxiosSecure()

  const [serviceCenters, setServiceCenters] = useState([]);
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);

  const selectedRegion = watch("region");

  useEffect(() => {
    // Load service centers data
    axios.get("/serviceCenter.json") // Replace with your actual endpoint
      .then((res) => {
        setServiceCenters(res.data);

        const uniqueRegions = [...new Set(res.data.map(center => center.region))];
        setRegions(uniqueRegions);
      });
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      const filtered = serviceCenters.filter(c => c.region === selectedRegion);
      const uniqueDistricts = [...new Set(filtered.map(c => c.district))];
      setDistricts(uniqueDistricts);
    } else {
      setDistricts([]);
    }
  }, [selectedRegion, serviceCenters]);

  useEffect(() => {
    setValue("name", user?.displayName || "");
    setValue("email", user?.email || "");
  }, [user, setValue]);

  const onSubmit = async (data) => {
    const finalData = {
      ...data,
      name: user.displayName || "",
      email: user.email || "",
      created_at: new Date().toISOString(),
      status: "pending",
    };

    console.log(finalData);

    axiosSecure.post('/riders', finalData)
    .then(res =>{
        if(res.data.insertedId){
            alert('data saved in backend')
        }
    })
    
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Be A Rider</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name (Read-only) */}
        <div>
          <label>Name</label>
          <input
            type="text"
            {...register("name")}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        {/* Email (Read-only) */}
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email")}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        {/* Age */}
        <div>
          <label>Age</label>
          <input
            type="number"
            {...register("age", { required: true, min: 18 })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.age && <p className="text-red-600">Age must be 18+</p>}
        </div>

        {/* Region */}
        <div>
          <label>Region</label>
          <select
            {...register("region", { required: true })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Region</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          {errors.region && <p className="text-red-600">Region is required</p>}
        </div>

        {/* District */}
        <div>
          <label>District</label>
          <select
            {...register("district", { required: true })}
            className="w-full border px-3 py-2 rounded"
            disabled={!selectedRegion}
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          {errors.district && <p className="text-red-600">District is required</p>}
        </div>

        {/* Phone */}
        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            {...register("phone", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.phone && <p className="text-red-600">Phone is required</p>}
        </div>

        {/* NID */}
        <div>
          <label>National ID Number</label>
          <input
            type="text"
            {...register("nid", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.nid && <p className="text-red-600">NID is required</p>}
        </div>

        {/* Bike Brand */}
        <div>
          <label>Bike Brand</label>
          <input
            type="text"
            {...register("bikeBrand", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.bikeBrand && <p className="text-red-600">Bike brand is required</p>}
        </div>

        {/* Bike Reg No */}
        <div>
          <label>Bike Registration Number</label>
          <input
            type="text"
            {...register("bikeReg", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.bikeReg && <p className="text-red-600">Bike reg number is required</p>}
        </div>

        {/* Other Info */}
        <div>
          <label>Other Relevant Info</label>
          <textarea
            rows={3}
            {...register("otherInfo")}
            className="w-full border px-3 py-2 rounded"
            placeholder="Anything else we should know?"
          />
        </div>

        {/* Hidden status */}
        <input type="hidden" {...register("status")} value="pending" />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default BeARider;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useUpdateUserMutation, useDeleteUserMutation } from "../slices/usersApiSlice";
import { setCredentials, logout } from "../slices/authSlice";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("");
  const [mobile, setMobile] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");
  const [age, setAge] = useState(null); // New state for age
  const [address, setAddress] = useState("");


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setUserType(userInfo.userType);
    setMobile(userInfo.mobile);
    setHeight(userInfo.height);
    setWeight(userInfo.weight);
    setAddress(userInfo.address);
    setBirthday(userInfo.birthday);
    if (userInfo.birthday) {
      calculateAge(userInfo.birthday); // Calculate age on initial load
    }
  }, [userInfo]);

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);

      let category = "";
      if (bmiValue < 18.5) {
        category = "Underweight";
      } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        category = "Normal weight";
      } else if (bmiValue >= 25 && bmiValue <= 29.9) {
        category = "Overweight";
      } else {
        category = "Obesity";
      }
      setBmiCategory(category);
    } else {
      setBmi(null);
      setBmiCategory("");
    }
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    setAge(age);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          userType,
          mobile,
          height,
          weight,
          birthday,
          password,
          address,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteAccountHandler = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await deleteUser().unwrap();
        dispatch(logout());
        navigate('/');
        toast.success("Your account has been deleted successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-[1100px] mt-[-200px]">
      <div className="relative flex flex-col text-gray-700 bg-black bg-opacity-70 shadow-none rounded-xl bg-clip-border mt-[300px] p-8 mb-20">
        <h4 className="block font-sans text-5xl antialiased font-semibold leading-snug tracking-normal text-center text-white">
          Update Profile
        </h4>
        <p className="block mt-1 font-sans text-xl antialiased font-normal leading-relaxed text-center text-white">
          Update your profile information
        </p>

        <form className="max-w-screen-lg mt-8 w-80 sm:w-[40rem] flex gap-10 pb-50" onSubmit={submitHandler}>
          {/* Left Part */}
          <div className="flex flex-col gap-6 w-full">
            <div className="relative h-11 w-full min-w-[200px] mb-4">
              <label className="block text-white text-sm mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-3 text-sm text-blue-gray-700 transition-all focus:border-2 focus:border-gray-900"
              />
            </div>

            <div className="relative h-11 w-full min-w-[200px] mb-4">
              <label className="block text-white text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-3 text-sm text-blue-gray-700 transition-all focus:border-2 focus:border-gray-900"
              />
            </div>

            <div className="relative h-11 w-full min-w-[200px] mb-4">
              <label className="block text-white text-sm mb-1">Mobile Number</label>
              <input
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-3 text-sm text-blue-gray-700 transition-all focus:border-2 focus:border-gray-900"
              />
            </div>

            <div className="relative h-11 w-full min-w-[200px] mb-4">
              <label className="block text-white text-sm mb-1">User Type</label>
              <input
                type="text"
                placeholder="User Type"
                value={userInfo.isAdmin ? "Admin" : userType}
                readOnly
                className="peer h-full w-full rounded-md bg-gray-100 border border-blue-gray-200 px-3 py-3 text-sm text-blue-gray-700 transition-all"
              />
            </div>

            <div className="relative h-11 w-full min-w-[200px] mb-4">
              <label className="block text-white text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-3 text-sm text-blue-gray-700 transition-all focus:border-2 focus:border-gray-900"
              />
            </div>

            <div className="relative h-11 w-full min-w-[200px] mb-4">
              <label className="block text-white text-sm mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-3 text-sm text-blue-gray-700 transition-all focus:border-2 focus:border-gray-900"
              />
            </div>

            <button
              type="button"
              onClick={calculateBMI}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
            >
              Check BMI
            </button>

            {bmi && (
              <div className="mt-4 text-white">
                <p>BMI: {bmi}</p>
                <p>Category: {bmiCategory}</p>
              </div>
            )}
          </div>

          {/* Right Part */}
          <div className="flex flex-col gap-6 w-full">
            <div className="relative h-11 w-full min-w-[200px] mb-4">
              <label className="block text-white text-sm mb-1">Height (cm)</label>
              <input
                type="number"
                placeholder="Enter height in cm"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-3 text-sm text-blue-gray-700 transition-all focus:border-2 focus:border-gray-900"
              />
            </div>

            <div className="relative h-11 w-full min-w-[200px] mb-4">
              <label className="block text-white text-sm mb-1">Weight (kg)</label>
              <input
                type="number"
                placeholder="Enter weight in kg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-3 text-sm text-blue-gray-700 transition-all focus:border-2 focus:border-gray-900"
              />
            </div>

            <div className="relative h-11 w-full min-w-[200px] mb-4">
              <label className="block text-white text-sm mb-1">Birthday</label>
              <input
                type="date"
                value={birthday ? birthday.split("T")[0] : ""}
                onChange={(e) => {
                  setBirthday(e.target.value);
                  calculateAge(e.target.value);
                }}
                className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-3 text-sm text-blue-gray-700 transition-all focus:border-2 focus:border-gray-900"
                min="1900-01-01"
                max="2100-01-01"
              />
            </div>
            
            <div className="relative h-11 w-full min-w-[200px] mb-4">
              <label className="block text-white text-sm mb-1">Address</label>
              <input
                type="text"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="peer h-full w-full rounded-md border border-blue-gray-200 px-3 py-3 text-sm text-blue-gray-700 transition-all focus:border-2 focus:border-gray-900"
              />
            </div>

            <div className="relative h-11 w-full min-w-[200px] mb-4">
              <label className="block text-white text-sm mb-1">Age</label>
              <input
                type="text"
                value={age !== null ? age : ""}
                readOnly
                className="peer h-full w-full rounded-md bg-gray-100 border border-blue-gray-200 px-3 py-3 text-sm text-blue-gray-700 transition-all"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all"
            >
              Update Profile
            </button>

            <button
              type="button"
              onClick={deleteAccountHandler}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
            >
              Delete Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileScreen;

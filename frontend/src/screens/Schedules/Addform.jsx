import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowLeft, Upload } from "lucide-react";

export default function CreateSchedule() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const scheduleData = {
        ...formData,
        userId: userInfo._id,
      };

      const res = await fetch("/api/schedule/Screate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scheduleData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        alert("Schedule created successfully");
        navigate("/myschedule");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.name) {
      setFormData((prevState) => ({
        ...prevState,
        name: userInfo.name,
      }));
    }
  }, [userInfo]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <Link to="/myschedule" className="flex items-center text-yellow-600 hover:text-yellow-700 transition duration-150 ease-in-out mb-6">
            <ArrowLeft size={20} className="mr-2" />
            <span>Back to My Schedule</span>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create New Schedule
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                readOnly
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="type" className="sr-only">Type</label>
              <select
                id="type"
                name="type"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="">Select Type</option>
                <option value="Gold">Gold</option>
                <option value="prime">Prime</option>
              </select>
            </div>
            <div>
              <label htmlFor="time" className="sr-only">Time</label>
              <select
                id="time"
                name="time"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              >
                <option value="">Select Time</option>
                <option value="10.00Am to 12.00 Pm">10.00Am to 12.00 Pm</option>
                <option value="12.00Am to 4.00 Pm">12.00Am to 4.00 Pm</option>
                <option value="6.00Am to 10.00 Am">6.00Am to 10.00 Am</option>
                <option value="10.00Am to 1.00 Pm">10.00Am to 1.00 Pm</option>
              </select>
            </div>
            <div>
              <label htmlFor="info" className="sr-only">Requesting schedule</label>
              <textarea
                id="info"
                name="info"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                placeholder="Requesting schedule"
                rows="3"
                onChange={(e) => setFormData({ ...formData, info: e.target.value })}
              ></textarea>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-yellow-50 file:text-yellow-700
                  hover:file:bg-yellow-100"
              />
              <button
                type="button"
                onClick={handleUploadImage}
                disabled={imageUploadProgress}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
              >
                {imageUploadProgress ? (
                  <CircularProgressbar
                    value={imageUploadProgress}
                    text={`${imageUploadProgress || 0}%`}
                    styles={{
                      root: { width: '24px', height: '24px', marginRight: '8px' },
                      path: { stroke: '#ffffff' },
                      text: { fill: '#ffffff', fontSize: '24px' },
                    }}
                  />
                ) : (
                  <Upload size={20} className="mr-2" />
                )}
                Upload Image
              </button>
            </div>
            {imageUploadError && (
              <p className="mt-2 text-sm text-red-600">{imageUploadError}</p>
            )}
            {formData.image && (
              <img
                src={formData.image}
                alt="Uploaded"
                className="mt-4 w-full h-32 object-cover rounded-md"
              />
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Create Schedule
            </button>
          </div>

          {publishError && (
            <p className="mt-2 text-sm text-red-600">{publishError}</p>
          )}
        </form>
      </div>
    </div>
  );
}
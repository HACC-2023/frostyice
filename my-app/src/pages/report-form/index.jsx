import { useState } from "react";
import Dropzone from "react-dropzone";
import GoogleMap from "../../components/Map";

const ReportForm = () => {
  const [imageURLArray, setImageURLArray] = useState([]);
  const [files, setFiles] = useState([]);

  return (
    <div className="flex justify-center items-center">
      <div className="mt-10 bg-white p-14">
        <div className="p-4 shadow mb-8">
          <Dropzone
            onDrop={(acceptedFiles) => {
              setFiles([...files, acceptedFiles[0]]);
              setImageURLArray([
                ...imageURLArray,
                URL.createObjectURL(acceptedFiles[0]),
              ]);
            }}
            accept={{ "image/*": [".png", ".jpg"] }}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div
                  {...getRootProps()}
                  className="h-36 bg-gray-200 text-slate-500 border-2 border-slate-300"
                >
                  <input {...getInputProps()} />
                  <div className="text-center">
                    <svg
                      className="mx-auto h-38 w-20 text-gray-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="flex w-120 justify-center items-center text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
          <br />
          {imageURLArray.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className="self-center"
              width="300px"
              height="240px"
            />
          ))}
        </div>

        <div className="p-4 mb-4">
          <label
            htmlFor="description"
            className="block text-gray-600 font-semibold mb-2"
          >
            Location
          </label>

          <input
            id="pac-input"
            type="text"
            placeholder="Search for places..."
            className="p-2 border text-gray-600 bg-white w-full border rounded-md"
          />
          <GoogleMap />
        </div>

        <div className="p-4 mb-4">
          <label
            htmlFor="description"
            className="block text-gray-600 font-semibold mb-2"
          >
            Description
          </label>
          <textarea
            className="w-full text-gray-600 p-2 border rounded-md bg-white focus:outline-none focus:ring focus:border-blue-500"
            rows="4" // Set the number of rows for the input
            placeholder="Enter your description here"
          ></textarea>

          <button className="btn btn-outline">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;

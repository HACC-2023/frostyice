import { useState } from "react";
import Dropzone from "react-dropzone";
import { toast } from 'react-toastify';
import ClickableMap from "@/components/map/ClickableMap/ClickableMap";

const ReportForm = () => {
  // debris description
  const [debrisType, setDebrisType] = useState('"A mass of netting and/or fishing gear"');
  const [debrisTypeOther, setDebrisTypeOther] = useState('');
  const [containerFullness, setContainerFullness] = useState('Full');
  const [claimBoat, setClaimBoat] = useState('No');
  const [biofoulingRating, setBiofoulingRating] = useState('1 - No algae or marine life at all');

  // debris location
  const [debrisRelativeLocation, setDebrisRelativeLocation] = useState('At sea, BEYOND three miles from nearest land');
  const [debrisLocationDetails, setDebrisLocationDetails] = useState('');
  const [closestIsland, setClosestIsland] = useState('Big Island');
  const [closestLandmark, setClosestLandmark] = useState('');
  const [closestLandmarkRelativeLocation, setClosestLandmarkRelativeLocation] = useState('');
  const [coordinates, setCoordinates] = useState('');

  // debris detailed description
  const [debrisTrappedDesc, setDebrisTrappedDesc] = useState('Caught on the reef or is partially buried in sand');
  const [debrisTrappedOther, setDebrisTrappedOther] = useState('');
  const [imageURLArray, setImageURLArray] = useState([]);
  const [files, setFiles] = useState([]);

  // reporter contact info
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState(''); // TODO validation

  async function submitForm() {
    const data = {
      firstName,
      lastName,
      email,
      phoneNumber,
      publicType: debrisType,
      publicTypeDesc: debrisTypeOther,
      publicBiofoulingRating: biofoulingRating,
      publicLocationDesc: debrisRelativeLocation,
      publicLatLongOrPositionDesc: debrisLocationDetails,
      closestIsland,
      closestLandmark,
      mapLat: coordinates?.latitude,
      mapLong: coordinates?.longitude,
      debrisLandmarkRelativeLocation: closestLandmarkRelativeLocation,
      publicDebrisEnvDesc: debrisTrappedDesc,
      publicDebrisEnvAdditionalDesc: debrisTrappedOther,
    };
    if (debrisType.includes('container')) {
      data.publicContainerFullness = containerFullness;
    } else if (debrisType.includes('boat')) {
      data.publicClaimBoat = claimBoat;
    }
    const res = await fetch('/api/mongo/event/add-event-form', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status === 200) {
      toast.success('Form submitted. Mahalo!');
    } else {
      toast.error('Error submitting form. Please try again later.');
    }
  }

  return (
    <div className="justify-center items-center">
      <div className="mt-2 bg-white p-14">
        <h3 className="text-2xl font-semibold text-gray-600 mb-2">
          Report Marine Debris
        </h3>
        <hr />
        <p className="text-gray-600 my-2">
          <b>
            TO REPORT MARINE ANIMALS THAT ARE ENTANGLED IN DEBRIS, CALL NOAA
            IMMEDIATELY AT <br/>
            <a className="text-blue-500 hover:underline" href="tel:18882569840">1-888-256-9840</a>
            &nbsp;(round-the-clock hotline)
          </b>
        </p>
        <a
          href="https://dlnr.hawaii.gov/dobor/boating-in-hawaii/dobor-emergency-contacts/"
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          <p className="mb-2">
            <b>GO TO DOBOR’S “WHO TO CALL” EMERGENCY CONTACT LIST</b>
          </p>
        </a>
        <hr />
        <p className="text-gray-600 mt-4 mb-4">
          Use this form if you found marine debris you cannot remove by yourself
          that is:
        </p>
        <p className="text-gray-600 mb-1">
          1) Drifting in State waters or washed up on the shoreline,
        </p>
        <p className="text-gray-600 mb-1">
          2) Removed from the water and is secured on land, or
        </p>
        <p className="text-gray-600 mb-6">
          3) So large or heavy that you need DLNR’s help to remove it.
        </p>

        <p className="text-gray-600 mb-1">
          <b>Note:</b> Information you submit through this form is shared
          between divisions within DLNR, researchers at the University of
          Hawaii, NOAA, Non-Government Organizations and other agencies that
          manage marine debris and Aquatic Invasive Species. Your contact
          information is kept confidential.
        </p>

        <h5 className="text-xl font-semibold text-gray-600 mt-8 mb-2">
          Response and Removal Reporting Form
        </h5>
        <hr />
        <p className="text-gray-600 mt-4 mb-2">
          By filling out and submitting this form, multiple divisions in DLNR
          will receive your report. Fields with an asterisk (*) are required.
        </p>

        {/* 1st section */}
        <div className="p-8 mt-4 mb-4 shadow">
          <p className="text-gray-600 mb-2">
            <b>1) I FOUND/LOCATED THE FOLLOWING*</b>
          </p>
          <div className="form-control" onChange={event => setDebrisType(event.target.value)}>
            <label className="label cursor-pointer">
              <div className="flex items-left">
                <input
                  type="radio"
                  className="radio radio-xs radio-info"
                  name="debrisTypeRadio"
                  value="A mass of netting and/or fishing gear"
                  defaultChecked
                />
                <span className="label-text ml-2 text-gray-600">
                  A mass of netting and/or fishing gear
                </span>
              </div>
            </label>
            <label className="label cursor-pointer">
              <div className="flex items-left">
                <input
                  type="radio"
                  className="radio radio-xs radio-info"
                  value="An abandoned/derelict boat"
                  name="debrisTypeRadio"
                />
                <span className="label-text ml-2 text-gray-600">
                  An abandoned/derelict boat
                </span>
              </div>
            </label>
            <label className="label cursor-pointer">
              <div className="flex items-left">
                <input
                  type="radio"
                  className="radio radio-xs radio-info"
                  value="A container/drum/cylinder"
                  name="debrisTypeRadio"
                />
                <span className="label-text ml-2 text-gray-600">
                  A container/drum/cylinder
                </span>
              </div>
            </label>
            <label className="label cursor-pointer">
              <div className="flex items-left">
                <input
                  type="radio"
                  className="radio radio-xs radio-info"
                  value="A large concentration of plastics"
                  name="debrisTypeRadio"
                />
                <span className="label-text ml-2 text-gray-600">
                  A large concentration of plastics
                </span>
              </div>
            </label>
            <label className="label cursor-pointer">
              <div className="flex items-left">
                <input
                  type="radio"
                  className="radio radio-xs radio-info"
                  value="Potential Japan tsunami marine debris"
                  name="debrisTypeRadio"
                />
                <span className="label-text ml-2 text-gray-600">
                  Potential Japan tsunami marine debris
                </span>
              </div>
            </label>
            <label className="label cursor-pointer">
              <div className="flex items-left">
                <input
                  type="radio"
                  className="radio radio-xs radio-info"
                  value="A large concentration of miscellaneous trash"
                  name="debrisTypeRadio"
                />
                <span className="label-text ml-2 text-gray-600">
                  A large concentration of miscellaneous trash
                </span>
              </div>
            </label>
            <label className="label cursor-pointer">
              <div className="flex items-left">
                <input
                  type="radio"
                  className="radio radio-xs radio-info"
                  value="Other"
                  name="debrisTypeRadio"
                />
                <span className="label-text ml-3 text-gray-600">
                  Other - describe below
                </span>
              </div>
            </label>
          </div>

          <p className="text-gray-600 mt-4 mb-4">
            <b>
              ENTER DESCRIPTION OF THE TYPE OF DEBRIS FOUND AND WHAT IT
              WOULD TAKE TO REMOVE IT (for example, a large section of a dock or
              a shipping container requiring a crane to remove, a wooden beam
              10&rsquo; long that would require 3-4 people to lift, etc.)
            </b>
          </p>
          <input
            type="text"
            className="input input-bordered w-full bg-white text-gray-600 mb-2"
            onChange={event => setDebrisTypeOther(event.target.value)}
          />
          { debrisType === 'A container/drum/cylinder' && (
            <span>
              <p className="text-gray-600 mt-4 mb-4">
                <b>How full is the container/drum/cylinder?</b>
              </p>
              <select
                className="select select-bordered w-full max-w-xs bg-white text-gray-600"
                defaultValue="Full"
                onChange={event => setContainerFullness(event.target.value)}
              >
                <option>Full</option>
                <option>Partially Filled</option>
                <option>Empty</option>
              </select>
            </span>
          )}
          { debrisType === 'An abandoned/derelict boat' && (
            <span>
              <p className="text-gray-600 mt-4 mb-4">
                <b>Do you want to claim the boat for personal use?*</b>
              </p>
              <div className="form-control" onChange={event => setClaimBoat(event.target.value)}>
                <label className="label cursor-pointer">
                  <div className="flex items-left">
                    <input
                      type="radio"
                      name="claimBoatRadio"
                      value="Yes"
                      className="radio radio-xs radio-info"
                    />
                    <span className="label-text ml-2 text-gray-600">Yes</span>
                  </div>
                </label>
                <label className="label cursor-pointer">
                  <div className="flex items-left">
                    <input
                      type="radio"
                      name="claimBoatRadio"
                      className="radio radio-xs radio-info"
                      value="No"
                      defaultChecked
                    />
                    <span className="label-text ml-2 text-gray-600">No</span>
                  </div>
                </label>
              </div>
            </span>
          )}

          <p className="text-gray-600 mt-4 mb-4">
            <b>
              On a scale of one to ten (one represents no marine growth and ten
              represents significant marine life covering all submerged
              surfaces) how much biofouling is on the item you found?*
            </b>
          </p>

          <select
            onChange={event => setBiofoulingRating(event.target.value)}
            defaultValue="1 - No algae or marine life at all"
            className="select select-bordered w-full max-w-xs bg-white text-gray-600"
          >
            <option>1 - No algae or marine life at all</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>
              6 - Patches of dense algae and presence of barnacles colonies
            </option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>
              10 - Abundant, healthy growth of algae and barnacles covering
              submerged areas
            </option>
          </select>
        </div>

        {/* 2nd section */}

        <div className="ps-8 pt-2 mb-4 shadow">
          <p className="text-gray-600 mt-4 mb-4">
            <b>THIS DEBRIS IS LOCATED*</b>
          </p>

          <div className="form-control" onChange={event => setDebrisRelativeLocation(event.target.value)}>
            <label className="label cursor-pointer">
              <div className="flex items-left">
                <input
                  type="radio"
                  name="debristLocationRadio"
                  className="radio radio-xs radio-info"
                  value="At sea, BEYOND three miles from nearest land"
                  defaultChecked
                />
                <span className="label-text ml-2 text-gray-600">
                  At sea, BEYOND three miles from nearest land
                </span>
              </div>
            </label>
            <label className="label cursor-pointer">
              <div className="flex items-left">
                <input
                  type="radio"
                  name="debristLocationRadio"
                  className="radio radio-xs radio-info"
                  value="At sea, WITHIN three miles of nearest land"
                />
                <span className="label-text ml-2 text-gray-600">
                  At sea, WITHIN three miles of nearest land
                </span>
              </div>
            </label>
            <label className="label cursor-pointer">
              <div className="flex items-left">
                <input
                  type="radio"
                  name="debristLocationRadio"
                  className="radio radio-xs radio-info"
                  value="In the shore break"
                />
                <span className="label-text ml-2 text-gray-600">
                  In the shore break
                </span>
              </div>
            </label>
            <label className="label cursor-pointer">
              <div className="flex items-left">
                <input
                  type="radio"
                  name="debristLocationRadio"
                  className="radio radio-xs radio-info"
                  value="On the beach BELOW the high wash of the waves"
                />
                <span className="label-text ml-2 text-gray-600">
                  On the beach BELOW the high wash of the waves
                </span>
              </div>
            </label>
            <label className="label cursor-pointer">
              <div className="flex items-left">
                <input
                  type="radio"
                  name="debristLocationRadio"
                  className="radio radio-xs radio-info"
                  value="On the beach ABOVE the high wash of the waves"
                />
                <span className="label-text ml-2 text-gray-600">
                  On the beach ABOVE the high wash of the waves
                </span>
              </div>
            </label>

            <label className="label cursor-pointer">
              <div className="flex items-left">
                <input
                  type="radio"
                  name="debristLocationRadio"
                  className="radio radio-xs radio-info"
                  value="None of the above, a description follows below"
                />
                <span className="label-text ml-2 text-gray-600">
                  None of the above, a description follows below
                </span>
              </div>
            </label>
          </div>

          <div className="flex flex-col w-full lg:flex-row">
            <div className="grid w-40 flex-grow card rounded-box">
              <p className="text-gray-600 mt-4 mb-4 max-w-2xl">
                <b>
                  If located offshore, enter latitude and longitude (i.e.
                  21.3161 -157.8906) or provide a position description and any
                  information on currents and winds that could help in
                  relocating the debris.
                </b>
              </p>
              <input
                type="text"
                className="input input-bordered bg-white text-gray-600 mb-2"
                onChange={event => setDebrisLocationDetails(event.target.value)}
              />

              <p className="text-gray-600 mt-4 mb-4">
                <b>
                  If on land or in the nearshore waters - indicate which island*
                </b>
              </p>

              <select
                defaultValue="Big Island"
                className="select select-bordered w-full max-w-xs bg-white text-gray-600"
                onChange={event => setClosestIsland(event.target.value)}
              >
                <option>Big Island</option>
                <option>Maui</option>
                <option>Molokai</option>
                <option>Lanai</option>
                <option>Kahoolawe</option>
                <option>Oahu</option>
                <option>Kauai</option>
                <option>Niihau</option>
                <option>NWHI</option>
              </select>

              <p className="text-gray-600 mt-4">
                <b>Nearest town, street address, nearby landmarks*</b>
              </p>
              <input
                className="input input-bordered bg-white text-gray-600 mb-2"
                onChange={event => setClosestLandmark(event.target.value)}
              />
              <span className="text-gray-400">0 of 120 max characters</span>

              <p className="text-gray-600 mt-4 max-w-2xl">
                <b>
                  Where is the debris situated in relation to the landmark you
                  provided (i.e. 200 feet north, etc.)
                </b>
              </p>
              <input
                className="input input-bordered bg-white text-gray-600 mb-2"
                onChange={event => setClosestLandmarkRelativeLocation(event.target.value)}
              />
              <span className="text-gray-400 mb-4">
                0 of 120 max characters
              </span>
            </div>

            <div className="divider lg:divider-horizontal">OR</div>

            <div className="grid flex-grow card rounded-box">
              <div className="mt-4 mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-600 font-semibold mb-2"
                >
                  Select Location
                </label>
                <br/>
                <ClickableMap setCoordinates={setCoordinates} />
              </div>
            </div>
          </div>
        </div>

        {/* 3rd section */}
        <div className="ps-8 pt-2 mb-4 shadow">
          <p className="text-gray-600 mt-4 mb-4">
            <b>3) THE DEBRIS IS BEST DESCRIBED AS:*</b>
          </p>

          <div className="form-control" onChange={event => setDebrisTrappedDesc(event.target.value)}>
            <label className="label cursor-pointer">
              <div className="flex items-left">
                <input
                  type="radio"
                  name="debrisDescRadio"
                  className="radio radio-info radio-xs"
                  value="Caught on the reef or is partially buried in sand"
                  defaultChecked
                />
                <span className="label-text ml-2 text-gray-600">
                  Caught on the reef or is partially buried in sand
                </span>
              </div>
            </label>

            <label className="label cursor-pointer">
              <div className="flex items-left">
                <input
                  type="radio"
                  name="debrisDescRadio"
                  className="radio radio-info radio-xs"
                  value="Loose in the shore break or on the shoreline and could go back out to sea"
                />
                <span className="label-text ml-2 text-gray-600">
                  Loose in the shore break or on the shoreline and could go back out to sea
                </span>
              </div>
            </label>

            <label className="label cursor-pointer">
              <div className="flex items-left">
                <input
                  type="radio"
                  name="debrisDescRadio"
                  className="radio radio-info radio-xs"
                  value="Trapped in a tide pool and cannot escape"
                />
                <span className="label-text ml-2 text-gray-600">
                  Trapped in a tide pool and cannot escape
                </span>
              </div>
            </label>

            <label className="label cursor-pointer">
              <div className="flex items-left">
                <input
                  type="radio"
                  name="debrisDescRadio"
                  className="radio radio-info radio-xs"
                  value="Loose on the shore but caught in the vegetation line"
                />
                <span className="label-text ml-2 text-gray-600">
                  Loose on the shore but caught in the vegetation line
                </span>
              </div>
            </label>

            <label className="label cursor-pointer">
              <div className="flex items-left">
                <input
                  type="radio"
                  name="debrisDescRadio"
                  className="radio radio-info radio-xs"
                  value="Tied to a fixed object so it cannot be swept away"
                />
                <span className="label-text ml-2 text-gray-600">
                  Tied to a fixed object so it cannot be swept away
                </span>
              </div>
            </label>

            <label className="label cursor-pointer">
              <div className="flex items-left">
                <input
                  type="radio"
                  name="debrisDescRadio"
                  className="radio radio-info radio-xs"
                  value="Pushed inland above the high wash of the waves so it cannot be swept away"
                />
                <span className="label-text ml-2 text-gray-600">
                  Pushed inland above the high wash of the waves so it cannot be swept away
                </span>
              </div>
            </label>

            <label className="label cursor-pointer">
              <div className="flex items-left">
                <input
                  type="radio"
                  name="debrisDescRadio"
                  className="radio radio-xs radio-info"
                  value="Other"
                />
                <span className="label-text ml-2 text-gray-600">
                  Other - please explain how urgent recovery/removal is
                </span>
              </div>
            </label>
          </div>

          <p className="text-gray-600 mt-4 mb-4">
            <b>ENTER MY OWN DESCRIPTION</b>
          </p>
          <input
            className="input input-bordered input-lg w-full bg-white text-gray-600 mb-2"
            onChange={event => setDebrisTrappedOther(event.target.value)}
          />

          <p className="text-gray-600 mt-4 mb-4">
            <b>
              IF YOU CAN TAKE A PHOTOGRAPH, PLEASE TURN ON THE LOCATOR/GPS OF
              YOUR DEVICE, TAKE THE PICTURE AND ATTACH IT (Six image/30MB
              maximum)
            </b>
          </p>

          <div className="p-4 mb-8">
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
        </div>

        {/* 4th section */}
        <div className="p-8 mt-8 mb-4 shadow">
          <div className="flex flex-col lg:flex-row">
            <div className="flex-row mt-4">
              <p className="text-gray-600">
                <b>Last Name</b>
              </p>
              <input
                className="input input-bordered bg-white text-gray-600 mb-1"
                onChange={event => setLastName(event.target.value)}
              />
              <p className="text-gray-400 mb-2 italic">40 max characters</p>
            </div>
            <div className="flex-row mt-4 ml-4">
              <p className="text-gray-600">
                <b>First Name</b>
              </p>
              <input
                className="input input-bordered bg-white text-gray-600 mb-1"
                onChange={event => setFirstName(event.target.value)}
              />
              <p className="text-gray-400 mb-4 italic">30 max characters</p>
            </div>

            <div className="flex-row mt-4 ml-4">
              <p className="text-gray-600">
                <b>Phone Number</b>
              </p>
              <input
                placeholder="Ex: (808)395-9511"
                className="input input-bordered bg-white text-gray-600 mb-1"
                onChange={event => setPhoneNumber(event.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            <div className="flex-row mt-1">
              <p className="text-gray-600">
                <b>E-mail Address</b>
              </p>
              <input
                className="input input-bordered bg-white text-gray-600 mb-1"
                onChange={event => setEmail(event.target.value)}
              />
            </div>
            <div className="flex-row mt-1 ml-4">
              <p className="text-gray-600">
                <b>Confirm E-mail Address</b>
              </p>
              <input
                className="input input-bordered bg-white text-gray-600 mb-1"
                onChange={event => setConfirmEmail(event.target.value)}
              />
            </div>
          </div>
        </div>
        <button className="btn btn-primary" onClick={submitForm}>Submit</button>
      </div>
    </div>
  );
};

export default ReportForm;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../../../assets/Banner/banner.jpg";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/post/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-2xl">
          <h1 className="mb-5 text-5xl font-bold">
            Welc
            <span style={{ color: "skyblue", fontWeight: "bold" }}>
              <Typewriter
                words={["ome to our DevTalk !"]}
                loop={5}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </h1>
          <p className="mb-5">
            Welcome to DevTalk, your go-to platform for the latest in tech
            trends, coding tutorials, and developer insights. Join us and
            elevate your skills with our vibrant community of tech enthusiasts!
          </p>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow text-black font-bold"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleInputChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-3 h-4 opacity-100"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>

            <button type="submit" className="btn btn-secondary mt-2">
              Get Result
            </button>
            <div className="flex justify-evenly items-center mt-5">
              <button
                type="submit"
                className="btn flex justify-start btn-primary mt-2"
              >
                Popular Search {"---"}
              </button>
              <p className="text-3xl font-semibold">django</p>
              <p className="text-3xl font-semibold">react</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;

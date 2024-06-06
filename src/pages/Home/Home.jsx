import Posts from "../../components/DisplayPosts/Posts";
import Banner from "./Banner/Banner";
import Slider from "./Slider/Slider";

const Home = () => {
    return (
        <div>
            <Banner />
            <Slider />
            <Posts />
        </div>
    );
};

export default Home;
import useAnnouncement from "../../hooks/useAnnouncement";
import Loading from "../../shared/Loading/Loading";
import AnnouceCard from "./AnnouceCard";

const Announcement = () => {
    const [announcement, isPending] = useAnnouncement();
    

    if(isPending){
        return <Loading />
    }
    return (
        <div className="mt-24">
            {
                announcement.map(announce => <AnnouceCard key={ announce._id} announce={announce} />)
            }
        </div>
    );
};

export default Announcement;
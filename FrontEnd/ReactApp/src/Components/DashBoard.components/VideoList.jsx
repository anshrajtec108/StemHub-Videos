import { useEffect, useState } from "react";
import CardThumbnail from "../CardThumbnail/CardThumbnail";
import { makeGetRequest } from "../../services/api";
import { useParams } from "react-router-dom";
import { URLS } from "../../constants/Urls";
import Loader from "../CardThumbnail/Loader";

function VideoList(props) {
    // const { userId } = useParams()
    const userId = '659ac647a7b9efbbfd8d7297';
    const [videoList, setVideoList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchChannelVideoData = async () => {
        try {
            const res = await makeGetRequest(`${URLS.getChannelvideoinfo}/?userId=${userId}&page=${page}&limit=${1}`, {}, {});
            // console.log(`${ URLS.getChannelvideoinfo } / ${ userId }`);
            console.log(res?.data)
            if(videoList.length<=0){
                setVideoList(res.data);
            }else{
                setVideoList((prev) => [...prev, ...res.data]);
            }
          
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handelInfiniteScroll = async () => {
       
        try {
            if (
                window.innerHeight + document.documentElement.scrollTop + 1 >=
                document.documentElement.scrollHeight
            ) {
                setLoading(true);
                setPage((prev) => prev + 1);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handelInfiniteScroll);
        return () => window.removeEventListener("scroll", handelInfiniteScroll);
    }, []);

    useEffect(() => {
        fetchChannelVideoData();
    }, [page]);

    return (
        <div style={{ "marginTop": "60px" }}>
            <div>
                <div className="holder mx-auto w-10/12 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                    {
                        videoList ? (
                            videoList.map((data, index) => (
                                // {console.log(data.title)}
                                // <p key={index}>{data}</p>
                                <CardThumbnail key={index} title={data.title} duration={data.duration} thumbnail={data.thumbnail} updatedAt={data.updatedAt} />
                            ))
                        ) : (
                            <p>No videos uploaded</p>
                        )
                    }
                    {loading && <Loader />}

                </div>
            </div>
        </div>
    );
}





export default VideoList;

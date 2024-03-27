import { useEffect, useState } from "react";
import CardThumbnail from "../CardThumbnail/CardThumbnail";
import { makeGetRequest } from "../../services/api";
import { useParams } from "react-router-dom";
import { URLS } from "../../constants/Urls";

function VideoList(props) {
    // const { userId } = useParams()
    const userId = '659ac647a7b9efbbfd8d7297';
    const [videoList, setVideoList] = useState([]);

    const fetchChannelVideoData = async () => {
        try {
            const res = await makeGetRequest(`${URLS.getChannelvideoinfo}/${userId}`, {}, {});
            console.log(`${ URLS.getChannelvideoinfo } / ${ userId }`);
            console.log(res.data.title)
            setVideoList(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchChannelVideoData();
    }, [setVideoList]);

    return (
        <div style={{ "marginTop": "60px" }}>
            <div>
                <div className="holder mx-auto w-10/12 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
{
                    videoList? (
                    videoList.map((data, index) => (
                        // {console.log(data.title)}
                        // <p key={index}>{data}</p>
                        <CardThumbnail key={index} title={data.title} duration={data.duration} thumbnail={data.thumbnail} updatedAt={data.updatedAt} />
                    ))
                    ) : (
                    <p>No videos uploaded</p>
                    )
}

                </div>
            </div>
        </div>
    );
}

export default VideoList;

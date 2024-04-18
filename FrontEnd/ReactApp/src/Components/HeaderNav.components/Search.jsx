import React, { useEffect, useState } from 'react'
import { makeGetRequest } from '../../services/api';

function VideoListForHome() {

    const [videoList, setVideoList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(5)

    const fetchChannelVideoData = async () => {
        try {
            const res = await makeGetRequest(`/videos/?query=${query}&sortBy=${sort}`, {}, {});
            // console.log(`${ URLS.getChannelvideoinfo } / ${ userId }`);
            console.log(res?.allVideos)
            if (videoList.length <= 0) {
                setVideoList(res.allVideos);
            } else {
                setVideoList((prev) => [...prev, ...res.allVideos]);
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
                                <CardThumbnail key={index} title={data.title} id={data._id} duration={data.duration} thumbnail={data.thumbnail} updatedAt={data.updatedAt} videoOwner={data.owner} />
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

function Search() {
    
  return (
    <div>
      
    </div>
  )
}

export default Search

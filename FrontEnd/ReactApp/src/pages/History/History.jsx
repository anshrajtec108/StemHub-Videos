import React, { useEffect, useState } from 'react';
import { makeGetRequest } from '../../services/api';
import SmallCardThumbnail from '../../Components/CardThumbnail/SmallCardThumbnail';

function History() {
    const [videoList, setVideoList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(5);

    const fetchChannelVideoData = async () => {
        try {
            const res = await makeGetRequest(`/users/history/?page=${page}&limit=${limit}`, {}, {});

            if (!videoList.length) {
                setVideoList(res.data);
            } else {
                setVideoList((prev) => [...prev, ...res.data]);
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleInfiniteScroll = () => {
        try {
            if (
                window.innerHeight + document.documentElement.scrollTop + 1 >=
                document.documentElement.scrollHeight &&
                !loading
            ) {
                setLoading(true);
                setPage((prev) => prev + 1);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleInfiniteScroll);
        return () => window.removeEventListener("scroll", handleInfiniteScroll);
    }, []);

    useEffect(() => {
        fetchChannelVideoData();
    }, [page]);

    return (
        <div>
            {videoList.map((data, index) => (
                <SmallCardThumbnail key={data._id} videos={data} videoOwner={data.owner[0]} />
            ))}
            {loading && <p>Loading...</p>}
        </div>
    );
}

export default History;

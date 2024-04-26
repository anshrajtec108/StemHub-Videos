import React, { useEffect, useState } from 'react';
import { makeGetRequest } from '../../services/api';
import SmallCardThumbnail from '../../Components/CardThumbnail/SmallCardThumbnail';
import { useDispatch, useSelector } from 'react-redux';
import { saveisChangeFromHistory } from '../../store/reducers/currentPlayinfo';

function History() {

    let currentplayInfo = useSelector((store) => store.currentPlayinfo);
    let changeInHistory = currentplayInfo.changeInHistory
    let isChangeFromHistory=currentplayInfo.isChangeFromHistory
    const [videoList, setVideoList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(5);
    let dispatch = useDispatch()
    const fetchChannelVideoData = async () => {
        try {
            const res = await makeGetRequest(`/users/history/?page=${page}&limit=${limit}`, {}, {});

            if (!videoList.length || isChangeFromHistory) {
                setVideoList(res.data);
                dispatch(saveisChangeFromHistory(false))
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
    }, [page, changeInHistory]);

    return (
        <div>
            {videoList.map((data, index) => (
                <SmallCardThumbnail key={data._id} videos={data} videoOwner={data.owner[0]} historyPage={true} />
            ))}
            {loading && <p>Loading...</p>}
        </div>
    );
}

export default History;

import React, { useEffect, useState } from 'react';
import { makeGetRequest } from '../../services/api';
import CardThumbnail from '../CardThumbnail/CardThumbnail';
import Loader from '../CardThumbnail/Loader';
import { useParams } from 'react-router-dom';

function VideoListForSearch({ queryVar, newQueryVar, sortBy, sortType, setSortBy, setSortType }) {
    const [videoList, setVideoList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(5);

    const fetchSearchVideoData = async () => {
        try {
            setLoading(true);
            const res = await makeGetRequest(`/videos/?query=${queryVar}&sortBy=${sortBy}&page=${page}&limit=${limit}&sortType=${sortType}`, {}, {});
            if (newQueryVar) {
                setVideoList([]);
                setPage(1); // Reset page to 1 when performing a new query
            }
            setVideoList((prev) => [...prev, ...res.data]);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleInfiniteScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        fetchSearchVideoData();
    }, [queryVar, sortBy, sortType, page]); // Include queryVar, sortBy, sortType, and page in dependencies

    useEffect(() => {
        window.addEventListener("scroll", handleInfiniteScroll);
        return () => window.removeEventListener("scroll", handleInfiniteScroll);
    }, []);

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleSortTypeChange = (e) => {
        setSortType(e.target.value === 'Descending' ? 'desc' : 'asc');
    };

    return (
        <div style={{ "marginTop": "6px" }}>
            <div >
                <div style={{ color: '#ff3300', display: 'flex', justifyContent: 'space-around', backgroundColor:'#9fabbf' ,padding:'8px'}}>
                    <div>
                        <label htmlFor="sortBy">Sort By:</label>
                        <select id="sortBy" value={sortBy} onChange={handleSortChange}>
                            <option value="createdAt">Created At</option>
                            <option value="views">Views</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="sortType">Sort Type:</label>
                        <select id="sortType" value={sortType} onChange={handleSortTypeChange}>
                            <option value="Ascending">Ascending</option>
                            <option value="Descending">Descending</option>
                        </select>
                    </div>
                </div>
                <div className="holder mx-auto w-10/12 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                    {videoList.length > 0 ? (
                        videoList.map((data, index) => (
                            <CardThumbnail key={index} title={data.title} id={data._id} duration={data.duration} thumbnail={data.thumbnail} updatedAt={data.updatedAt} videoOwner={data.owner} />
                        ))
                    ) : (
                        <p>No videos found</p>
                    )}
                    {loading && <Loader />}
                </div>
            </div>
        </div>
    );
}

function Search() {
    const { query, newQuery } = useParams();
    const [queryVar, setQueryVar] = useState('');
    const [newQueryVar, setNewQueryVar] = useState(false);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortType, setSortType] = useState('asc');

    useEffect(() => {
        if (query) {
            setQueryVar(query);
            setNewQueryVar(newQuery === 'true');
        }
    }, [query, newQuery]);

    return (
        <div>
            {query ? (
                <VideoListForSearch queryVar={queryVar} newQueryVar={newQueryVar} sortBy={sortBy} sortType={sortType} setSortBy={setSortBy} setSortType={setSortType} />
            ) : (
                <p onClick={() => alert('The query is required')}>Click to show alert</p>
            )}
        </div>
    );
}

export default Search;

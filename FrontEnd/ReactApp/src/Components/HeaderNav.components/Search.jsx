import React, { useEffect, useState } from 'react'
import { makeGetRequest } from '../../services/api';
import CardThumbnail from '../CardThumbnail/CardThumbnail';
import Loader from '../CardThumbnail/Loader';
import { useParams } from 'react-router-dom';
var queryVar;
var newQueryVar;
function VideoListForSearch(props) {

    console.log("searchQuery",searchQuery);
    const [videoList, setVideoList] = useState([]);
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortType, setSortType] = useState('');
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(5)
    const [reload,setReload]=useState(true)
    // const [prevQuery, setPrevQuery] = useState('');
   
    const fetchSearchVideoData = async () => {
        try {
            // if (searchQuery) {
            //     setQuery(searchQuery)
            //     return;
            // } else {
            //     alert(`the query is required 2`)
            // }
            if (queryVar) {
            console.log('newQueryVar1', newQueryVar);
            console.log('query1', queryVar);
                if (newQueryVar){
                setVideoList([])
                console.log('videoList', videoList, queryVar);
            }

                const res = await makeGetRequest(`/videos/?query=${queryVar}&sortBy=${sortBy}&page=${page}&limit=${limit}&sortType=${sortType}`, {}, {});
                console.log("data", res?.data)
                if (videoList.length <= 0) {
                    setVideoList(res.data);
                } else {
                    setVideoList((prev) => [...prev, ...res.data]);
                }
            }else{
                alert(`the query is required 3`)
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
        fetchSearchVideoData();
    }, [page, searchQuery, sortBy, newQueryVar,]);

    useEffect(() => {
        window.addEventListener("scroll", handelInfiniteScroll);
        return () => window.removeEventListener("scroll", handelInfiniteScroll);
    }, []);


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
    const { query, newQuery } = useParams();
    console.log('newQueryVar2', newQueryVar, 'query', query);
    queryVar=query
    newQueryVar=newQuery
  return (
      <div>
          {query ? (
              <VideoListForSearch  />

          ) : (
              <p onClick={() => alert('The query is required')}>Click to show alert</p>
          )}
      </div>

  )
}

export default Search

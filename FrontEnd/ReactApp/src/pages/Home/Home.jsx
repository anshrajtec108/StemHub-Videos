import { useEffect, useState } from "react";
import CardThumbnail from "../../Components/CardThumbnail/CardThumbnail"
import { makeGetRequest } from "../../services/api";
import Loader from "../../Components/CardThumbnail/Loader";

function VideoListForHome() {

  const [videoList, setVideoList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [limit,setLimit]=useState(5)

  const fetchChannelVideoData = async () => {
    try {
      const res = await makeGetRequest(`/videos/recommendation/video/?page=${page}&limit=${limit}`, {}, {});
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
                <CardThumbnail key={index} createdAt={data.createdAt} title={data.title} id={data._id} duration={data.duration} thumbnail={data.thumbnail} updatedAt={data.updatedAt} videoOwner={data.owner} />
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


function Home(props) {
  
  return (
    <div>
      <div>


        {/* <div className="heading text-center font-bold text-2xl m-5 text-gray-100">Full Responsive Video Cards</div> */}

        
          <VideoListForHome/>
    
      </div>

    </div>
    
  )
}

export default Home

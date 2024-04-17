import React, { useEffect, useState } from 'react';
import Loader from '../CardThumbnail/Loader';
import { makeGetRequest, makePostRequest } from '../../services/api';

const Content=(props)=>{
    function calculateTimeDifference(updatedAt) {
        const currentDate = new Date();
        const updatedDate = new Date(updatedAt);

        // Calculate time difference in milliseconds
        const timeDifference = currentDate - updatedDate;

        // Convert milliseconds to seconds, minutes, hours, days, months, and years
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (years >= 1) {
            return `${years} year${years > 1 ? 's' : ''} ago`;
        } else if (months >= 1) {
            return `${months} month${months > 1 ? 's' : ''} ago`;
        } else if (days >= 1) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours >= 1) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes >= 1) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return '1 minute ago'; // Minimum 1 minute
        }
    }
 
    const updatedAt = props.comment?.updatedAt; // Example updated date
    const formattedTimeDifference = calculateTimeDifference(updatedAt);
    return(
    <div>
        <article className="p-6 text-base rounded-lg dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-100 dark:text-white font-semibold"><img
                        className="mr-2 w-6 h-6 rounded-full"
                            src={props.userDetails?.avatar}
                            alt="avatar" />{props.userDetails?.fullName}</p>
                    <p className="text-sm text-gray-400 dark:text-gray-400"><time>{formattedTimeDifference}</time></p>
                </div>

            </footer>
                <p className="text-gray-100 dark:text-gray-300">{props.comment?.content}</p>
        </article>
    </div>
    )
}

const CommentList = (props) => {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState('video');
    const [commentData,setCommentData]=useState([])
    const [count,setCount]=useState(0)
    const [inputComment,setInputComment]=useState('')

    const fetchVideoComments = async () => {
        try {
            const res = await makeGetRequest(`/comments/${props?.videoId}/?type=${type}&page=${page}`,{},{})
           console.log("res of comment ",res)
            if (commentData.length <= 0) {
                setCommentData(res.data);
                setLoading(false)
                setCount(res.data.length)

            } else {
                setCommentData((prev) => [...prev, ...res.data]);
            }
            
        } catch (error) {
            console.log(error);
        }
    };

    const handleInfiniteScroll = async () => {
        try {
            const commentSection = document.getElementById('comment-section');

            if (
                commentSection &&
                commentSection.offsetHeight + commentSection.scrollTop + 1 >=
                commentSection.scrollHeight
            ) {
                setLoading(true);
                setPage((prev) => prev + 1);
                console.log("page",page);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const commentSection = document.getElementById('comment-section');
        if (commentSection) {
            commentSection.addEventListener('scroll', handleInfiniteScroll);
        }

        return () => {
            if (commentSection) {
                commentSection.removeEventListener('scroll', handleInfiniteScroll);
            }
        };
    }, []);

    useEffect(() => {
        fetchVideoComments();
    }, [page]);

    const handleSubmitPost=async(e)=>{
        e.preventDefault()
        const res = await makePostRequest(`/comments/${props?.videoId}/?type=${type}`, {}, { content :inputComment},{})
        if (res.statusCode <=200){
            setCommentData((prev) => [...res.data, ...prev,]);
            setInputComment('')
        }
        else{
            alert("something went wrong while adding comment  ",res)
        }
    }
    // console.log('setCommentData', commentData);
    return (
        <div>
        <section id="comment-section" className="main-container dark:bg-gray-900 py-8 lg:py-16 antialiased" style={{ height: '100vh', width: '100%', overflowY: 'auto' }}>
            <style>{`
                  @media (max-width: 700px) {
                    /* Media query for screens smaller than 700px */
                    .main-container{
                          overflow-y: none; 
                    }
                }`
                }
              </style>
            <style>
                
                {`
                /* Style the scrollbar for .main-container */
                .main-container::-webkit-scrollbar {
                    width: 8px;
                }
                
                .main-container::-webkit-scrollbar-thumb {
                    background-color: #a2faf4;
                    border-radius: 10px;
                }
                
                .main-container::-webkit-scrollbar-track {
                    background-color: #f0f0f0;
                }
                `}
            </style>
            <div className="max-w-2xl mx-auto px-4">
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-100 dark:text-white">Comments ({count})</h2>
                </div>
                    <form className="mb-6" onSubmit={(e) => handleSubmitPost(e)}>
                    <div className="py-2 px-3 mb-4 rounded-lg rounded-t-lg border border-gray-400 dark:border-gray-700">
                        <label htmlFor="comment" className="sr-only">Your comment</label>
                        <textarea id="comment" rows="3"
                        value={inputComment}
                        onChange={(e)=>(setInputComment(e.target.value))}
                            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                            placeholder="Write a comment..." required></textarea>
                    </div>
                    <button type="submit"
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-100">
                        Post comment
                    </button>
                </form>
                    {commentData ? (
                        commentData.map((data, index) => (
                            <Content key={data?._id + index} comment={data} userDetails={data?.owner}/>
                        ))
                    ) : (
                        <p>No comment posted</p>
                    )}
                {/* <Content/> */}
               
            </div>
                {loading && <Loader />}
        </section>
        </div>
    );
};

export default CommentList;

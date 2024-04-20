
import React, { useState } from 'react';
import axios from 'axios';
import { makePostRequest } from '../../services/api';

function VideoUpload() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (event.target.name === 'videoFile') {
                setVideoFile(file);
            } else if (event.target.name === 'thumbnail') {
                setThumbnail(file);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('videoFile', videoFile);
        formData.append('thumbnail', thumbnail);
        const headers= {
            'Content-Type': 'multipart/form-data',
                }
        try {
            const res = await makePostRequest('/videos',{},formData,headers)
            setMessage(res.data.message);
            setLoading(false);
        } catch (error) {
            setMessage('Error uploading video.');
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-md">
                <h2 className="text-2xl text-white mb-6">Publish a Video</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 mb-4 rounded-md"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 mb-4 rounded-md text-black"
                />
                <label>video File</label>
                <input
                    type="file"
                    name="videoFile"
                    placeholder='video File'
                    onChange={handleFileChange}
                    className="mb-4"
                />
                <label>thumbnail</label>
                <input
                    type="file"
                    name="thumbnail"
                    onChange={handleFileChange}
                    placeholder='thumbnail'
                    className="mb-4"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                >
                    Publish Video
                </button>
                {loading && <p className="mt-4 text-white">Uploading...</p>}
                {message && <p className="mt-4 text-white">{message}</p>}
            </form>
        </div>
    );
};

export default VideoUpload


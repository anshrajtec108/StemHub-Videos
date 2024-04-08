import React from 'react';

//props ==videos{ thumbnail,title,description,},videoOwner{avatar,username}
function SmallCardThumbnail(props) {
    return (
        <div className="card-container" style={{ height: '180px', width: '350px', display: 'flex', alignItems: 'center', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginTop: "20px", backgroundColor: '#ffffff', overflow: 'hidden' }}>
            <img className="thumbnail-image" src={props.videos?.thumbnail || '/vite.svg'} alt="" style={{ height: '100%', width: 'auto', objectFit: 'cover', marginRight: '10px' }} />
            <div className="card-details" style={{ flexGrow: 1, padding: '8px' }}>
                <div className="title" style={{ fontWeight: 'bold', marginBottom: '5px', fontSize: '14px', color: '#333333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.videos?.title || "props.title"}</div>
                <div className="description" style={{ marginBottom: '5px', fontSize: '12px', color: '#666666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.videos?.description || "props.description"}</div>
                <div className="avatar" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={props.VideoOwner?.avatar || '/vite.svg'} alt="Avatar" style={{ height: '20px', width: '20px', borderRadius: '50%', marginRight: '5px' }} />
                    <div className="username" style={{ fontSize: '12px', color: '#888888' }}>{props.VideoOwner?.username || "props.username"}</div>
                </div>
                <div className="date" style={{ fontSize: '10px', color: '#999999' }}>{props.videos?.updatedAt || "props.updatedAt"}</div>
            </div>
        </div>
    );
}

export default SmallCardThumbnail;

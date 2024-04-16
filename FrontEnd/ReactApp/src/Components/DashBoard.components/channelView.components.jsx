import ChannelBannner from "./ChannelBannner"
import VideoList from "./VideoList"


const ChannelView = () => {
  const channelId = `/dashboard/${userId}`;
  return (
    <div>
      <ChannelBannner/>
      <VideoList/>
    </div>
  )
}

export default ChannelView

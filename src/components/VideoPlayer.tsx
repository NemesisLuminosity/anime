interface VideoPlayerProps {
  youtubeId: string;
  title: string;
}

const VideoPlayer = ({ youtubeId, title }: VideoPlayerProps) => {
  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden glass-strong">
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};

export default VideoPlayer;

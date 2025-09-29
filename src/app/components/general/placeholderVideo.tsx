import { useState, forwardRef } from "react";

type VideoWithPlaceholderProps = {
    src: string;
    className?: string;
    aspect?: string;
};

const VideoWithPlaceholder = forwardRef<HTMLVideoElement, VideoWithPlaceholderProps>(
    ({ src, className, aspect = "aspect-video" }, ref) => {
        const [isVideoLoaded, setIsVideoLoaded] = useState(false);
        const [dynamicAspect, setDynamicAspect] = useState(aspect);

        return (
            <div className={`relative w-full ${dynamicAspect}`}>
                <video
                    ref={ref}
                    src={src}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 
                        ${className ?? ""} ${isVideoLoaded ? "opacity-100" : "opacity-0"}`}
                    autoPlay
                    loop
                    muted
                    controls={false}
                    playsInline
                    onLoadedMetadata={(e) => {
                        const v = e.currentTarget;
                        const ratio = v.videoWidth / v.videoHeight;
                        if (ratio > 1) {
                            setDynamicAspect("aspect-video");
                        } else {
                            setDynamicAspect("aspect-[9/19.5]");
                        }
                    }}
                    onLoadedData={() => setIsVideoLoaded(true)}
                />

                {!isVideoLoaded && (
                    <div className="absolute inset-0 flex justify-center items-center bg-gray-300">
                        <div className="w-full h-full bg-gray-400 blur-sm"></div>
                    </div>
                )}
            </div>
        );
    }
);

VideoWithPlaceholder.displayName = "VideoWithPlaceholder";
export default VideoWithPlaceholder;

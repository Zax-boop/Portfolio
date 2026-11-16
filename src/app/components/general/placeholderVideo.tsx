import { useState, forwardRef } from "react";
import Image from "next/image";

type VideoWithPlaceholderProps = {
    src: string;
    className?: string;
    aspect?: string;
    fallbackSrc?: string;
};

const VideoWithPlaceholder = forwardRef<HTMLVideoElement, VideoWithPlaceholderProps>(
    ({ src, className, aspect = "aspect-video", fallbackSrc }, ref) => {
        const [isVideoLoaded, setIsVideoLoaded] = useState(false);
        const [isVideoFailed, setIsVideoFailed] = useState(false);
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
                    onError={() => {
                        if (fallbackSrc) {
                            setIsVideoFailed(true);
                        }
                    }}
                />

                {isVideoFailed && fallbackSrc && (
                    <Image
                        src={fallbackSrc}
                        alt=""
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="100vw"
                        onLoad={() => setIsVideoLoaded(true)}
                    />
                )}

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

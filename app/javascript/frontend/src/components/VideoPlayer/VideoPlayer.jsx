import React from 'react';
import ReactPlayer from 'react-player';

export default function VideoPlayer({ video, captions }) {
/*   const [load, setLoad] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoad(true)
    }, 500);

    return () => {
      setLoad(false);
    }
  }, [video]);

  if (!load) {
    return <span>loading...</span>
  }
 */

  const emptyVideo = () => (
    <div className="w-full h-full"></div>
  )

  return (
    <ReactPlayer
      config={{
        file: {
          attributes: {
            crossOrigin: "true",
          },
          tracks: captions,
        },
      }}
      url={video}
      fallback={emptyVideo()}
      controls={true}
      width="100%"
      height="100%"
    />
  );
}
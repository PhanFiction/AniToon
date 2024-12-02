import React, { useState, useEffect, useRef } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import Comment from '../components/Comment';

const fakeComments = [
  {
    comment: "23:59 HOLY ****! Is that a JJK reference!???",
    userId: 1,
    username: "Jackie"
  },
  {
    comment: "done on 28/11/24",
    userId: 2,
    username: "Asuna"
  },
  {
    comment: "24:00 bro is mimicking gojo",
    userId: 3,
    username: "itz_cylina"
  },
  {
    comment: "My boy nagi🔥",
    userId: 4,
    username: "Jin"
  },
  {
    comment: "This is one of the best movie I have ever seen it looks like underrated way there is only 800 comments",
    userId: 5,
    username: "Hamza boss"
  },
  {
    comment: "fire",
    userId: 6,
    username: "BalrajBali"
  },
  {
    comment: "I guess this is where all of the budget of season 2 went",
    userId: 7,
    username: "JOICEJVARGHESE"
  },
  {
    comment: "still better than Haikyu",
    userId: 8,
    username: "Anguished6"
  },
]

export default function Episode() {
  const params = useParams();
  
  const location = useLocation();
  const url = params.id + location.search;
  const navigate = useNavigate();
  const [info, setInfo] = useState('');
  const selectedEpisodenRef = useRef([]);
  const [showEpisodes, setEpisodes] = useState({
    allEpisodes: [],
    currentEpisode: '',
    captions: [],
  });
  const [episodeStream, setEpisodeStream] = useState({
    // currentServer: { serverType: '', serverName: '' },
    allServers: [],
    currentStream: {sub: [], dub: []},
  });
  const [activeSubServer, setActiveSubServer] = useState({ serverType: '', serverName: '', serverId: '' });
  const [activeDubServer, setActiveDubServer] = useState({ serverType: '', serverName: '', serverId: '' });

  const colors = {
    selected: "bg-bluePurple rounded-md p-2 w-24",
    unselected: "bg-black rounded-md p-2 w-24"
  }

  // Fetch episode and episode information on initial render
  useEffect(() => {
    const fetchEpisode = async () => {
      const episodes = await fetch(`/api/anime/episodes/${params.id}`);
      const animeInfo = await fetch(`/api/anime/info?id=${params.id}`);

      const fetchedEpisodesData = await episodes.json();
      const animeInfoData = await animeInfo.json();

      // console.log('anime info is ', animeInfoData);
      // console.log('fetched episodes is ', fetchedEpisodesData);

      // if the query in params is empty, update the url to have the episode id query
      if (location.search === '') navigate(`/anime/watch/${fetchedEpisodesData.episodes[0].episodeId}`);

      // Save to states
      setInfo({...animeInfoData.data.info});
      setEpisodes({
        allEpisodes: fetchedEpisodesData.episodes,
        currentEpisode: { ...fetchedEpisodesData.episodes[0] }
      });
      
      // Set button background to selected one 
      if (selectedEpisodenRef.current.length > 0) selectedEpisodenRef.current[0].className = colors["selected"];
    }
    fetchEpisode();
  }, []);

  // Fetch and update episode when user clicks on different server, servertype, and servername
  useEffect(() => {
    const abortController = new AbortController();

    const fetchEpisodeData = async () => {
      // console.log(params.id, location.search, url)
      const episodeServer = await fetch(`/api/anime/episode_server?id=${showEpisodes.currentEpisode.episodeId}`);
      const streamServer = await fetch(`/api/anime/episode?id=${url}&server=${activeSubServer.serverName !== '' ? activeSubServer.serverName : activeDubServer.serverName}&category=${activeSubServer.serverType !== '' ? activeSubServer.serverType : activeDubServer.serverType}`);

      const episodeServerData = await episodeServer.json();
      const streamServerData = await streamServer.json();

      // Get subtitles from data and convert to React Player captions.
      // Bug with library where the captions will disappear after selecting the next video.
      // The only option is to have one track which is english by default.
      const defaultSubtitles = await streamServerData.tracks.find(item => item.label === 'English');
      const subtitles = [{
        kind: defaultSubtitles.kind,
        src: defaultSubtitles.file,
        srcLang: defaultSubtitles.label,
        default: defaultSubtitles.default,
        label: "English"
      }];

      // Save episodes server and streams in state
      setEpisodeStream({
        allServers: episodeServerData,
        currentStream: { ...streamServerData },
        captions: subtitles
      });

      // const [activeSubServer, setActiveSubServer] = useState({ serverType: 'sub', serverName: 'hd-1' });
      // Set server to default if empty
      if ((activeSubServer.serverType === '' && activeSubServer.serverName === '') && (activeDubServer.serverType === '' && activeDubServer.serverName === '')) {
        //selectedEpisodenRef.current[0].className = colors["selected"];
      }

      console.log('All Server data is ', episodeServerData);
      // console.log('Stream is ', streamServerData);
    }
    if (showEpisodes.currentEpisode) fetchEpisodeData();

    // Cleanup effect
    return () => {
      abortController.abort();
    };
  }, [showEpisodes.currentEpisode, activeSubServer, activeDubServer]);

  const updateEpisode = (episode) => () => {
    setEpisodes({
      ...showEpisodes,
      currentEpisode: { ...episode }
    });
  }

  /**
   * @param {*} index: 1 
   * @param {*} serverId: 4 
   * @param {*} serverName: 'hd-1 
   * @param {*} serverType: 'Sub' 
   */
  const handleServerSwitch = (index, serverId, serverName, serverType) => {
    console.log(index);
    if (serverType === 'sub') {
      setActiveSubServer({serverName, serverType, serverId})
      setActiveDubServer({serverName: '', serverType: '', serverId: ''})
    } else {
      setActiveDubServer({serverName, serverType, serverId})
      setActiveSubServer({serverName: '', serverType: '', serverId: ''})
    }
    // selectedEpisodenRef.current[index].className = colors["selected"];
/*     if (index === 0) {
      selectedEpisodenRef.current[index].className = colors["selected"];
      selectedEpisodenRef.current[1].className = colors["unselected"];
    } else {
      selectedEpisodenRef.current[index].className = colors["selected"];
      selectedEpisodenRef.current[0].className = colors["unselected"];
    } */
    // serverType === 'sub' ? setActiveSubServer({serverName, serverType, serverId}) : setActiveDubServer({serverName, serverType, serverId});
  };

  return (
    <section className="text-white p-4">
      <h1>Episode Name: <span className="font-semibold">{showEpisodes.currentEpisode.title}</span></h1>
      
      {/* Episode Section */}
      <div className="flex flex-col md:flex-row bg-midnightBlue">
        {/* Display a list of episodes */}
        <div className="flex flex-col-reverse lg:flex-row w-full md:w-3/4">
          <div className="flex flex-col w-full lg:w-72 h-[250px] lg:h-[500px] overflow-y-auto">
            {
              showEpisodes.allEpisodes.map((item, index) => (
                <div key={item.episodeId}>
                  {
                    url === item.episodeId
                    ? <Link to={`/anime/watch/${item.episodeId}`}>
                      <button
                          onClick={updateEpisode(item)}
                          className="p-2 w-full text-left border-l-4 border-red-300 bg-blueViolet text-cyan"
                        >
                          <div className="flex items-center">{index + 1}. <div className="mx-4 truncate"> {item.title} </div></div>
                        </button>
                      </Link>
                    : <Link to={`/anime/watch/${item.episodeId}`}>
                        <button
                          onClick={updateEpisode(item)}
                          className="hover:bg-blueViolet hover:text-cyan p-2 w-full text-left bg-nearBlackIndigo"
                        >
                          <div className="flex items-center">{index + 1}. <div className="mx-4 truncate"> {item.title} </div></div>
                        </button>
                      </Link>
                  }
                </div>
              ))
            }
          </div>
          
          {/* Video Player */}
          <div className="w-full lg:w-4/6">
            {
              episodeStream.currentStream.sources && (
                <div className="">
                  <VideoPlayer
                    video={episodeStream.currentStream.sources[0].url}
                    captions={episodeStream.captions}
                  />
                </div>
              )
            }
            {/* Sub selection */}
            <div className="flex flex-col justify-center bg-darkBluePurple">
              <div className="flex flex-wrap items-center gap-4 m-2 justify-start">
                <h4 className="font-bold text-lg mr-4">{episodeStream.allServers.sub?.length > 0 ? "Sub:" : ""}</h4>
                {
                  episodeStream.allServers.sub?.length > 0 &&
                  episodeStream.allServers.sub.map((item, index) => 
                    <button
                    onClick={()=>{handleServerSwitch(index, item.serverId, episodeStream.allServers?.sub[index].serverName, 'sub')}}
                    ref={(el) => {selectedEpisodenRef.current[index] = el}}
                    className={`${activeSubServer.serverId === item.serverId ? 'bg-bluePurple' : 'bg-black'} rounded-md p-2 text-sm`}
                    key={index}
                  >
                    { item.serverName }
                  </button>
                  )
                }
              </div>

              {/* Dub selection */}
              <div className="flex flex-wrap items-center gap-4 m-2 justify-start">
                <h4 className="font-bold text-lg mr-4">{episodeStream.allServers.dub?.length > 0 ? "Dub:" : ""}</h4>
                {
                  episodeStream.allServers.dub?.length > 0 &&
                  episodeStream.allServers.dub.map((item, index) =>
                    <button
                      onClick={()=>{handleServerSwitch(index + episodeStream.allServers?.dub.length, item.serverId, episodeStream.allServers?.dub[index].serverName, 'dub')}}
                      ref={(el) => {selectedEpisodenRef.current[index + episodeStream.allServers?.dub.length] = el}}
                      className={`${activeDubServer.serverId === item.serverId ? 'bg-bluePurple' : 'bg-black'} rounded-md p-2 text-sm`}
                      key={index}
                    >
                      { item.serverName }
                    </button>
                  )
                }
              </div>

            </div>
          </div>
        </div>

        {/* Episode Information */}
        <div className="flex flex-col gap-4 lg:flex md:w-2/6 p-2 bg-nearBlackIndigo">
          <div className="w-2/6">
            <img src={info.poster} alt="cover" className="object-cover w-40"/>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold">{info.name}</h1>
          <p className="text-sm h-48 overflow-y-auto">
            {info.description}
          </p>
        </div>

      </div>

      {/* Comment Section */}
      <h2 className="mt-4">Comments</h2>
      <div className="mb-8 bg-midnightBlue w-full">
        <Comment />
        {
          fakeComments.map((c, index) => 
            <div key={index} className="flex gap-4 my-8">
              <img src="https://cdn.noitatnemucod.net/avatar/100x100/jujutsu_kaisen/File14.png" alt="profile" className="rounded-full w-16 h-16" />
              <div className="flex flex-col">
                <span className="text-sm font-bold mb-2">{c.username}</span>
                <p className="text-lightGray">{c.comment}</p>
              </div>
            </div>
          )
        }
      </div>
      
    </section>
  )
}

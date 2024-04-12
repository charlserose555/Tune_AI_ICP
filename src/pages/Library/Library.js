import React, { useEffect, useRef, useState } from "react";

import FavouriteTrack from "./FavouriteTrack";
import ReleasedTrack from "./ReleasedTrack";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useApi from "../../hooks/useApi";
import { useDispatch, useSelector } from "../../store";
import UploadSongModal from "./UploadSongModal";

function Home() {
  const history = useHistory();
  const Api = useApi();

  const [activeTab, setActiveTab] = useState('Released');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const TabContent = ({ id, activeTab, children }) => (
    <div
      style={{
        display: id === activeTab ? 'block' : 'none'
      }}
    >
      {children}
    </div>
  );

  return (
    <>
      <div className="flex flex-col pt-16 font-plus pl-6 pr-6 text-white relative">
        <div className="absolute flex flex-row justify-start items-end z-index-1">
            <p className="text-24 font-normal leading-30 font-plus">My Library</p>
            <img className="px-3" src="/demo/assets/right_arrow.svg"></img>
        </div>
        <div className="relative pt-[58px]">
            <div class="flex flex-col mx-auto">  
              <div className="flex flex-row w-full justify-between gap-[10px]">
                <div className="flex flex-row w-full pr-2" style={{maxWidth:"240px"}}>
                  <input type="text" placeholder="Search.." className="bg-primary-700 opacity-100 py-2 pl-4 px-4 rounded-3 text-white font-plus font-normal outline-none border-transparent w-full" style={{height: '40px'}}></input>
                </div>
                <a className="cursor-pointer fill-btn text-14 px-4 py-2 font-medium bg-darkblue-600 rounded-8 flex flex-row justify-center gap-45 items-center" onClick={() => openModal()} style={{textAlign: 'center', cursor: 'pointer', width:'120px'}}>
                  <p>Upload</p>
                  <img className="" src="/demo/assets/arrow-add.svg"/>
                </a>
              </div>
              <div>
                <ul className="tab-titles">
                  <li className={`${activeTab === 'Released' ? 'text-gray-200 border-gray-200' : 'text-gray-400 border-transparent'} inline-block cursor-pointer hover:text-gray-300 rounded-t-lg py-4 px-4 text-md font-medium text-center border-b-2`} onClick={() => handleTabClick('Released')}>Released</li>
                  <li className={`${activeTab === 'Favorite' ? 'text-gray-200 border-gray-200' : 'text-gray-400 border-transparent'} inline-block cursor-pointer hover:text-gray-300 rounded-t-lg py-4 px-4 text-md font-medium text-center border-b-2`} onClick={() => handleTabClick('Favorite')}>Favorites</li>
                </ul>
                <div className="tab-content">
                  <TabContent id="Released" activeTab={activeTab}>
                    <ReleasedTrack/>
                  </TabContent>
                  <TabContent id="Favorite" activeTab={activeTab}>
                    <FavouriteTrack/>
                  </TabContent>
                </div>
              </div>     
            </div>
        </div>

        <UploadSongModal isOpen={isModalOpen} onClose={closeModal}/>
      </div>
    </>
  );
}

export default Home;

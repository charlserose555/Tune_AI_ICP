import React, { useEffect, useRef, useState, useContext } from "react";
import { APIContext } from "../../context/ApiContext";
import TrackItem from "./TrackItem";
import audioPlay from "../../utils/AudioPlay";
import ReactPaginate from 'react-paginate';
import { dispatch, useSelector } from "../../store";
import { ShowModal } from "../../store/reducers/menu";
import CustomTableSortLabel from "../../components/CustomTableSortLabel";
import loading from "../../utils/Loading";
import { Menu } from '@headlessui/react';
import { IoIosArrowDown } from 'react-icons/io';
import { LibraryIcon } from "../../icons";

function MyTracks() {
    const [ myTrackList, setMyTrackList] = useState([]); 
    const { getTracksByArtistAPI } = useContext(APIContext);
    const { songListUpdated, user } = useSelector((state) => state.auth);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [sort, setSort] = useState(true);
    const [sortby, setSortby] = useState('createdAt');
    const [searchWord, setSearchWord] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    const handlePageChange = (data) => {
      setPage(data.selected);
    };

    const getMyTracks = async () => {
      const {data, count} = await getTracksByArtistAPI(user.principal, searchWord, page, pageSize, sort, sortby);
      
      setTotalCount(count)

      console.log("data", data)

      if(data != null) {
        setMyTrackList(data)
      }

      setIsLoaded(true);
    }

    const createSortHandler = (key) => {
      setSortby(key);

      setSort(!sort);
    }

    const uploadSong = () => {
      if(!user.isInitialized) {
        dispatch(ShowModal("editProfile"))
        return;
      }
  
      dispatch(ShowModal("uploadSong"))
    }

    useEffect(() => {
      getMyTracks();
    }, [songListUpdated, searchWord, page, pageSize, sort, sortby])

    const play = (index) => {
      audioPlay(myTrackList, index);
    }

    return (<>
    <div className="flex flex-row justify-start items-end pt-[20px] mb-[150px]">
      <div className="w-full">
        <div className="flex flex-row w-full justify-between gap-[10px]">
          <div className="flex flex-row w-full pr-2" style={{maxWidth:"240px"}}>
            <input type="text" placeholder="Search.." value={searchWord} onChange={(e) => setSearchWord(e.target.value)} className="bg-primary-700 opacity-100 py-2 pl-4 px-4 rounded-3 text-white font-plus font-normal outline-none border-transparent w-full" style={{height: '40px'}}></input>
          </div>
        </div>

        <div className="overflow-x-auto x-scrollable-tag mt-4 pt-[20px]">
          <table className="w-full table-auto text-sm text-left rtl:text-right text-gray-500 text-gray-800 min-w-[610px]">
            <thead className="border-b border-gray-700 text-sm text-gray-700 bg-transparent bg-primary" style={{color: "white"}}>
              <tr>
                <th scope="col" className="px-4 pb-5 text-start">
                  <div className="flex justify-start w-full items-start flex-row cursor-pointer" onClick={() => createSortHandler('title')}>
                      <CustomTableSortLabel
                          className="m-2"
                          active={sortby === 'title'}
                          direction={sort ? 'desc' : 'asc'}>
                        Title
                      </CustomTableSortLabel> 
                  </div>
                </th>
                <th scope="col" className="px-4 pb-5 text-center">
                  <div className="flex justify-center w-full items-center flex-row cursor-pointer" onClick={() => createSortHandler('cover')}>
                      <CustomTableSortLabel
                          className="m-2"
                          active={sortby === 'cover'}
                          direction={sort ? 'desc' : 'asc'}>
                        Cover
                      </CustomTableSortLabel> 
                  </div>
                </th>
                <th scope="col" className="px-4 pb-5 text-center">
                  <div className="flex justify-center w-full items-center flex-row cursor-pointer"  onClick={() => createSortHandler('playCount')}>
                      <CustomTableSortLabel
                          className="m-2"
                          active={sortby === 'playCount'}
                          direction={sort ? 'desc' : 'asc'}
                          >
                        <img src="/demo/assets/eye_hidden.svg" className="min-w-[24px] min-h-[24px]"/>
                      </CustomTableSortLabel> 
                  </div>
                </th>
                <th scope="col" className="px-4 pb-5 text-center">
                  <div className="flex justify-center w-full items-center flex-row cursor-pointer"  onClick={() => createSortHandler('duration')}>
                      <CustomTableSortLabel
                          className="m-2"
                          active={sortby === 'duration'}
                          direction={sort ? 'desc' : 'asc'}
                          >
                      <img src="/demo/assets/clock.svg" className="w-[24px] h-[24px]"/>
                      </CustomTableSortLabel> 
                  </div>
                </th>
                <th scope="col" className="px-4 pb-5 text-center">
                  <div className="flex justify-center w-full items-center flex-row cursor-pointer" onClick={() => createSortHandler('createdAt')}>
                      <CustomTableSortLabel
                          className="m-2"
                          active={sortby === 'createdAt'}
                          direction={sort ? 'desc' : 'asc'}>
                        CreatedAt
                      </CustomTableSortLabel> 
                  </div>
                </th>
                <th scope="col" className="px-4 pb-5 text-center">       
                  <div className="flex justify-center w-full items-center flex-row cursor-pointer">
                    Action
                  </div>
                </th>
                <th scope="col" className="px-4 pb-5 text-center">       
                    Play
                </th>
              </tr>
          </thead>
          <tbody>
              {myTrackList.map((item, index) => { 
                return ((
                  <TrackItem trackItem={item} play={play} index={index} key={index}/>
              )) } )}
            </tbody>
          </table>
          {myTrackList.length == 0 && isLoaded ? (<div className="py-8 px-4 rounded-2 w-full justify-center items-center">
            <div className="flex row justify-center items-center text-18 gap-2">
              <LibraryIcon/>
              Tracks not found</div>
            </div>) : (null)}
        </div>

        {myTrackList.length != 0 ? (<div className="flex flex-row justify-between w-full ">
          <div className="mt-6 flex items-center justify-center h-8 ms-0 leading-tight
                  border rounded-lg bg-primary border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white" style={{alignItems: "center", justifyContent:"start"}} >
            <Menu as="div" className="relative inline-block text-left flex">
              <div>
                <Menu.Button className="flex flex-row w-full px-4 justify-around items-center gap-4 cursor-pointer">
                  <p className="profile-user-name font-plus">
                    {pageSize}
                  </p>
                  <IoIosArrowDown/>
                </Menu.Button>
              </div>
              <Menu.Items 
                className="absolute right-[-6px] top-8 mt-1 w-24 origin-top-right bg-secondary-700 divide-y bg-opacity-95 divide-gray-100 rounded-lg text-white shadow-bottom_1 transition-all duration-200 ease-in-out" >
                <div className="py-2 px-2 gap-[5px]">
                  <Menu.Item>
                    {({ active }) => (
                      <div onClick={() => setPageSize(10)} className={`menu-item flex justify-row items-center flex start px-45 mb-[10px] gap-[10px] rounded-2 cursor-pointer hover:bg-primary-800`}>
                        <a
                          className="block py-2 font-plus font-bold text-14 leading-[19px]"
                        >
                          10
                        </a>
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div onClick={() => setPageSize(20)} className={`menu-item flex justify-row items-center flex start px-45 gap-[10px] rounded-2 cursor-pointer hover:bg-primary-800`}>
                        <a
                          className="block py-2 font-plus font-bold text-14 leading-[19px]" 
                        >
                          20
                        </a>
                      </div>
                    )}
                  </Menu.Item><Menu.Item>
                    {({ active }) => (
                      <div onClick={() => setPageSize(50)} className={`menu-item flex justify-row items-center flex start px-45 gap-[10px] rounded-2 cursor-pointer hover:bg-primary-800`}>
                        <a
                          className="block py-2 font-plus font-bold text-14 leading-[19px]" 
                        >
                          50
                        </a>
                      </div>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>

          {totalCount > pageSize ? ( <div style={{alignItems: "center", justifyContent:"end"}} >
              <ReactPaginate
                className="inline-flex text-sm h-8 mt-6 "
                previousLabel={"previous"}
                nextLabel={"Next"}
                nextLinkClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight
                border rounded-e-lg bg-primary border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
                previousLinkClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight
                  border rounded-s-lg bg-primary border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
                breakLabel={"..."}
                selectedPageRel={page}
                breakClassName=""
                breakLinkClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight
                border bg-primary border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
                pageCount={Math.ceil(totalCount / pageSize)}
                pageLinkClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight
                border bg-primary border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
                pageClassName=""
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                activeLinkClassName="flex items-center justify-center h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 border-gray-700 bg-gray-700 text-white"
              />
            </div>) : ("")}
        </div>) : ("")}
      </div>
    </div>
    </>)
}

export default MyTracks;
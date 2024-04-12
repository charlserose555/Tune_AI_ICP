import React, { useEffect, useRef, useState } from "react";
import * as Icon from "../../icons";

function ReleasedTrack() {
    const [favouriteList, setFavouriteList] = useState([]); 

    function changeFavourite(index) {
      let items = [...favouriteList];
  
      items[index] = {...items[index], "isFavourite" : !items[index]?.isFavourite};
  
  
      setFavouriteList(items);
    } 
  
    useEffect(() => {
      let list = [{"index" : 0, "isFavourite" : false},
                  {"index" : 1, "isFavourite" : false},
                  {"index" : 2, "isFavourite" : false},
                  {"index" : 3, "isFavourite" : false},
                  {"index" : 4, "isFavourite" : false}]
  
      console.log("list", list);
      setFavouriteList(list)
    }, [])

    return (<>
    <div className="flex flex-row justify-start items-end pt-[20px] mb-[120px]">
      <div className="w-full">
        <div className="overflow-x-auto  x-scrollable-tag mt-4">
          <table className="w-full table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-800 min-w-[610px]">
            <thead className="border-b dark:border-gray-700 text-sm text-gray-700 bg-transparent dark:bg-primary" style={{color: "white"}}>
              <tr>
                  <th scope="col" className="px-4 pb-5 text-center min-w-[50px]">
                      # 
                  </th>
                  <th scope="col" className="px-4 pb-5 text-center">
                      Title
                  </th>
                  <th scope="col" className="px-4 pb-5 text-center"> 
                      Genres
                  </th>
                  <th scope="col" className="px-4 pb-5 text-center">
                  <div className="flex justify-center w-full items-center flex-row">
                      <img src="/demo/assets/eye_hidden.svg" className="w-[24px] h-[24px]"/>
                  </div>
                  </th>
                  <th scope="col" className="px-4 pb-5 text-center">
                  <div className="flex justify-center w-full items-center flex-row">
                      <img src="/demo/assets/clock.svg" className="w-[24px] h-[24px]"/>
                  </div>
                  </th>
                  <th scope="col" className="px-4 pb-5 text-center">                    
                  </th>
                  <th scope="col" className="px-4 pb-5 text-center">                    
                  </th>
              </tr>
          </thead>
          <tbody>
              {console.log(favouriteList.length)}
              {favouriteList.map((item, index) => { 
                console.log("value", index)
                return ((
                <tr style={{color: "white"}} className="group font-normal border-b bg-transparent border-gray-700 cursor-pointer group hover:bg-primary-800 transition-all duration-200 ease-in-out dark" key={index}>
                  <td className="text-center relative flex justify-center w-full items-center">
                    <img className="opacity-0 group-hover:opacity-100 absolute top-3 right-0" style={{width: "43px", height:"34px"}} src="/demo/assets/list_player.svg"/>
                    <span className="opacity:100 group-hover:opacity-0 absolute top-5 right-4">1</span>
                  </td>
                  <td className="px-4 py-3 text-center group-hover:text-darkblue-500 align-middle">
                    <div className="flex justify-center w-full items-center flex-row">
                      <img className="rounded-2" src="/demo/assets/avatar_list.png"/>
                      <p className="pl-2">Lorem ipsum dolor sit amet</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center group-hover:text-darkblue-500">Lorem ipsum dolor sit amet</td>
                  <td className="px-4 py-3 text-center group-hover:text-darkblue-500">100k</td>
                  <td className="px-4 py-3 text-center group-hover:text-darkblue-500">3:03</td>
                  <td className="px-4 py-3 text-center" onClick={() => changeFavourite(index)}> {item?.isFavourite? (<Icon.FullStarIcon/>) : (<Icon.StarIcon/>)} </td>
                  <td className="px-4 py-3 text-center"><Icon.OptionIcon/></td>
                </tr>
              )) } )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>)
}

export default ReleasedTrack;
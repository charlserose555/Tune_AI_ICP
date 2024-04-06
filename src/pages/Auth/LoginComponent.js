import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";

function LoginComponent({width, height}) {
    const history = useHistory();
    const location = useLocation();
    const [portraitUrl, setPortraitUrl] = useState('url("/demo/assets/portrait_1.png")');

    useEffect(() => {
        console.log("pathname", location.pathname);
        if(location.pathname.includes('genres/')) {
          setPortraitUrl('url("/demo/assets/portrait_3.png")');
        } else if(location.pathname.includes('genres') || location.pathname.includes('profile')) {
          setPortraitUrl('url("/demo/assets/portrait_2.png")');    
        } else if(location.pathname.includes('home')) {
            setPortraitUrl('url("/demo/assets/portrait_1.png")'); 
        } else {
            setPortraitUrl('url("/demo/assets/portrait_1.png")'); 
        }
    });

 return (
    <>
    <div className="shadow-lg rounded-4 flex flex-col justify-end items-center p-2 relative font-plus text-white" style={{
            width: width,
            height: height,
            backgroundImage: portraitUrl,
            backgroundRepeat: "no-repat",
            backgroundSize: "cover",
            backgroundBlendMode: "multiply",
          }}>
        <div className="items-center flex justify-center flex-col z-30">
            <p className="text-18 font-normal leading-22 tracking-wide">Access now and</p>
            <p className="text-18 font-normal leading-22 tracking-wide">start to win</p>              
        </div>
        <div className="flex flex-row justify-center items-center z-30">
            <img className="" src="/demo/assets/ethereum.svg"/>
            <img className="" src="/demo/assets/bitcoin.svg"/>
        </div>
        <div className="flex flex-col justify-between items-center gap-8 w-full px-4 pb-2 z-30">
            <a className="outline-btn text-12 px-4 py-2 font-medium rounded-8 w-full" 
                style={{border: '2px solid white', textAlign: 'center', cursor: 'pointer'}}
                onClick={() => history.push("/auth/login")}>Login</a>
            <a className="fill-btn text-12 px-4 py-2 font-medium bg-darkblue-600 rounded-8 w-full flex flex-row justify-center gap-45 items-center" 
                style={{textAlign: 'center', cursor: 'pointer'}}
                onClick={() => history.push("/auth/register")}>Register
                <img className="" src="/demo/assets/arrow-right.svg"/>
            </a>
        </div>
        <div className="absolute top-0 left-0 w-full rounded-4" style={{ height:height, background: "linear-gradient(360deg, rgba(5, 5, 5, 0.78) 26.1%, rgba(5, 5, 5, 0) 99.98%)"}}>
        </div>
    </div>
    </>
 )
}

export default LoginComponent;
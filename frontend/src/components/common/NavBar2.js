make this navbar perfectly looking and responsive for all device import React, { useState } from 'react'
import { Link, matchPath } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TiShoppingCart } from 'react-icons/ti'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useRef } from 'react'
// import { HiSearch } from 'react-icons/hi'
import { useNavigate } from 'react-router'

const NavBar = ({ setProgress }) => {
    const dispatch = useDispatch();

    const { token } = useSelector(state => state.auth);
    const { user } = useSelector(state => state.profile);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true)
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate();
    const [searchVisible, setSearchVisible] = useState(false);




    const location = useLocation()
    const matchRoutes = (routes) => {
        return matchPath({ path: routes }, location.pathname)
    }


    // const [sublinks, setsublinks] = useState([]);
    // const fetchSublinks = async () => {
    //     try {
    //         const result = await apiConnector("GET", categories.CATEGORIES_API);
    //         if (result?.data?.data?.length > 0) {
    //             setsublinks(result?.data?.data);
    //         }
    //         localStorage.setItem("sublinks", JSON.stringify(result.data.data));

    //     } catch (error) {
    //         // setsublinks(JSON.parse(localStorage.getItem("sublinks")));
    //         // console.log("could not fetch sublinks",localStorage.getItem("sublinks"));
    //         console.log(error);
    //     }
    // }
    // useEffect(() => {
    //     fetchSublinks();
    // }, [])

    const show = useRef();
    const overlay = useRef();

    const shownav = () => {
        show.current.classList.toggle('navshow');
        overlay.current.classList.toggle('hidden');
    }

    const searchRef = useRef(null);

    // Detect clicks outside the search form
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
          setSearchVisible(false); // Hide the search bar
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);



    //handeling navbar scroll
    const handleScroll = () => {
        const currentScrollPos = window.scrollY

        if (currentScrollPos > prevScrollPos) {
            setVisible(false)
        } else {
            setVisible(true)
        }

        setPrevScrollPos(currentScrollPos)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll)
    })

    const handelSearch = (e) => {
        e.preventDefault();
        if (searchValue?.length > 0) {
            navigate(/search/${searchValue});
            setSearchValue("");
        }
    }


    return (
        <div className={ flex lg:fixed sm:relative bg-richblack-900 w-screen relative z-50 h-14 items-center justify-center border-b-[1px] border-b-richblack-700   transition-all duration-500}>
         
         {/* {user && <div>{token}</div>} */}
            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
                <Link to='/' onClick={() => { dispatch(setProgress(100)) }}>
                <h1 className='text-white font-bold text-xl'>Aarogya Insight</h1>

                </Link>

                  {/* mobile Navbar
          {
                    user && user?.role !== "Core Member"&& user?.role !== "Admin" && (
                        <div className=' md:hidden'>
                            <Link to='/patient-dashboard' className='' onClick={() => { dispatch(setProgress(100)) }} >
                                <div className=''>
                                    <TiShoppingCart className=' fill-richblack-25 w-8 h-8' />
                                </div>
                               

                            </Link>
                        </div>
                    )
                }     */}
              

                <div className={flex md:hidden  relative  flex-row ${token !== null && user?.role !== "Core Member" ? " " : ""} items-center gap-y-8}>

           
  
  {/* <form onSubmit={handelSearch} ref={searchRef} className='flex items-center'>
    <button
      type='button'
      onClick={() => setSearchVisible(!searchVisible)}
      className='text-richblack-100 cursor-pointer'
    >
      // <HiSearch size={25} className='z-40' />
    </button>
    {searchVisible && (
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        id='searchinput'
        type='text'
        placeholder='Search'
        className='absolute  l-6 border-0 focus:ring-1 ring-richblack-400 rounded-full px-2 py-1 text-[15px] w-28 text-richblack-50 focus:outline-none bg-richblack-700 z-30'
      />
    )}
  </form> */}
 

                    <GiHamburgerMenu className={w-16 h-8 fill-richblack-25 absolute} onClick={shownav} />
                    <div ref={overlay} className=' fixed top-0 bottom-0 left-0 right-0 z-20 bg w-[100vw] hidden h-[100vh] overflow-y-hidden bg-[rgba(0,0,0,0.5)] ' onClick={shownav}></div>
                    <div ref={show} className='mobNav z-50'>
                        <nav className=' items-center flex flex-col absolute w-[200px] -left-[80px] -top-7  glass2' ref={show}>
                            {

                                token == null && (
                                    <Link to='/login' className='' onClick={() => { dispatch(setProgress(100)) }} >
                                        <button onClick={shownav} className=' mt-4 text-center text-[15px] px-6 py-2 rounded-md font-semibold bg-yellow-50 text-black hover:scale-95 transition-all duration-200'>
                                            Login
                                            {/* <div>{token}</div> */}
                                        </button>
                                    </Link>
                                )
                            }
                            {
                                token == null && (
                                    <Link to='/signup' className='text-yellow-50' onClick={() => { dispatch(setProgress(100)) }} >
                                        <button onClick={shownav} className='mt-4 text-center text-[15px] px-5 py-2 rounded-md font-semibold bg-yellow-50 text-black hover:scale-95 transition-all duration-200' >
                                            Signup
                                        </button>
                                    </Link>

                                )
                            }

                            {
                                token != null && (
                                    <div className=' mt-2' >
                                        <p className=' text-richblack-50 text-center mb-2'>Account</p>
                                        {/* <Link to='/dashboard' onClick={()=>{dispatch(setProgress(100));shownav()}} className="p-2"> */}
                                        <ProfileDropDown />
                                        {/* </Link> */}
                                    </div>
                                )
                            }
                            <div className=' mt-4 mb-4 bg-richblack-25 w-[200px] h-[2px]'></div>
                            {/* <p className=' text-xl text-yellow-50 font-semibold'>Courses</p> */}
                            {/* <div className=' flex flex-col items-end pr-4'>
                                {
                                    sublinks?.length < 0 ? (<div></div>) : (
                                        sublinks?.map((element, index) => (
                                            <Link to={/catalog/${element?.name}} key={index} onClick={() => { dispatch(setProgress(30)); shownav() }} className="p-2 text-sm">
                                                <p className=' text-richblack-5 '>
                                                    {element?.name}
                                                </p>
                                            </Link>
                                        )))
                                }
                            </div> */}
                            <div className=' mt-4 mb-4 bg-richblack-25 w-[200px] h-[2px]'></div>
                            <Link to='/about' onClick={() => { dispatch(setProgress(100)); shownav() }} className="p-2">
                                <p className=' text-richblack-5 '>
                                    About
                                </p>
                            </Link>
                            <Link to='/contact' onClick={() => { dispatch(setProgress(100)); shownav() }} className="p-2">
                                <p className=' text-richblack-5 '>
                                    Contact
                                </p>
                            </Link>
                        </nav>
                    </div>
                </div>



                {/* Desktop Navbar */}
                <nav>
                    <ul className=' flex-row gap-x-4 text-richblack-25 hidden md:flex'>
                        {
                            NavbarLinks?.map((element, index) => (
                                <li key={index} >
                                    {
                                        element.title === "Catalog" ? (<div className=' flex items-center group relative cursor-pointer'>
                                            <p>{element.title}</p>
                                            <svg width="25px" height="20px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0)" stroke="#000000" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.384"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="#ffffff"></path> </g></svg>

                                            <div className='invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-400 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]'>
                                                <div className='absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-400'></div>
                                                {/* {
                                                    sublinks?.length < 0 ? (<div></div>) : (
                                                        sublinks?.map((element, index) => (
                                                            <Link to={/catalog/${element?.name}} key={index} className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50" onClick={() => { dispatch(setProgress(30)) }}>
                                                                <p className=''>
                                                                    {element?.name}
                                                                </p>
                                                            </Link>
                                                        ))
                                                    )

                                                } */}






                                            </div>



                                        </div>) : (

                                            <Link to={element?.path} onClick={() => { dispatch(setProgress(100)) }} >
                                                <p className={${matchRoutes(element?.path) ? " text-yellow-25" : " text-richblack-25 hidden md:block"}} >
                                                    {element?.title}
                                                </p>
                                            </Link>
                                        )
                                    }
                                </li>
                            ))
                        }
                        
                    </ul>
                </nav>

                <div className='flex-row hidden md:flex gap-2 items-center'>
                    {/* <div className='relative'>
 
  <form onSubmit={handelSearch} ref={searchRef} className='flex items-center'>
    <button
      type='button'
      onClick={() => setSearchVisible(!searchVisible)}
      className='text-richblack-100 cursor-pointer'
    >
      <HiSearch size={20} />
    </button>
    {searchVisible && (
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        id='searchinput'
        type='text'
        placeholder='Search'
        className='absolute  right-6 border-0 focus:ring-1 ring-richblack-400 rounded-full px-2 py-1 text-[15px] w-28 text-richblack-50 focus:outline-none bg-richblack-700'
      />
    )}
  </form>
  </div> */}

  {/* Cart Link */}
 
  {/* {user && user?.role !== 'Core Member' && user?.role !== "Admin" && (
    <Link
      to='/patient-dashboard'
      className='relative px-4'
      onClick={() => dispatch(setProgress(100))}
    >
      <div className='z-50'>
        <TiShoppingCart className='fill-richblack-25 w-7 h-7' />
      </div>
      {totalItems > 0 && (
        <span className='shadow-sm shadow-black text-[10px] font-bold bg-yellow-100 text-richblack-900 rounded-full px-1 absolute -top-[2px] right-[8px]'>
          {totalItems}
        </span>
      )}
    </Link>
  )} */}

  {/* Login Link */}
  {token == null && (
    <Link
      to='/login'
      className='text-richblack-25'
      onClick={() => dispatch(setProgress(100))}
    >
      <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[7px] text-richblack-100'>
        Login
      </button>
    </Link>
  )}

  {/* Signup Link */}
  {token == null && (
    <Link
      to='/signup'
      className='text-richblack-25'
      onClick={() => dispatch(setProgress(100))}
    >
      <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[7px] text-richblack-100'>
        Signup
      </button>
    </Link>
  )}

  {/* Profile Dropdown */}
  {token !== null && (
    <div className='pt-2'>
      <ProfileDropDown />
    </div>
  )}
</div>

            </div>
           
        </div>
    )
}

export default NavBar
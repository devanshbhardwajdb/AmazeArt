  // pages/profile/[username].js

  import React, { useEffect, useState } from 'react';
  import Head from 'next/head';
  import { FaLink } from 'react-icons/fa';
  import { useRouter } from 'next/router';
  import { IoIosAddCircle } from "react-icons/io";
  import { MdAccountCircle } from "react-icons/md";
  import { FaCameraRetro } from "react-icons/fa6";
  import { ToastContainer, toast } from 'react-toastify';
  import { FaPlus } from "react-icons/fa";
  import 'react-toastify/dist/ReactToastify.css';
  import Link from 'next/link';
  import A2 from "@/anime9.json"
  import Lottie from "lottie-react";
  import Profilepic from '@components/Profilepic';
  import Coverpic from '@components/Coverpic';
  import ProfilePost from '@components/ProfilePost';
  import ProfileProduct from '@components/ProfileProduct';
  import { MdGridOn } from "react-icons/md";
  import EditProfile from '@components/EditProfile';
  import { TiTick } from "react-icons/ti";
  import Followers from '@components/Followers';
  import Following from '@components/Following';
  import { FaBagShopping } from "react-icons/fa6";




  const UserProfile = ({ tokenUserData }) => {
    const router = useRouter();
    // console.log(router.query)
    const { username } = router.query;



    // console.log(username)
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profilePopup, setProfilePopup] = useState(false);
    const [coverPopup, setCoverPopup] = useState(false);
    const [followersPopup, setFollowersPopup] = useState(false);
    const [followingPopup, setFollowingPopup] = useState(false);
    const [editProfilePopup, setEditProfilePopup] = useState(false);
    const [posts, setPosts] = useState([]);
    const [products, setProducts] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followers, setFollowers] = useState(0)
    const [following, setFollowing] = useState(0)
    const [isPosts, setIsPosts] = useState(true)
    const [isProducts, setIsProducts] = useState(false)

    useEffect(() => {
      if (!localStorage.getItem('token')) {
        // console.log("wapis jarha hu")
        router.push('/')
      }


    }, [username])

    useEffect(() => {
      setProfilePopup(false);
      const fetchUserData = async () => {
        try {
          // Fetch user data based on the username
          const response = await fetch(`/api/user/${username}`);
          const userData = await response.json();
          // console.log(userData);

          if (userData.success) {
            setUserData(userData.user);
            setLoading(false);
            setIsFollowing(userData.user.followers.includes(tokenUserData?.username));
            setFollowers(userData.user.followers.length) // Check if the token user is in the followers list
            setFollowing(userData.user.following.length) // Check if the token user is in the followers list
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      const fetchPosts = async () => {
        try {
          // Fetch posts 
          const res = await fetch(`/api/getuserposts?username=${username}`);
          const response = await res.json();



          setPosts(response);
          // setIsLoading(false); // Set loading to false after fetching posts
        } catch (error) {
          console.error('Error fetching user data:', error);
          // setIsLoading(false); // Set loading to false in case of an error
        }
      };
      const fetchProducts = async () => {
        try {
          // Fetch posts 
          const res = await fetch(`/api/getuserproducts?username=${username}`);
          const response = await res.json();



          setProducts(response);
          // setIsLoading(false); // Set loading to false after fetching posts
        } catch (error) {
          console.error('Error fetching user data:', error);
          // setIsLoading(false); // Set loading to false in case of an error
        }
      };

      if (username) {
        setFollowersPopup(false);
        setFollowingPopup(false);
        fetchUserData();
        fetchPosts();
        fetchProducts();

      }
    }, [username]);


    const togglePopup = () => {
      setProfilePopup(!profilePopup)
    }
    const togglePopup2 = () => {
      setCoverPopup(!coverPopup)
    }
    const togglePopup3 = () => {
      setEditProfilePopup(!editProfilePopup)
    }
    const togglePopup4 = () => {
      setFollowersPopup(!followersPopup)
    }
    const togglePopup5 = () => {
      setFollowingPopup(!followingPopup)
    }

    const handleFollow = async () => {
      try {
        const response = await fetch('/api/follow', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ beingFollowedUsername: username, followerUsername: tokenUserData?.username })
        });

        const data = await response.json();
        if (response.ok) {
          console.log('User followed successfully:', data.message);
          setIsFollowing(true); // Update the state to reflect that the user is now following
          setFollowers((prevCount) => (prevCount + 1));
        } else {
          console.error('Failed to follow user:', data.error);
        }
      } catch (error) {
        console.error('Error following user:', error);
      }
    };

    const handleUnfollow = async () => {
      try {
        const response = await fetch('/api/follow', { // Assuming you have an unfollow API endpoint
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ beingFollowedUsername: username, followerUsername: tokenUserData?.username })
        });

        const data = await response.json();
        if (response.ok) {
          console.log('User unfollowed successfully:', data.message);
          setIsFollowing(false); // Update the state to reflect that the user is no longer following
          setFollowers((prevCount) => (prevCount - 1));
        } else {
          console.error('Failed to unfollow user:', data.error);
        }
      } catch (error) {
        console.error('Error unfollowing user:', error);
      }
    };


    const toggleIsPosts = () => {

      isPosts ? setIsPosts(true) : setIsPosts(true); setIsProducts(false);

    }
    const toggleIsProducts = () => {

      isProducts ? setIsProducts(true) : setIsPosts(false); setIsProducts(true);

    }


    return (
      <>

        <Head>
          <title>Profile - {username}</title>
          {/* Description */}
          <meta name="description" content={`${username} on Amazeart`} />
          {/* Open Graph metadata for sharing on social media */}
          <meta property="og:title" content={`${username} Profile`} />
          <meta property="og:description" content={`${username} on Amazeart`} />
          <meta property="og:image" content={userData?.profilepic} />
          {/* Twitter Card metadata */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`${username} Profile`} />
          <meta name="twitter:description" content={`${username} on Amazeart`} />
          <meta name="twitter:image" content={userData?.profilepic} />
        </Head>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          className={'z-[100]'}
        />
        <div className='lg:px-[8vw]  relative pt-[8vh]  flex  items-center justify-center text-white   flex-col gap-0 min-h-[100vh] font-noto '>
          {
            loading ? (
              <Lottie animationData={A2} loop={true} className='w-[15vw]' />

            ) : (

              (tokenUserData?.username === username) ? (<div className="flex flex-col my-10 gap-1 items-center glassmorphism w-full shadow-lg shadow-black ">

                {
                  profilePopup && <div className='fixed z-30 top-36 justify-center items-center top-  w-full shadow-black shadow-2xl '>
                    <Profilepic tokenUserData={tokenUserData} togglePopup={togglePopup} />
                  </div>
                }
                {
                  coverPopup && <div className='fixed z-30 top-36 justify-center items-center top-  w-full shadow-black shadow-2xl '>
                    <Coverpic tokenUserData={tokenUserData} togglePopup2={togglePopup2} />
                  </div>
                }
                {
                  editProfilePopup && <div className='fixed z-30 justify-center items-center top-  h-full w-full shadow-black shadow-2xl '>
                    <EditProfile tokenUserData={tokenUserData} togglePopup3={togglePopup3} />
                  </div>
                }
                {
                  followersPopup && <div className='fixed z-30 justify-center items-center h-full w-full shadow-black shadow-2xl '>
                    <Followers tokenUserData={tokenUserData} togglePopup4={togglePopup4} />
                  </div>
                }
                {
                  followingPopup && <div className='fixed z-30 justify-center items-center h-full w-full shadow-black shadow-2xl '>
                    <Following tokenUserData={tokenUserData} togglePopup5={togglePopup5} />
                  </div>
                }
                <div className='flex relative  items-center  justify-center object-contain'>

                  {userData?.coverpic ?
                    <img src={userData?.coverpic} alt={`${userData?.name}'s Cover pic`} className='w-[80vw] h-[30vh]   xl:h-[40vh] max-lg:h-[15vh] max-md:h-[15vh] max-md:w-[100vw] object-cover object-center' />
                    :
                    <div className='w-[80vw] xl:h-[30vh] max-lg:h-[15vh] bg-gray-800 flex justify-center items-center'>No Cover Image</div>
                  }
                  <div className='absolute flex items-center justify-center text-white border border-white rounded-full  md:bottom-4 bottom-0 right-2 max-md:scale-75  md:right-10 p-2  cursor-pointer hover:scale-105 duration-200 hover:text-[#9B03F8] hover:border-[#9B03F8] bg-black/80' onClick={togglePopup2}>

                    <FaCameraRetro className='text-2xl' />


                  </div>

                </div>

                <div className='flex flex-col gap-4 md:w-[62vw] w-[95vw]  '>
                  <div className="photo flex max-md:flex-col items-center justify-center gap-4  z-10 w-full">
                    <div className=' relative '>
                      {userData?.profilepic ?

                        <img alt={`${userData?.name}'s Profile pic`} className="rounded-full xl:w-44 xl:h-44 max-md:w-28 max-md:h-28 " src={userData?.profilepic} ></img>
                        :

                        <MdAccountCircle className='rounded-full w-44 h-44 text-gray-500' />
                      }

                      <IoIosAddCircle className='absolute text-gray-300 text-3xl md:bottom-4 bottom-1 left-1  md:left-3  cursor-pointer hover:scale-125 duration-200 hover:text-[#9B03F8]' onClick={togglePopup} />

                    </div>



                    <div className="flex flex-col gap-2">

                      <div className='flex gap-4 items-center  '>
                        <h1 className='xl:text-3xl md:text-xl text-sm  font-semibold'>{userData?.name}</h1>
                        <button className='nav-btn  bg-gray-500 text-white px-5 py-2 rounded-lg  transition-all duration-150  hover:scale-95  hover:shadow-lg   flex  justify-center items-center max-md:scale-90' onClick={togglePopup3} >Edit Profile
                        </button>

                      </div>


                      <div className="flex gap-5 xl:text-lg md:text-md text-sm  ">
                        <h3>{userData?.posts} Posts</h3>
                        <h3 className='cursor-pointer hover:text-[#9B03F8] duration-75' onClick={togglePopup4}>{followers} Followers</h3>
                        <h3 className='cursor-pointer hover:text-[#9B03F8] duration-75' onClick={togglePopup5}>{following} Following</h3>

                      </div>

                      <div className='flex flex-col gap-0'>
                        <h2 className='xl:text-lg md:text-md text-sm  font-normal'>{userData?.username}</h2>

                        <h3 className='category xl:text-md md:text-sm text-sm text-gray-300'>{userData?.creatorTag}</h3>
                        <h3>{userData?.bio}</h3>
                        {userData?.link &&

                          <a href={userData?.link} className='flex items-center gap-2 font-medium text-sm underline hover:text-blue-700 duration-150 mt-4'>
                            <FaLink />
                            <h3>{userData?.link}</h3>

                          </a>

                        }
                      </div>
                    </div>

                  </div >
                  <div className="PAbutton w-full">


                  </div>

                  <div className="flex flex-col    min-h-[30vh] ">
                    <div className='flex w-full justify-between '>

                      <button className={`nav-btn   text-white px-5 py-2 rounded-t-lg  flex  justify-center items-center max-md:text-sm w-1/2  ${isPosts ? 'bg-black/70' : 'bg-white/30'}`} onClick={toggleIsPosts} ><MdGridOn />  Posts</button>
                      <button className={`nav-btn   text-white px-5 py-2 rounded-t-lg  flex  justify-center items-center max-md:text-sm w-1/2  ${isProducts ? 'bg-black/70' : 'bg-white/30'}`} onClick={toggleIsProducts} ><FaBagShopping />Products</button>
                    </div>
                    {isPosts ?

                      posts.length !== 0 ? <div className="posts py-5 bg-black/70 flex items-center justify-between gap-1 flex-wrap	" >
                        {posts.map((post) => <ProfilePost key={post._id} post={post} tokenUserData={tokenUserData} />)}
                      </div> :
                        <div className="posts flex items-center h-full  bg-black/70 justify-center min-h-[30vh] gap-1 flex-wrap	">
                          <h1 className='text-lg  font-semibold'>No Posts</h1>
                        </div>
                      :

                      products.length !== 0 ?
                        <div className="posts flex items-center py-5 bg-black/70 justify-between gap-1 flex-wrap	">
                          {products.map((post) => <ProfileProduct key={post._id} post={post} tokenUserData={tokenUserData} />)}
                        </div> :
                        <div className="posts flex items-center h-full  bg-black/70 justify-center min-h-[30vh] gap-1 flex-wrap	">
                          <h1 className='text-lg  font-semibold'>No Products</h1>
                        </div>}
                  </div>
                </div>

              </div>) : (
                <div className="flex flex-col my-10 gap-1 items-center glassmorphism w-full shadow-lg shadow-black ">
                  {
                    followersPopup && <div className='fixed z-30 justify-center items-center h-full w-full shadow-black shadow-2xl '>
                      <Followers tokenUserData={tokenUserData} togglePopup4={togglePopup4} />
                    </div>
                  }
                  {
                    followingPopup && <div className='fixed z-30 justify-center items-center h-full  w-full shadow-black shadow-2xl ' >
                      <Following tokenUserData={tokenUserData} togglePopup5={togglePopup5} />
                    </div>
                  }

                  <div className='flex relative  items-center  justify-center object-contain'>

                    {userData.coverpic ?
                      <img src={userData?.coverpic} alt={`${userData?.name}'s Cover pic`} className='w-[80vw] h-[30vh]   xl:h-[40vh] max-lg:h-[15vh] max-md:h-[15vh] max-md:w-[100vw] object-cover object-center' />
                      :
                      <div className='w-[80vw] xl:h-[30vh] max-lg:h-[15vh] bg-gray-800 flex justify-center items-center'>No Cover Image</div>
                    }

                  </div>

                  <div className='flex flex-col gap-4 md:w-[62vw] '>
                    <div className="photo flex max-md:flex-col items-center justify-center gap-4  z-10 ">
                      <div className=' relative '>
                        {userData.profilepic ?

                          <img alt={`${userData?.name}'s Profile pic`} className="rounded-full xl:w-44 xl:h-44 max-md:w-28 max-md:h-28 " src={userData?.profilepic} ></img>
                          :

                          <MdAccountCircle className='rounded-full w-44 h-44 text-gray-500' />
                        }



                      </div>



                      <div className="flex flex-col gap-2 ">

                        <div className='flex gap-4 items-center  '>
                          <h1 className='xl:text-3xl md:text-xl text-sm  font-semibold'>{userData?.name}</h1>
                          {
                            isFollowing ? (
                              <button className='nav-btn bg-gray-500 text-white px-5 py-2 rounded-lg transition-all duration-150 hover:scale-95 hover:shadow-lg flex justify-center items-center max-md:scale-90 gap-1' onClick={handleUnfollow}>
                                <TiTick /> Following
                              </button>
                            ) : (
                              <button className='nav-btn border-2 border-gray-500 text-white px-5 py-2 rounded-lg transition-all duration-150 hover:scale-95 hover:shadow-lg flex justify-center items-center max-md:scale-90 gap-1' onClick={handleFollow}>
                                <FaPlus /> Follow
                              </button>
                            )
                          }

                        </div>


                        <div className="flex gap-5 xl:text-lg md:text-md text-sm  ">
                          <h3>{userData?.posts} Posts</h3>
                          <h3 className='cursor-pointer hover:text-[#9B03F8] duration-75' onClick={togglePopup4}>{followers} Followers</h3>
                          <h3 className='cursor-pointer hover:text-[#9B03F8] duration-75' onClick={togglePopup5}>{following} Following</h3>
                        </div>

                        <div className='flex flex-col gap-0'>
                          <h2 className='xl:text-lg md:text-md text-sm  font-normal'>{userData?.username}</h2>

                          <h3 className='category xl:text-md md:text-sm text-sm text-gray-300'>{userData?.creatorTag}</h3>
                          <h3>{userData?.bio}</h3>
                          {userData?.link &&

                            <a href={userData?.link} className='flex items-center gap-2 font-medium text-sm underline hover:text-blue-700 duration-150 mt-4'>
                              <FaLink />
                              <h3>{userData?.link}</h3>

                            </a>

                          }
                        </div>
                      </div>

                    </div >
                    <div className="PAbutton w-full">


                    </div>

                    <div className="flex flex-col    min-h-[30vh] ">
                      <div className='flex w-full justify-between '>

                        <button className={`nav-btn   text-white px-5 py-2 rounded-t-lg  flex  justify-center items-center max-md:text-sm w-1/2  ${isPosts ? 'bg-black/70' : 'bg-white/30'}`} onClick={toggleIsPosts} ><MdGridOn />  Posts</button>
                        <button className={`nav-btn   text-white px-5 py-2 rounded-t-lg  flex  justify-center items-center max-md:text-sm w-1/2  ${isProducts ? 'bg-black/70' : 'bg-white/30'}`} onClick={toggleIsProducts} ><FaBagShopping />Products</button>
                      </div>
                      {isPosts ?

                        posts.length !== 0 ? <div className="posts py-5 bg-black/70 flex items-center justify-between gap-1 flex-wrap	" >
                          {posts.map((post) => <ProfilePost key={post._id} post={post} tokenUserData={tokenUserData} />)}
                        </div> :
                          <div className="posts flex items-center h-full  bg-black/70 justify-center min-h-[30vh] gap-1 flex-wrap	">
                            <h1 className='text-lg  font-semibold'>No Posts</h1>
                          </div>
                        :

                        products.length !== 0 ?
                          <div className="posts flex items-center py-5 bg-black/70 justify-between gap-1 flex-wrap	">
                            {products.map((post) => <ProfileProduct key={post._id} post={post} tokenUserData={tokenUserData} />)}
                          </div> :
                          <div className="posts flex items-center h-full  bg-black/70 justify-center min-h-[30vh] gap-1 flex-wrap	">
                            <h1 className='text-lg  font-semibold'>No Products</h1>
                          </div>}
                    </div>
                  </div>

                </div>

              )


            )



          }



        </div >
      </>
    );
  };

  export default UserProfile;

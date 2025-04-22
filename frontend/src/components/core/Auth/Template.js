import { FcGoogle } from "react-icons/fc"
import { useSelector } from "react-redux"
import { useAuth0 } from "@auth0/auth0-react"
import frameImg from "../../../assets/frame.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import { useDispatch } from "react-redux"
import { login } from "../../../services/operations/authAPI"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { setUser } from "../../../slices/profileSlice"

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)
  const {loginWithRedirect,user,getAccessTokenSilently} = useAuth0();
  const navigate= useNavigate();
  const dispatch=useDispatch();
   const [token,setToken]= useState("");

  useEffect(() => {
    if (user) {
      const fetchToken = async () => {
        const token = await getAccessTokenSilently();
        setToken(token);
        dispatch(setUser({ user, token }));
      };
      fetchToken();
    }
  }, [user, getAccessTokenSilently, dispatch]);
  


  return (
    <div className="grid min-h-[calc(100vh-3.5rem)]  place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-16 md:flex-row md:gap-y-0 md:gap-x-12 items-center">
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
            {/* <h1 className="text-[1.65rem] font-semibold leading-[2.375rem] text-richblack-5">
              {title}
            </h1>
            <p className="mt-4 text-[1.1rem] leading-[1.625rem]">
              <span className="text-richblack-100">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-100">
                {description2}
              </span>
            </p> */}
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
            {/* <button onClick={(e)=>loginWithRedirect()}>Sign In with redirect</button> */}
          </div>
          <div className=" mx-auto w-11/12 max-w-[450px] md:mx-0">
            {/* <img
              src={frameImg}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
            /> */}
            <img
              src={image}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="  right-4  z-10 rounded-md"
            />
          </div>
        </div>
      )}
    {/* {user && <div>{token}</div>} */}
    </div>
  )
}

export default Template
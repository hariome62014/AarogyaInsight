import signupImg from "../assets/SignupImg.webp"
import Template from "../components/core/Auth/Template"
import { useSelector } from "react-redux";

function Signup() {
  const {loading} = useSelector((state)=>state.auth);
  return (
    loading?(<div className="h-[100vh] flex justify-center items-center"><div class="custom-loader"></div></div>):(
      <div className="relative top-2">
      <Template
      title="Join Hands for a Healthier Tomorrow"
      description1="Discover personalized health insights and preventive care."
      description2="Take the first step towards a healthier you."
      image={signupImg}
      formType="signup"
    />
    </div>
    
    )
  )
}

export default Signup
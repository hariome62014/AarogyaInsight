import { useState } from "react";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import Tab from "../../common/Tab";
import PatientSignUpForm from "./PatientSignup";
import CoreMemberSignupForm from "./CoreMemberSignupForm";

function SignupForm() {
  // const [accountType, setAccountType] = useState(ACCOUNT_TYPE.PATIENT);
  const [accountType, setAccountType] = useState("Core Member");


  const tabData = [
    {
      id: 1,
      tabName: "Patient",
      type: ACCOUNT_TYPE.PATIENT,
    },
    {
      id: 2,
      tabName: "Core Member",
      type: ACCOUNT_TYPE.COREMEMBER,
    },
  ];

  return (
    <div>
      {/* Role Selection Tabs */}
      {/* <Tab tabData={tabData} field={accountType} setField={setAccountType} /> */}

      {/* Render Forms Based on Role */}
      {accountType === ACCOUNT_TYPE.PATIENT && <PatientSignUpForm accountType={accountType} setAccountType={setAccountType} />}
      {accountType === ACCOUNT_TYPE.COREMEMBER && <CoreMemberSignupForm  accountType={accountType} />}
    </div>
  );
}

export default SignupForm;

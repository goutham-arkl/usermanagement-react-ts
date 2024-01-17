import React, { useState } from 'react'
import PersonalDetails from '../Components/PersonalInfo/PersonalDetails'
import AddressDetails from '../Components/AddressDetails/AddressDetails'


const AddUser = () => {
    const [personalDetails, setPersonalDetails] = useState({})
    const [step,setStep] = useState(1)

  return (
    <div className='add-user'>
        {step === 1 && <PersonalDetails setPersonalDetails={setPersonalDetails} setStep={setStep}/>}
        {step === 2 && <AddressDetails personalDetails={personalDetails}/>}
    </div>
  )
}

export default AddUser
import React, { useState } from "react"
import { EmailSpan, EyeIconSpan, FormContainer, FormInput, FormLabel, PasswordChecker, SubmitButton, ConfirmSpan,PasswordStrengthSpan, PasswordStrengthContent, ValidSpan } from "./validation.style"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash} from "@fortawesome/free-regular-svg-icons"
import { faCircleXmark, faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import ListArray from "./ListArray.js"
// import PasswordStrengthBar from 'react-password-strength-bar'

export const FormValidation = () => {
  const [newPass, setNewPass] = useState(true) // Icon Toggle
  const [confirmPass, setConfirmPass] = useState(true) // Icon Toggle
  const [emailValidation, setEmailVaidation] = useState(false)
  const [validPassword,setValidPassword] = useState({
    validNewPass : false,
    validConfirmPass : false
  })
  const [inputVal, setInputVal] = useState({
    email : '',
    newPass : '',
    confirmPass : ''
  })
  const [newPassCheck, setNewPassCheck] = useState({
    length : false,
    lowercase : false,
    uppercase : false,
    numeric : false,
    specialCharacter : false,
  })

  const PassToggle = () => {
    setNewPass(!newPass)
  }
  const ConfirmPassToggle = () => {
    setConfirmPass(!confirmPass)
  }
  
  const handleInputs = (e) => {
    const {name,value} = e.target
    // console.log(name,value)
    if(value !== ' '){
      setInputVal(prevInputValue => {
        const updatedInputVal = {
        ...prevInputValue,
        [name] : value
        }  
        passwordChecker(updatedInputVal)
        confirmPassChecker(updatedInputVal)
        if(name === 'email'){
          emailChecker(name,value)
        }
        return updatedInputVal
      })
    }
  }

  const emailChecker = (name,value) => {
    if(name === 'email' && validateEmail(value)){
      setEmailVaidation(true)
    }else{
      setEmailVaidation(false)
    }
  }

  const validateEmail = (email) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    return regex.test(email)
  }

  const confirmPassChecker = (updatedInputVal) => {
    const newPassValue = updatedInputVal.newPass
    const newConfirmPassValue = updatedInputVal.confirmPass
    if (newPassValue === newConfirmPassValue && newPassValue !== '' && newConfirmPassValue !== ''){
      setValidPassword(prev => ({...prev, validConfirmPass : true}))
    }
    else{
      setValidPassword(prev => ({...prev, validConfirmPass : false}))
    }
  }

  const passwordChecker = (updatedInputVal) => {
    const newPassValue = updatedInputVal.newPass

    setNewPassCheck(prevState => {
      const updatedNewPassCheck = {
        ...prevState,
        length: newPassValue.length >= 10,
        lowercase: /[a-z]/.test(newPassValue),
        uppercase: /[A-Z]/.test(newPassValue),
        numeric: /[0-9]/.test(newPassValue),
        specialCharacter: /[!@#$%&*_+-]/.test(newPassValue)
      }

      const allConditionsMet = Object.values(updatedNewPassCheck).every(condition => condition)
      setValidPassword(prevState => ({...prevState, validNewPass: allConditionsMet}))
      return updatedNewPassCheck
    })

  }

  const passwordStrength = () => {
    const { length, lowercase, uppercase, numeric, specialCharacter } = newPassCheck
    const conditionsMet = [length, lowercase, uppercase, numeric, specialCharacter].filter(condition => condition).length
  
    switch(true){
      case conditionsMet === 5 :
        return 'Strong'
      case conditionsMet >= 4:
        return 'Medium'
      case conditionsMet >= 2 :
        return 'Good'
      case conditionsMet > 0 :
        return 'Weak'
      default :
        return ''
    }
  }
  const handleKeyDown = (e, nextInput) => {
    if(e.key === 'Enter' || 'ArrowDown'){
      // console.log(e.key)
      // e.preventDefault()
      nextInput.focus()
    }
  }
  return (
    <main className="form-container">
      <h1>Form Validation</h1>
      <FormContainer>
        <form action="#" className="formField">
          <div className="emailField">
            <FormLabel htmlFor="email">Email ID</FormLabel>
            <FormInput
              type="text"
              id="email"
              name="email"
              placeholder="Please Enter Email ID"
              value={inputVal.email}
              onChange={handleInputs}
              autoFocus
              onDragStart={(e) => e.preventDefault()}
              onKeyDown={(e) => handleKeyDown(e, document.getElementById("newPass"))}
            />
            {inputVal?.email.length > 0 && (
              <EmailSpan $emailvalidation={emailValidation}>
                {emailValidation ? (
                  <>
                   <FontAwesomeIcon icon={faCircleCheck}/> {inputVal.email}
                  </>
                  ) : (     
                    <span>Invalid Email!!</span>            
                )}
              </EmailSpan>
            )}
          </div>
          <div className="passwordField">
            <FormLabel htmlFor="newPass">Password</FormLabel>
            <FormInput
              type={newPass? 'password' : 'text'}
              id="newPass"
              name="newPass"
              placeholder="New Password"
              value={inputVal.newPass}
              onChange={handleInputs}
              onPaste={(e) => {
                e.preventDefault()
                return false
              }}
              onDragStart={(e) => e.preventDefault()}
              disabled ={!emailValidation}
              onKeyDown={(e) => handleKeyDown(e, document.getElementById("confirmPass"))}
            />
            <div className="inputSpan">
              <EyeIconSpan onClick={PassToggle} $validPass={validPassword.validNewPass}>
                {newPass ? (
                  <FontAwesomeIcon icon={faEyeSlash} size="lg" />
                  ) : (
                    <FontAwesomeIcon icon={faEye} size="lg" />
                )}
              </EyeIconSpan>
              {validPassword.validNewPass ? 
                <ValidSpan $validPass={validPassword.validNewPass}>
                  {validPassword.validNewPass ? (
                      <FontAwesomeIcon icon={faCircleCheck} size="lg" />
                    ) : (
                      <FontAwesomeIcon icon={faCircleXmark} size="lg" />
                    )
                  }
                </ValidSpan>    
              : null       
              }
            </div>
          </div>
          <div className="confirmPassField">
            <FormLabel htmlFor="confirmPass">Confirm Password</FormLabel>
            <FormInput
              type={confirmPass? 'password' : 'text'}
              id="confirmPass"
              name="confirmPass"
              placeholder="Confirm Your Password"
              value={inputVal.confirmPass}
              onChange={handleInputs}
              onPaste={(e) => {
                e.preventDefault()
                return false
              }}
              onDragStart={(e) => e.preventDefault()}
              disabled ={!validPassword.validNewPass}
              onKeyDown={(e) => handleKeyDown(e, document.getElementById("submitButton"))}
            />
            <div className="inputSpan">
              <EyeIconSpan onClick={ConfirmPassToggle} $validPass={validPassword.validConfirmPass}>
                {confirmPass ? (
                  <FontAwesomeIcon icon={faEyeSlash} size="lg" />
                  ) : (
                  <FontAwesomeIcon icon={faEye} size="lg" />
                )}
              </EyeIconSpan>
              {validPassword.validConfirmPass ?               
                <ValidSpan $validPass={validPassword.validConfirmPass}>
                  {validPassword.validConfirmPass ? (
                    <FontAwesomeIcon icon={faCircleCheck} size="lg" />
                    ) : (
                      <FontAwesomeIcon icon={faCircleXmark} size="lg" />
                    )
                  }
                </ValidSpan>
              : null
              }
            </div>
            {inputVal.confirmPass.length > 0 && (
              <ConfirmSpan $matchedpassword={validPassword.validConfirmPass}>
                {validPassword.validConfirmPass ? (
                    <span>Password Matched!!</span>
                  ) : (     
                    <span>Passwords do not match!!</span>           
                )}
              </ConfirmSpan>
            )}
          </div>
          <div className="buttonField">
            <SubmitButton id="submitButton" disabled={!validPassword.validNewPass || !validPassword.validConfirmPass || !emailValidation}>Submit</SubmitButton>
          </div>
          <PasswordStrengthSpan $strength={passwordStrength(newPassCheck)}></PasswordStrengthSpan>
          <PasswordStrengthContent>{passwordStrength(newPassCheck)}</PasswordStrengthContent>
        </form>
      <PasswordChecker>
        <h3>Password must include:</h3>
        <ul>
          <ListArray inputVal={inputVal} newPassCheck={newPassCheck}></ListArray>
        </ul>
      </PasswordChecker>          
      </FormContainer>      
    </main>
  )
}
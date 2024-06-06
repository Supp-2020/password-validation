import styled from 'styled-components'

export const FormContainer = styled.article`
  width : 55%;
  margin : 0 auto;
  background-color : var(--background);
  padding : 1% 3%;
`
export const FormLabel = styled.label`
  width : 80%;
  margin-top : 20px;
  display : inline-block;
`
export const FormInput = styled.input`
  width : 80%;
  display : block;
  padding : 8px 0;
`

export const SubmitButton = styled.button`
  background-color : ${props => props.disabled === true ? 'var(--disabled)' : 'var(--btn)'};
  border : none;
  padding : 12px 0px;
  color : #fff;
  width : 80%;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  &:hover {
    background-color: ${props => !props.disabled && 'var(--btn-hover)'};
  }
`

export const PasswordChecker = styled.article`
  width : 100%;
`
export const EmailSpan  = styled.span`
  display : inline-block;
  margin-top : 3px;
  color : ${props => props.$emailvalidation === true ? 'var(--success)' : 'var(--error)' };
`

export const EyeIconSpan = styled.span`
  position : absolute;
  bottom : 8px;
  left: ${props => props.$validPass ? '505px' : '530px'};
`
export const List = styled.li`
 ${props => props.$liststyle ? '' : 'list-style : none;'};
  color : ${props => props.$liststyle? '' : props.$passcheck === true ? 'var(--success)' : 'var(--error)'};
`
export const ConfirmSpan = styled.span`
  display : inline-block;
  margin-top : 3px;
  color : ${props => props.$matchedpassword === true ? 'var(--success)' : 'var(--error)' };
`
export const PasswordStrengthContent = styled.span`
  display: block;
  margin-top: 2px;
`
export const PasswordStrengthSpan = styled.span`
  display: inline-block;
  margin-top: 5px;
  width : 80%;
  height: 5px;
  display : ${props => props.$strength ? 'block' : 'none'};
  background-color: ${props => {
    switch (props.$strength) {
      case 'Weak':
        return 'var(--password-weak)';
      case 'Good':
        return 'var(--password-good)';
      case 'Medium':
        return 'var(--password-medium)';
      case 'Strong':
        return 'var(--password-strong)';
      default:
        return 'var(--disabled)';
    }
  }};
`;

export const ValidSpan = styled.span`
  position : absolute;
  bottom : 8px;
  left : 535px;
  color : ${props => props.$validPass === true ? 'var(--success)' : 'var(--error)' };
  display: ${props => props.$validPass ? 'block' : 'none'};
`
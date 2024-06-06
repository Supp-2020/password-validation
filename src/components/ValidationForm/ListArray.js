import React from 'react'
import {List} from './validation.style'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark, faCircleCheck } from "@fortawesome/free-solid-svg-icons"

const ListArray = ({inputVal, newPassCheck}) => {
  const ListArray = [
    {
      listName : 'length',
      listContent : 'Minimum 10 characters',
      listProps : newPassCheck.length
    },
    {
      listName : 'lowercase',
      listContent : 'Atleast one lowercase character (a-z)',
      listProps : newPassCheck.lowercase
    },
    {
      listName : 'uppercase',
      listContent : 'Atleast one uppercase character (A-Z)',
      listProps : newPassCheck.uppercase
    },
    {
      listName : 'numeric',
      listContent : 'Atleast one numeric character (0-9)',
      listProps : newPassCheck.numeric
    },
    {
      listName : 'specialCharacter',
      listContent : 'Atleast one special character (@#$%&*_-+)',
      listProps : newPassCheck.specialCharacter
    },
  ]
  return (
    <>
    {ListArray.map((item,idx) => (
      <List key={idx} $passcheck={item.listProps} $liststyle={inputVal.newPass.length === 0}>
        {inputVal.newPass.length > 0 && (
          <>
            {item.listProps ? (
              <FontAwesomeIcon icon={faCircleCheck} size="sm" />
            ) : (
              <FontAwesomeIcon icon={faCircleXmark} size="sm" />
            )}
            {' '}
          </>
        )}
        {item.listContent}
      </List>
    ))}
    </>
  )
}

export default ListArray
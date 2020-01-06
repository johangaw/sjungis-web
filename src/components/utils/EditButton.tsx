import React from 'react';
import { Edit } from 'react-feather'

type Props = {
  onClick: () => void,
  className?: string,
}

export const EditButton: React.FunctionComponent<Props> = ({onClick, className = ''}) => {
  return(
    <button className={'btn p-1 ' + className} onClick={onClick}>
      <Edit></Edit>
    </button>
  )
}
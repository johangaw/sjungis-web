import React from 'react';

const editStyle = {
  width: '25px',
  height: '25px',
}

type Props = {
  onClick: () => void,
  className?: string,
}

export const EditButton: React.FunctionComponent<Props> = ({onClick, className = ''}) => {
  return(
    <button className={'btn p-1 ' + className} onClick={onClick}>
      <img style={editStyle} src={process.env.PUBLIC_URL + '/edit.svg'} alt="Edit image"/>
    </button>
  )
}
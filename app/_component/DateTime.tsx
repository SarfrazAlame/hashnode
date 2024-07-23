'use client'
import { format } from 'date-fns'
import React from 'react'

const DateTime = ({createdAt}:{createdAt:string}) => {
  return (
    <p>{format(new Date(createdAt), 'PPPppp')}</p>
  )
}

export default DateTime
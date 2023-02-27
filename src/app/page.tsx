'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import io from 'Socket.IO-client'

const Home = () => {
  const [input, setInput] = useState('')
  const socket = io()
  useEffect(() => { socketInitializer() }, [])

  const socketInitializer = async () => {
    await fetch('/api/socket');

    socket.on('newIncomingMessage', (msg) => {
      console.log(msg)
      setInput(msg)
    })
  }

  return (
    <>
      <h1>Mensagem App: {input}</h1>
    </>
  )
}

export default Home;
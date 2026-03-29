'use client'

import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer } from 'react-toastify'

export function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss
      pauseOnHover
      draggable
      theme="colored"
    />
  )
}

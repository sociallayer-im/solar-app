import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Buffer } from 'buffer'
import { TrackJS } from 'trackjs'

window.Buffer = Buffer

TrackJS.install({ token: '903fb1dd5e8c4ca5b12efe83aa5d29a4' })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)

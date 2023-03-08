import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.less'
import { BrowserRouter } from 'react-router-dom'
import { Buffer } from 'buffer'

window.Buffer = Buffer

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
)

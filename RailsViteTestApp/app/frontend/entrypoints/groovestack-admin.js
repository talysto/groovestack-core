import React from 'react'

import { AdminApp } from '../components/AdminApp'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root'))
root.render(React.createElement(AdminApp))
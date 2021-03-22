import React from 'react'

import { AccessToken } from '../../api'

export const AccessContext = React.createContext<AccessToken | null>(null)

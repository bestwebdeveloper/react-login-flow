import { injectGlobal } from 'emotion'
import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'

import { AccessToken } from '../api'
import { Header } from './components/Header'
import { AccessContext } from './contexts/AccessContext'
import { LoginScreen } from './screens/LoginScreen'
import { PostDetailsScreen } from './screens/PostDetailsScreen'
import { PostsListScreen } from './screens/PostsListScreen'
import { RestoreScreen } from './screens/RestoreScreen';
import { SignUpScreen } from './screens/SignUpScreen'

// TODO: include normalize and reset
injectGlobal`
  :root {
    --border-color: #dfe3e0;
    --default-background-color: #dfe3e0;
    --danger-background-color: #f8e6e7;
    --danger-color: #ff0000;
    --font-color: #44505f;
    --gap: 8px;
    --gap-2: calc(var(--gap) * 2);
    --gap-3: calc(var(--gap) * 3);
    --info-background-color: #caedff;
    --inverted-font-color: #ffffff;
    --min-width: 600px;
    --primary-color: #318eff;
  }

  html,
  body {
    color: var(--font-color);
    font-family: Helvetica, Arial, sans-serif;
    font-size: 16px;
    height: 1px;
    margin: 0;
    min-height: 100%;
    padding: 0;
  }

  a {
    color: var(--font-color);

    &:hover {
      color: var(--primary-color);
    }
  }

  #root {
    height: 1px;
    min-height: 100%;
  }
`

export const App: React.FC = () => {
  const [accessToken, setAccessToken] = React.useState<AccessToken | null>(null)
  const handleLogOut = React.useCallback(() => {
    setAccessToken(null)
  }, [])

  return (
    <AccessContext.Provider value={accessToken}>
      <HashRouter>
        {accessToken ? (
          <>
            <Header onLogOut={handleLogOut} />
            <Switch>
              <Route exact path="/" component={PostsListScreen} />
              <Route exact path="/post/:postId" component={PostDetailsScreen} />
              <Route path="/" component={() => <Redirect to="/" />} />
            </Switch>
          </>
        ) : (
          <Switch>
            <Route exact path="/login" component={() => <LoginScreen onAccessToken={setAccessToken} />} />
            <Route exact path="/signup" component={() => <SignUpScreen onAccessToken={setAccessToken} />} />
            <Route exact path="/restore" component={() => <RestoreScreen />} />
            <Route path="/" component={() => <Redirect to="/login" />} />
          </Switch>
        )}
      </HashRouter>
    </AccessContext.Provider>
  )
}

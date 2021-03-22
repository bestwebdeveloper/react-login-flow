import { cx } from 'emotion'
import React from 'react'
import { Link } from 'react-router-dom'

import { login } from '../../../api'
import { MessageBox } from '../../components/Message'
import { MESSAGES } from '../../constants'
import * as styles from './styles'

export interface LoginScreenProps {
  onAccessToken: (accessToken: string) => void
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onAccessToken }) => {
  const [errors, setErrors] = React.useState<Map<string, string>>(new Map())
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [username, setUsername] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const handleUsername = React.useCallback(e => {
    setUsername(e.target.value)
  }, [])
  const handlePassword = React.useCallback(e => {
    setPassword(e.target.value)
  }, [])
  const handleSubmit = React.useCallback(
    (e: React.FormEvent) => {
      // TODO: make it cancelable
      e.preventDefault()

      const errorsFound = new Map()
      const doLogin = async (username: string, password: string) => {
        if (username !== '' && password !== '') {
          setIsLoading(true)

          try {
            const token = await login(username, password)

            onAccessToken(token)
          } catch (e) {
            setErrors(new Map().set('load', e.message))
            setIsLoading(false)
          }
        }
      }

      setErrors(new Map())

      if (username === '') {
        errorsFound.set('username', MESSAGES.USERNAME_IS_EMPTY)
      }

      if (password === '') {
        errorsFound.set('password', MESSAGES.PASSWORD_IS_EMPTY)
      }

      if (errorsFound.size) {
        setErrors(errorsFound)
      } else {
        doLogin(username, password)
      }
    },
    [password, username, onAccessToken]
  )

  return (
    <div className={styles.rootStyle}>
      <h1>Login</h1>
      <form action="" className={styles.formWrapperStyle} method="post" onSubmit={handleSubmit}>
        <MessageBox type="error" messages={[...errors.values()]} />
        <label className={styles.labelStyle} htmlFor="username">
          Username
        </label>
        <input
          autoComplete="username"
          className={cx(styles.inputStyle, errors.has('username') && styles.inputErrorStyle)}
          disabled={isLoading}
          id="username"
          name="username"
          value={username}
          onChange={handleUsername}
        />
        <label className={styles.labelStyle} htmlFor="password">
          Password
        </label>
        <input
          autoComplete="current-password"
          className={cx(styles.inputStyle, errors.has('password') && styles.inputErrorStyle)}
          disabled={isLoading}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handlePassword}
        />
        <button className={styles.submitButtonStyle} disabled={isLoading} type="submit">
          Login
        </button>
        <div className={styles.links}>
          <span>
            Do not have an account? <Link to="/signup">Sign Up</Link>
          </span>
          <Link to="/restore">Forgot password?</Link>
        </div>
      </form>
    </div>
  )
}

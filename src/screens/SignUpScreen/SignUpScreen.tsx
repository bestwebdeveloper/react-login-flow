import { cx } from 'emotion'
import React from 'react'
import { Link } from 'react-router-dom'

import { signUp } from '../../../api'
import { MessageBox } from '../../components/Message'
import { MESSAGES } from '../../constants'
import * as styles from './styles'

export interface SignUpScreenProps {
  onAccessToken: (accessToken: string) => void
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ onAccessToken }) => {
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
      const doSignUp = async (username: string, password: string) => {
        if (username !== '' && password !== '') {
          try {
            setIsLoading(true)

            const token = await signUp(username, password)

            if (typeof token === 'undefined') {
              throw new Error(MESSAGES.INVALID_CREDENTIALS)
            }

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

      if (password.length < 6) {
        errorsFound.set('password', MESSAGES.PASSWORD_IS_SHORT)
      }

      if (errorsFound.size) {
        setErrors(errorsFound)
      } else {
        doSignUp(username, password)
      }
    },
    [password, username, onAccessToken]
  )

  return (
    <div className={styles.rootStyle}>
      <h1>Sign Up</h1>
      <form action="" className={styles.formWrapperStyle} method="post" onSubmit={handleSubmit}>
        <MessageBox type="error" messages={[...errors.values()]} />
        <label className={styles.labelStyle} htmlFor="username">
          Username
        </label>
        <input
          autoComplete="off"
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
          autoComplete="new-password"
          className={cx(styles.inputStyle, errors.has('password') && styles.inputErrorStyle)}
          disabled={isLoading}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handlePassword}
        />
        <button className={styles.submitButtonStyle} disabled={isLoading} type="submit">
          Sign Up
        </button>
        <div className={styles.links}>
          <span>
            Have an account? <Link to="/login">Login</Link>
          </span>
          <Link to="/restore">Forgot password?</Link>
        </div>
      </form>
    </div>
  )
}

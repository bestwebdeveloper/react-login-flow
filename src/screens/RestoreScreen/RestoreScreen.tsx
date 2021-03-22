import { cx } from 'emotion';
import React from 'react';
import { Link } from 'react-router-dom';

import { restore } from '../../../api';
import { MessageBox } from '../../components/Message';
import { MESSAGES } from '../../constants';
import * as styles from './styles';

export const RestoreScreen: React.FC = () => {
  const [errors, setErrors] = React.useState<Map<string, string>>(new Map());
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>('');
  const [agreement, setAgreement] = React.useState<boolean>(false);
  const [restoredPassword, setRestoredPassword] = React.useState<string | null>(null);
  const handleUsername = React.useCallback(e => {
    setUsername(e.target.value);
  }, []);
  const handleAgreement = React.useCallback(e => {
    setAgreement(e.target.checked);
  }, []);
  const handleSubmit = React.useCallback(
    (e: React.FormEvent) => {
      // TODO: make it cancelable
      e.preventDefault();

      const errorsFound = new Map();
      const doRestore = async (username: string, agreement: boolean) => {
        if (username !== '' && agreement) {
          try {
            setIsLoading(true);

            const newPassword = await restore(username, agreement);

            setRestoredPassword(newPassword);
          } catch (e) {
            setErrors(new Map().set('load', e.message));
            setIsLoading(false);
          }
        }
      };

      setErrors(new Map());

      if (username === '') {
        errorsFound.set('username', MESSAGES.USERNAME_IS_EMPTY);
      }

      if (!agreement) {
        errorsFound.set('agreement', MESSAGES.AGREEMENT_IS_NOT_CHECKED);
      }

      if (errorsFound.size) {
        setErrors(errorsFound);
      } else {
        doRestore(username, agreement);
      }
    },
    [agreement, username]
  );

  return (
    <div className={styles.rootStyle}>
      <h1>Restore password</h1>
      <form action="" className={styles.formWrapperStyle} method="post" onSubmit={handleSubmit}>
        <MessageBox type="error" messages={[...errors.values()]} />
        {restoredPassword ? (
            <div className={styles.restoredPasswordWrapper}>{`Your password is: ${restoredPassword}`}</div>
          ) : (
            <>
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
              <label className={styles.labelStyle} htmlFor="agreement">
                <input
                  className={cx(styles.checkboxStyle, errors.has('agreement') && styles.checkboxErrorStyle)}
                  disabled={isLoading}
                  id="agreement"
                  name="agreement"
                  type="checkbox"
                  checked={agreement}
                  onChange={handleAgreement}
                /> I promise it is my and only my account
              </label>
              <button className={styles.submitButtonStyle} disabled={isLoading} type="submit">
                Restore
              </button>
            </>
          )}
        <div className={styles.links}>
          <span>
            Found your account? <Link to="/login">Login</Link>
          </span>
          <span>
            Want to start from zero? <Link to="/signup">Sign Up</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

import { css, keyframes } from 'emotion'

const shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`

export const formWrapperStyle = css`
  display: flex;
  flex-flow: column nowrap;
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
`
export const inputStyle = css`
  border: 1px solid var(--border-color);
  border-radius: 2px;
  box-sizing: border-box;
  display: block;
  font-size: 1rem;
  padding: var(--gap-2);
  margin-top: var(--gap);
  margin-bottom: var(--gap-2);
  width: 100%;
`
export const inputErrorStyle = css`
  border: 1px solid var(--danger-color);
  animation: ${shake} 1s ease;
`
export const labelStyle = css`
  display: block;
  font-weight: bold;
  margin-top: var(--gap);
  margin-bottom: var(--gap);
`
export const links = css`
  display: flex;
  justify-content: space-between;
  padding: var(--gap-2) 0;
`
export const rootStyle = css`
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  height: 1px;
  min-height: 100%;
  padding: 0 var(--gap);
`
export const submitButtonStyle = css`
  background: var(--primary-color);
  border: 0;
  border-radius: 2px;
  color: var(--inverted-font-color);
  cursor: pointer;
  display: block;
  font-size: 1rem;
  margin-top: var(--gap-2);
  padding: var(--gap-2);
  width: 100%;

  &[disabled] {
    opacity: 0.5;
  }
`

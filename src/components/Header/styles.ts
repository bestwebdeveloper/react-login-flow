import { css } from 'emotion'

export const headerInner = css`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  margin: 0 auto;
  max-width: 600px;
  padding: var(--gap-2) var(--gap);
`
export const headerWrapper = css`
  background: var(--default-background-color);
`
export const logOutButton = css`
  background: transparent;
  border: 0;
  cursor: pointer;
  outline: none;
  padding: var(--gap);

  &:hover {
  }
`

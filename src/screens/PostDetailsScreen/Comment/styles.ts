import { css } from 'emotion'

export const commentAuthor = css`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: var(--gap);
`
export const commentRoot = css`
  margin: var(--gap-3) 0;
`
export const commentText = css`
  background: var(--default-background-color);
  border-radius: 2px;
  margin: var(--gap) 0;
  padding: var(--gap);

  > p:first-child {
    margin-top: 0;
  }

  > p:last-child {
    margin-bottom: 0;
  }
`

import { css } from 'emotion'

export const postLink = css`
  border-radius: 2px;
  display: block;
  padding: var(--gap);
  text-decoration: none;

  &:hover {
    background: var(--default-background-color);
  }
`
export const postLinkComments = css`
  padding-left: var(--gap-2);
  white-space: nowrap;
`
export const postLinkDate = css`
  flex-grow: 1;
  white-space: nowrap;
`
export const postLinkLikes = css`
  padding-left: var(--gap-2);
  white-space: nowrap;
`
export const postLinkTitle = css`
  font-weight: bold;
`
export const postLinkSubtitle = css`
  font-size: 0.8rem;
  display: flex;
  flex-flow: row nowrap;
`
export const postLinkWrapper = css`
  font-weight: normal;
  margin: 0;
`

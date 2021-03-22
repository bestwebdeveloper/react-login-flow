import React from 'react'

interface TextProps {
  text: string
}

export const Text: React.FC<TextProps> = ({ text }) => (
  <>{text.length > 0 ? text.split('\n').map((paragraph, index) => <p key={index}>{paragraph}</p>) : null}</>
)

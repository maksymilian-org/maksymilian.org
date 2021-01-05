import React, { ReactNode } from 'react'

import { Container } from '../container'
import { StyledFooter } from './style'

interface ISocial {
  icon: ReactNode
  to: string
}

interface IFooterProps {
  contact: {
    phone: string
    mail: string
  }
  social: ISocial[]
}

export const Footer = ({ contact, social }: IFooterProps) => (
  <StyledFooter>
    <Container>
      <div className='footer__wrapper'>
        <span>{contact.phone}</span>
        <span>{contact.mail}</span>
        <ul>
          {social.map((item) => (
            <li key={item.to}>
              <a href={item.to} target='_blank' rel='noopener noreferrer'>
                {item.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  </StyledFooter>
)

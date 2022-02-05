import React from 'react'

import { Link } from '../link'
import { HeaderContainer, HeaderMenu } from './style'

export const Header = () => (
  <HeaderContainer>
    <nav className='header__wrapper'>
      <HeaderMenu>
        <Link name='home' to='/'>
          home
        </Link>
        <Link name='about' to='/about'>
          about
        </Link>
        <Link name='portfolio' to='/portfolio'>
          portfolio
        </Link>
      </HeaderMenu>
    </nav>
  </HeaderContainer>
)

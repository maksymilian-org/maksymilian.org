import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Link } from '../link'
// import StarterLogo from '../../assets/svg/luke-logo.svg'
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
        {/* <Link name='skills' to='/skills'>
          skills
        </Link> */}
        {/* <Link name='partners' to='/portfolio'>
          partners
        </Link> */}
      </HeaderMenu>
    </nav>
  </HeaderContainer>
)

import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

import { rem } from '../../styles/mixins'

export const Intro: FunctionComponent = ({ children }) => {
  return (
    <StyledIntro>
      <div className='intro__wrapper'>
        <div>{children}</div>
      </div>
    </StyledIntro>
  )
}

const StyledIntro = styled.div`
  font-size: 1rem;
  padding: 18vh 0;
  .intro__wrapper {
    max-width: 22em;
  }
`

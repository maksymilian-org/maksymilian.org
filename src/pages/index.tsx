import React from 'react'

import { useTrail } from 'react-spring'

import { Intro } from '../components/intro'
import { Container } from '../components/container'
import { Canberra } from '../components/canberra'
import { SpringFadeUp } from '../utils/animations'

export default () => {
  const trail = useTrail(6, {
    from: {
      opacity: 0,
      transform: 'translate(0px, 24px)',
    },
    opacity: 1,
    transform: 'translate(0px, 0px)',
  })
  return (
    <>
      <Canberra title='Home' />

      <Container>
        <Intro>
          <SpringFadeUp>
            <h1>Hello.</h1>
            <h2>My name is Max Furtak.</h2>
            <p>
              I am a frontend developer. I especially liked React and Vue in
              conjunction with TypeScript, but I also love to learn new things.
              You can find me on{' '}
              <a target='blank' href='https://github.com/maksymilian-org'>
                Github
              </a>{' '}
              and{' '}
              <a
                target='blank'
                href='https://linkedin.com/in/maksymilian-furtak'
              >
                LinkedIn
              </a>
              .
            </p>

            <p>
              I live in Lublin (Poland). I am a surveyor by education. In my
              free time I run and ride an electric bicycle and in case of an
              emergency I am{' '}
              <a target='blank' href='https://www.facebook.com/ospkonopnica'>
                a volunteer fireman
              </a>
              .
            </p>
          </SpringFadeUp>
        </Intro>
      </Container>
    </>
  )
}

import React from 'react'
import styled from '@emotion/styled'

import { colors, breakpoints } from '../styles/variables'
import { rem } from '../styles/mixins'
import { Intro } from '../components/intro'
import { Container } from '../components/container'
import { Canberra } from '../components/canberra'
import { SpringFadeUp } from '../utils/animations'
import face from '../assets/images/face.jpg'

export default () => (
  <>
    <Canberra title='About' />

    <Container>
      <Intro>
        <SpringFadeUp>
          <Section>
            <Item>
              <img className='about-face' src={face} alt='maksymilian.org' />
            </Item>
            <div>
              <Item>
                <h4>BIRTH</h4>
                <p>1993</p>
              </Item>
              <Item>
                <h4>CITY</h4>
                <p>Lublin, Poland</p>
              </Item>
            </div>
            <Item>
              <h4>LANGUAGES</h4>
              <p>English A2/B1</p>
            </Item>
            <Item>
              <h4>DRIVING LICENSE</h4>
              <p>B category</p>
            </Item>
          </Section>
          <Section fully>
            <Item>
              <h4>INTERESTS</h4>
              <p>
                firefighting, motorcycle / e-bike tourism, history, medical
                rescue
              </p>
            </Item>
            <Item>
              <h4>TECHNOLOGIES</h4>
              <ul className='technologies'>
                <li>HTML5 &laquo;5 years of experience&raquo;</li>
                <li>CSS3/SASS &laquo;5&raquo;</li>
                <li>JavaScript &laquo;3&raquo;</li>
                <li>TypeScript &laquo;1,5&raquo;</li>
                <li>ReactJS, Redux &laquo;1,5&raquo;</li>
                <li>Vue.js, Vuex &laquo;0,5&raquo;</li>
                <li>Node.js &laquo;1,5&raquo;</li>
                <li>WordPress, WooCommerce, PHP &laquo;4&raquo;</li>
                <li>SQL &laquo;2&raquo;</li>
                <li>Webpack &laquo;2&raquo;</li>
                <li>Git &laquo;2&raquo;</li>
              </ul>
            </Item>
            <Item>
              <h4>EXPERIENCE</h4>
              <h5>02.2019 - 08.2020</h5>
              <p>Frontend Developer</p>
              <p className='name'>Ingrifo Sp. z o.o. / Warsaw </p>
              <p className='info'>
                InTrack App – SLA & Business Process Monitoring new features,
                maintenance, bug fixing
              </p>
              <p className='tags'>
                <span>TypeScript</span> <span>React</span> <span>Redux</span>{' '}
                <span>SCSS</span> <span>HTML</span> <span>PostgreSQL</span>{' '}
                <span>REST</span>
                <span>webpack</span>
              </p>

              <h5>07.2015 - now</h5>
              <p>Frontend Developer</p>
              <p className='name'>Maksymilian.org / Lublin, Warsaw</p>
              <p className='info'>
                Various websites, online stores and small applications new
                features, maintenance, bug fixing, client support, meetings
              </p>
              <p className='tags'>
                <span>JavaScript</span> <span>HTML</span> <span>SCSS</span>{' '}
                <span>WordPress</span> <span>WooCommerce</span> <span>PHP</span>{' '}
                <span>MySQL</span>
                <span>Vue.js</span> <span>Node.js</span>
              </p>
            </Item>
            <Item>
              <h4>EDUCATION</h4>
              <h5>2012-2016</h5>
              <p>Geodesy and Cartography</p>
              <p className='name'>The University of Life Sciences in Lublin</p>
              <p className='info'>
                specialization: agricultural geodesy and real estate appraisal,
                engineer
              </p>

              <h5>2009-2012</h5>
              <p>Mathematical and geographical profile </p>
              <p className='name'>The IX High School in Lublin</p>
            </Item>
            <Item>
              <h4>ORGANIZATIONS</h4>
              <h5>2014 - now</h5>
              <p>Firefighter-rescuer, Secretary of the Board</p>
              <p className='name'>Volunteer Fire Department in Konopnica</p>

              <h5>2009-2013</h5>
              <p>Chairman of the Board </p>
              <p className='name'>Krokiewka Association</p>
            </Item>
            <Item>
              <h4>CERTIFICATES</h4>
              <h5>2018</h5>
              <p>Qualified First Aid Course</p>
              <p className='name'>Diamed, Radzyn Podlaski </p>

              <h5>2016</h5>
              <p>
                Basic training for firefighters of the Volunteer Fire Brigades
              </p>
              <p className='name'>
                City Headquarters of the State Fire Service in Lublin
              </p>
            </Item>
          </Section>
        </SpringFadeUp>
      </Intro>
    </Container>
  </>
)

const Item = styled.div`
  padding: 22px 0;

  h4 {
    color: ${colors.grey.light};
    font-size: 1rem;
    margin: 1rem 0 0;
  }

  h5 {
    font-weight: 700;
    font-size: 1.2rem;
    margin: 2rem 0 0.5rem;
  }

  img.about-face {
    border-radius: 50%;
  }

  p {
    margin-bottom: 0;
  }

  p.name {
    color: ${colors.grey.base};
  }

  p.info {
    font-size: 1.2rem;
    margin: 5px 0;
    color: ${colors.grey.light};
  }

  ul.technologies {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 1.6rem;
  }
`

interface ISection {
  fully?: boolean
}

const Section = styled.div<ISection>`
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: ${rem(breakpoints.sm)}em) {
    grid-template-columns: ${(props) => (props.fully ? '1fr' : ' 1fr 1fr;')};
  }
`

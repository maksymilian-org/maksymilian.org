import React from 'react'
import styled from '@emotion/styled'

import { TrailFadeUp } from '../utils/animations'
import { Container } from '../components/container'
import { Canberra } from '../components/canberra'
import { colors, breakpoints } from '../styles/variables'
import { rem } from '../styles/mixins'

import stajniawojciechow from '../assets/portfolio/stajnia-wojciechow.jpg'
import sklepkardaski from '../assets/portfolio/sklep-kardaski.jpg'
import apartamentyogrodowa from '../assets/portfolio/apartamenty-ogrodowa.jpg'
import hotelmlyn from '../assets/portfolio/hotel-mlyn-lublin.jpg'
import civitaschristiana from '../assets/portfolio/civitas-christiana.jpg'
import hotelrotalbotanic from '../assets/portfolio/hotel-royal-botanic-lublin.jpg'
import forchetto from '../assets/portfolio/forchetto.jpg'
import vacansoleil from '../assets/portfolio/vacansoleil-magyarorszag.jpg'
import wykladzinymarkowe from '../assets/portfolio/wykladziny-markowe-lublin.jpg'
import szkolastasin from '../assets/portfolio/szkola-stasin.jpg'
import tkdeweloper from '../assets/portfolio/tkdeweloper.jpg'
import asbud from '../assets/portfolio/asbud-lagow.jpg'
import dermatolog from '../assets/portfolio/dermatolog.jpg'
import welldding from '../assets/portfolio/wellding-konsultantka-slubna.jpg'
import sharpgames from '../assets/portfolio/sharpgames-gry-planszowe.jpg'
import ksiegowyplus from '../assets/portfolio/ksiegowy-plus-bialystok.jpg'
import ecotechnika from '../assets/portfolio/eco-technika.jpg'
import fundacjarozwojupolski from '../assets/portfolio/fundacja-rozwoju-polski.jpg'
import tictactoe from '../assets/portfolio/tictactoe.jpg'
import memory from '../assets/portfolio/memory.jpg'
import foodidea from '../assets/portfolio/food-idea.jpg'
import todoapp from '../assets/portfolio/todo-app.jpg'

export default () => {
  const items = [
    {
      title: 'ToDo App',
      description: 'App based on React (TypeScript) with Redux',
      type: 'app',
      url: 'https://todo-maksymilian-org.netlify.app/',
      img: todoapp,
      github: 'https://github.com/maksymilian-org/todo-app',
      technologies: ['react', 'redux', 'typescript', 'html', 'css'],
    },
    {
      title: 'Food Idea App',
      description: 'App based on Vue.js 3 + Vuex',
      type: 'app',
      url: 'https://food-idea-maksymilian-org.netlify.app/',
      img: foodidea,
      github: 'https://github.com/maksymilian-org/food-idea',
      technologies: ['vue', 'js', 'html', 'css'],
    },
    {
      title: 'Memory Game',
      description: 'Memory game based on Vue.js 2',
      type: 'game',
      url: 'https://memory-maksymilian-org.netlify.app/',
      img: memory,
      github: 'https://github.com/maksymilian-org/memory',
      technologies: ['vue', 'js', 'html', 'css'],
    },
    {
      title: 'TicTacToe',
      description: 'Game based on React (TypeScript) + Node.js, Socket.io',
      type: 'game',
      url: 'https://tictactoe-maksymilian-org.herokuapp.com',
      img: tictactoe,
      github: 'https://github.com/maksymilian-org/tictactoe',
      technologies: ['scss', 'js', 'react', 'typescript', 'nodejs'],
    },
    {
      title: 'Stajnia Wojciechów',
      description: '',
      type: 'website, blog',
      url: 'https://koniewojciechow.pl/',
      img: stajniawojciechow,
      technologies: ['html', 'css', 'js', 'wordpress'],
    },
    {
      title: 'Kardaski',
      description: '',
      type: 'shop',
      url: 'https://kardaskicrew.com/',
      img: sklepkardaski,
      technologies: ['html', 'css', 'js', 'wordpress', 'woocommerce'],
    },
    {
      title: 'Apartamenty Ogrodowa',
      description: '',
      type: 'website',
      url: 'http://apartamentyogrodowa.pl/',
      img: apartamentyogrodowa,
      technologies: ['html', 'css', 'js', 'wordpress'],
    },
    {
      title: 'Hotel Młyn',
      description: '',
      type: 'website',
      url: '',
      img: hotelmlyn,
      technologies: ['html', 'css', 'js', 'wordpress'],
    },
    {
      title: 'Fundacja Civitas Christiana',
      description: '',
      type: 'website',
      url: 'https://fundacja.civitaschristiana.pl/',
      img: civitaschristiana,
      technologies: ['html', 'css', 'js', 'wordpress'],
    },
    {
      title: 'Hotel Royal Botanic',
      description: '',
      type: 'website',
      url: 'https://hotel-royalbotanic.pl/',
      img: hotelrotalbotanic,
      technologies: ['html', 'css', 'js', 'wordpress'],
    },
    {
      title: 'Forchetto',
      description: '',
      type: 'website',
      url: 'http://forchetto.com/',
      img: forchetto,
      technologies: ['html', 'css', 'js', 'wordpress'],
    },
    {
      title: 'Vacansoleil Hungary',
      description: '',
      type: 'blog',
      url: 'https://www.vacansoleil.hu/blog/',
      img: vacansoleil,
      technologies: ['html', 'css', 'js', 'wordpress'],
    },
    {
      title: 'Wykładziny Markowe',
      description: '',
      type: 'website, product catalog',
      url: 'http://wykladzinymarkowe.pl/',
      img: wykladzinymarkowe,
      technologies: ['html', 'css', 'js', 'wordpress'],
    },
    {
      title: 'Szkoła w Stasinie',
      description: '',
      type: 'website, blog',
      url: 'http://spstasin.com.pl/',
      img: szkolastasin,
      technologies: ['html', 'css', 'js', 'wordpress'],
    },
    {
      title: 'TK Deweloper',
      description: '',
      type: 'website, blog',
      url: 'http://tkdeweloper.pl/',
      img: tkdeweloper,
      technologies: ['html', 'css', 'js', 'wordpress'],
    },
    {
      title: 'Asbud',
      description: '',
      type: 'interactive animations',
      url:
        'https://asbud-lagow.pl/realizacje-asbud/osiedle-domow-jednorodzinnych-rozlogach/',
      img: asbud,
      technologies: ['html', 'css', 'js'],
    },
    {
      title: 'Dermatolog Lublin',
      description: '',
      type: 'website',
      url: 'https://dermatologlublin.com.pl/',
      img: dermatolog,
      technologies: ['html', 'css', 'js', 'wordpress'],
    },
    {
      title: 'Welldding',
      description: '',
      type: 'website',
      url: 'https://welldding.pl/',
      img: welldding,
      technologies: ['html', 'css', 'js', 'wordpress'],
    },
    {
      title: 'Sharpgames',
      description: '',
      type: 'website, product catalog',
      url: '',
      img: sharpgames,
      technologies: ['html', 'css', 'js', 'wordpress'],
    },
    {
      title: 'Księgowy Plus',
      description: '',
      type: 'website',
      url: 'http://ksiegowy.plus/',
      img: ksiegowyplus,
      technologies: ['html', 'css', 'js', 'wordpress'],
    },
    {
      title: 'Eco-Technika',
      description: '',
      type: 'website',
      url: 'http://www.ecotechnika.pl/',
      img: ecotechnika,
      technologies: ['html', 'css', 'js', 'wordpress'],
    },
    {
      title: 'Fundacja Rozwoju Polski',
      description: '',
      type: 'website',
      url: '',
      img: fundacjarozwojupolski,
      technologies: ['html', 'css', 'js', 'wordpress'],
    },
  ]

  const technologies = {
    html: {
      type: 'icon',
      class: 'fab fa-html5',
      color: '#fd7e14',
    },
    css: {
      type: 'icon',
      class: 'fab fa-css3-alt',
      color: '#006eba',
    },
    scss: {
      type: 'icon',
      class: 'fab fa-sass',
      color: '#CF649A',
    },
    js: {
      type: 'icon',
      class: 'fab fa-js',
      color: '#fddc22',
    },
    wordpress: {
      type: 'icon',
      class: 'fab fa-wordpress-simple',
      color: '#23282d',
    },
    react: {
      type: 'icon',
      class: 'fab fa-react',
      color: '#61dafb',
    },
    vue: {
      type: 'icon',
      class: 'fab fa-vuejs',
      color: '#4fc08d',
    },
    nodejs: {
      type: 'icon',
      class: 'fab fa-node-js',
      color: '#026e00',
    },
    typescript: {
      type: 'icon',
      class: 'mdi mdi-language-typescript',
      color: '#3178c6',
    },
  }

  return (
    <>
      <Canberra title='Portfolio' />

      <Container>
        <TrailSectionContainer>
          <TrailContainer>
            <TrailFadeUp>
              {items.map((item) => (
                <TrailItem>
                  <div className='image'>
                    <a href={item.url} target='_blank'>
                      <img src={item.img} />
                    </a>
                  </div>
                  <div className='description'>
                    <div className='content'>
                      <div className='title'>
                        <h4>{item.title}</h4>
                        <span>{item.type}</span>
                      </div>
                      <p>{item.description}</p>
                      <p className='tags'>
                        {item.technologies.map((technology) => (
                          <span>{technology}</span>
                        ))}
                      </p>
                      <div className='links'>
                        <a href={item.url} target='blank'>
                          Preview
                        </a>
                        {item.github && (
                          <a
                            className='github'
                            href={item.github}
                            target='blank'
                          >
                            Github
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </TrailItem>
              ))}
            </TrailFadeUp>
          </TrailContainer>
        </TrailSectionContainer>
      </Container>
    </>
  )
}

const TrailItem = styled.div`
  border-top: 1px solid ${colors.grey.lighter};
  padding: 22px 0;
  display: flex;

  @media (max-width: ${rem(breakpoints.sm)}em) {
    display: block;
  }

  .image {
    margin: 11px 22px 11px 0;
  }

  .description {
    display: flex;
    align-items: center;
  }

  .title {
    display: flex;
    align-items: flex-start;

    h4 {
      margin: 0 0 22px 0;
    }

    span {
      display: inline-block;
      margin-left: 5px;
      padding: 1px 6px;
      border-radius: 10px;
      color: ${colors.grey.base};
      background: ${colors.grey.lighter};
    }
  }

  .links {
    a {
      display: inline-block;
      margin-right: 10px;
      padding: 3px 8px;
      border-radius: 10px;
      background: ${colors.brand.primary};
      color: ${colors.white};
      font-size: 1rem;

      &.github {
        background: ${colors.black};
      }
    }
  }
`
const TrailSectionContainer = styled.div`
  padding: 14vh 0;
`
const TrailContainer = styled.div`
  overflow: hidden;
  > * {
    display: grid;
    grid-template-columns: 1fr;
    // grid-gap: 12px;
    @media (min-width: ${rem(breakpoints.sm)}em) {
      grid-template-columns: 1fr;
    }
  }
`

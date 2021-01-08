import styled from '@emotion/styled'

import { widths, colors } from '../../styles/variables'

export const StyledFooter = styled.footer`
  bottom: 0;
  position: relative;
  width: 100%;
  padding: 16px 0;
  .footer__wrapper {
    max-width: ${widths.xl}px;
    color: ${colors.grey.base};
    font-size: 14px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;

    span {
      margin: 10px 0 10px 24px;
    }
    .footer__logo {
      max-width: 48px;
      max-height: 16px;
      height: 100%;
      width: 100%;
    }
    ul {
      display: flex;
      list-style: none;
      padding: 0;
      margin: 10px 0;
      li {
        margin: 0 0 0 24px;
        a {
          color: ${colors.grey.base};
          height: 100%;
          &:hover {
            color: ${colors.brand.primary};
          }
          svg {
            max-width: 16px;
            max-height: 16px;
            min-width: 10px;
            min-height: 10px;
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    @media (max-width: ${widths.xs}px) {
      justify-content: center;

      span {
        margin-left: 12px;
        margin-right: 12px;
      }

      ul li {
        margin: 0 12px;
      }
    }
  }
`

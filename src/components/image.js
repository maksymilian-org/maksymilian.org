import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Image = ({ src, alt }) => {
  const [fixed, setFixed] = useState("")
  const data = useStaticQuery(graphql`
    query {
      allImageSharp {
        edges {
          node {
            id
            fixed(width: 150) {
              originalName
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  `)

  useEffect(() => {
    const img = data.allImageSharp.edges.find(
      edge => edge.node.fixed.originalName === src
    )
    if (img) setFixed(img.node.fixed)
  }, [src, data.allImageSharp.edges])

  return !!fixed ? (
    <Img fixed={fixed} positionObject="contain" alt={alt} />
  ) : (
    <img src="/" alt="" />
  )
}

export default Image

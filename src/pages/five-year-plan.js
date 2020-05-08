
import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/homelayout"
import SEO from "../components/seo"

const FiveYearPlan = ({ data }) => {
  const fiveYearPlan = data.allContentfulArticle.edges

  return (
    <Layout>
      <SEO title="five-year plan" />
      <header className="h-0">
    <div className="fixed z-50"> 
<div id="menuToggle">

    <input type="checkbox" />

    <span style={{background: "black"}}></span>
    <span style={{background: "black"}}></span>
    <span style={{background: "black"}}></span>
    

    <ul id="menu" className="w-screen h-screen bg-blue-700 text-center flex flex-col justify-evenly right-0 bottom-0">
            <li className="-pt-5 text-white text-4xl"><Link to="/">Home</Link></li>
            <li className="text-white text-4xl"><Link to="/about">About</Link></li>
            <li className="text-white text-4xl"><Link to="/9-to-5">9-to-5</Link></li>
            <li className="text-white text-4xl"><Link to="/five-year-plan">Five-Year Plan</Link></li>
            <li className="text-white text-4xl"><Link to="/gallery">Gallery</Link></li>
            <li className="text-white text-4xl"><a href="https://www.instagram.com/the31percent/">Instagram</a></li>
          </ul>

    </div>
    </div>
  </header>
      <div className="">
      <h1 className=" text-4xl pt-16 w-10/12 m-auto text-center pb-1">Five-Year Plan</h1>
      <h3 className="description text-2xl pt-10 w-8/12 m-auto text-center pb-5">We're asking women about what their plans (if any) were when they were 20 years old – were they struggling under a mountain of student debt? Or looking to abandon ship at a thankless job? </h3>
      </div>

      <div className="blogposts">
         <div className="">
          <div className="md:flex md:flex-wrap m-auto md:w-10/12">
            {fiveYearPlan.map(({ node: post }) => (
              <div className="w-screen md:w-1/2 md:h-auto px-5 py-5">
                <div key={post.id}>
                  <div className="h-64 gallerybox">
                    <Link to={`/blogpost/${post.slug}`}>
                    {post.mainImage !== null && (
              <img
                className="w-full h-full object-cover"
                src={post.mainImage.fluid.src}
                alt={post.mainImage.title}
              />
            )}

                    </Link>
                    <div className="grid justify-center">
                      <div className="grid items-center w-64 h-24 bg-white nameblock  -mt-32 ">
                        <Link to={`/blogpost/${post.slug}`}>
                          <h3 className=" align-middle text-xl  tracking-widest uppercase text-center">
                            {" "}
                            {post.title} {post.lastName} <br />{" "}
                            <span className=" font-serif font-thin lowercase text-base">
                              {post.businessName}
                            </span>
                          </h3>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  )
}
export default FiveYearPlan
export const query = graphql`
  query FiveYearPlanPageQuery {
    allContentfulArticle(
      limit: 1000
      filter: { node_locale: { eq: "en-US" }, featureType2: {elemMatch: {title: {eq: "five-year plan"}}} }
    ) {
      edges {
        node {
          id
          title
          lastName
          businessName
          slug
          bodyText {
            bodyText
          }
          featureType2 {
            title
          }
          mainImage {
            title
            contentful_id
            fluid(maxWidth: 1000)  {
              src
            }
          }
        }
      }
    }
  }
`

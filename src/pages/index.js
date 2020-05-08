import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/homelayout"
import SEO from "../components/seo"


const BlogPost = ({ data }) => {
  const blogPosts = data.allContentfulArticle.edges

  return (
    <Layout>
      <SEO title="The Thirty-One Percent" />
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

      <div className="blogposts">
     
        <div className="hidden md:block leftbox md:w-1/2 md:h-full md:fixed md:flex md:flex-col md:justify-between  md:pt-24">
      
<div>
              <h1 className="grayname md:text-white md:text-left text-center text-2xl md:text-6xl xl:text-6xl md:pl-32 uppercase leading-relaxed tracking-wide md:pr-10">
                The Thirty-One Percent
              </h1>
              </div>
              <div>
              <p className="about text-lg  md:text-2xl lg:text-3xl pl-3 pr-3 md:pl-32 md:pr-24 text-gray-700 pb-5 md:pb-32">
                Traditional profiles tend to ask successful women about their
                “favorite places to shop” or their “guilty pleasures.” You won’t
                find those questions here. <span className=" font-bold">Thirty-one percent of businesses in Boston are owned
                by women—we're telling their stories.</span>
              </p>
              </div>
            </div>

            <div className="md:w-1/2 md:h-auto md:float-right leftbox">
          <div className="md:flex md:flex-wrap ">
            {blogPosts.map(({ node: post }) => (
              <div className="w-screen md:w-1/2 md:h-auto pb-5 md:pb-0">
                <div key={post.id}>
                  <div className="imagebox">
                    <Link to={`/blogpost/${post.slug}`}>
                    {post.mainImage !== null && (
              <img
                className="w-auto h-full object-cover"
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
export default BlogPost
export const query = graphql`
  query BlogPostPageQuery {
    allContentfulAsset(limit: 1000, filter: { node_locale: { eq: "en-US" } }) {
      edges {
        node {
          fluid(maxWidth: 1000) {
            src
          }
          contentful_id
        }
      }
    }
    allContentfulArticle(
      limit: 1000
      filter: { node_locale: { eq: "en-US" } }
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

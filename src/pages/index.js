import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
const HomePage = ({ data }) => {
  const blogPosts = data.allContentfulArticle.edges
  return (
    <Layout>
      <SEO title="Blog posts" />
      <div className="blogposts">
      <div>
          <Link to={`/`}><h2 className="text-6xl lowercase text-center">The Thirty-One Percent</h2></Link>
        </div>
      <div className="grid grid-cols-2">
        {blogPosts.map(({ node: post }) => (
       
         <div key={post.id}>
            
              
                <div className="pt-5 pb-5 pl-2 pr-2 h-auto">
            <Link to={`/blogpost/${post.slug}`}>
            {post.mainImage !== null && (
              <img
                className="w-full h-full object-contain object-center"
                src={post.mainImage.file.url}
                alt={post.mainImage.title}
              />
            )}
            </Link>
            <div className="nameblock">
            <Link to={`/blogpost/${post.slug}`}>
             <h3 className=" bg-white  items-center text-2xl -mt-20 font-bold tracking-widest uppercase leading-loose text-center"> {post.title} {post.lastName}</h3>
            </Link>
            </div>
          
            </div>

          </div>
        ))}
        </div>
        <span className="mgBtm__24" />
        <Link to="/">Go back to the homepage</Link>
      </div>
    </Layout>
  )
}
export default HomePage
export const query = graphql`
  query HomePagePageQuery {
    allContentfulArticle(
      limit: 1000
      filter: { node_locale: { eq: "en-US" } }
    ) {
      edges {
        node {
          id
          title
          lastName
          slug
          bodyText {
            bodyText
          }
          mainImage {
            title
            file {
              url
            }
          }
        }
      }
    }
  }
`


import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const NineFive = ({ data }) => {
  const nineFive = data.allContentfulArticle.edges

  return (
    <Layout>
      <SEO title="9-to-5" />

      <div className="blogposts">
         <div className="leftbox">
          <div className="md:flex md:flex-wrap ">
            {nineFive.map(({ node: post }) => (
              <div className="w-screen md:w-1/2 md:h-auto px-5 py-5">
                <div key={post.id}>
                  <div className="gallerybox">
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
export default NineFive
export const query = graphql`
  query NineFivePageQuery {
    allContentfulArticle(
      limit: 1000
      filter: { node_locale: { eq: "en-US" }, featureType2: {elemMatch: {title: {eq: "9-to-5"}}} }
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

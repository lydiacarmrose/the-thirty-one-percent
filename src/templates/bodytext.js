import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>

const options = {
    renderMark: {
      [MARKS.BOLD]: text => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    },
  }


const Article = ({ data }) => {
    console.log(data)
    return documentToReactComponents(data.contentfulArticle.bodyText.json, options) 
//   const {title, lastName, businessName, featureType2, introText, bodyText, mainImage} = data.contentfulArticle;
//   return (
//     <Layout>
//   <div className="lg:grid lg:grid-cols-2 lg:grid-rows-2">
//     <div className="lg:col-span-1 lg:row-span-2 lg:px-1 lg:h-screen">
//           <img  className="lg:pr-20 lg:h-full w-full object-cover object-center " alt={mainImage.title} src={mainImage.file.url} />
//           </div>
//           <div className="lg:col-start-2 lg:col-span-1 lg:row-span-1s">
//           <h1 className="ml-2 lg:-mt-0 lg:ml-0 text-6xl leading-tight lg:-ml-2 lg:pt-32 ">{title}<br /> {lastName}</h1>
//         <h2 className="font-hairline text-gray-500 text-2xl ml-2 lg:ml-0 ">{businessName}</h2>
//         <h3>{featureType2.title}</h3>
//         </div>
//         <div className="mt-5 mx-auto ml-8 mr-8 border-l-2 border-blue-700 border-t-2 lg:border-l-4 lg:border-t-4 lg:col-start-2 lg:row-start-2 lg:row-span-1 lg:col-span-1 pt-2 lg:pt-4 pl-2 lg:pl-4 lg:mr-48 lg:ml-16">
//     <p className="font-serif"><em>{introText.json}</em></p>
//   </div>
//   </div>
//   <p className="body-text">{bodyText.json}</p>
//         <Link to="/blogposts">View more posts</Link>
//         <Link to="/">Back to Home</Link>

//     </Layout>
//   );
};
export default Article;
export const query = graphql`
query($slug: String!) {
  contentfulArticle(slug: { eq: $slug }) {
    title
    lastName
    businessName
    slug
    bodyText {
        json

    }
    featureType2 {
      title
    }
    introText {
        json
        introText
    }
    mainImage {
      title
      file {
        fileName
        url
      }
    }
  }
}
`;

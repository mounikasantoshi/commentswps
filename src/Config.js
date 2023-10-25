import { useState } from "react";
import { useParams } from 'react-router-dom';
export const EndPoints = () => {
    let [params, setParams] = useState(useParams());
    let blogName = params.blog_name;
    let postSlug = params.post_slug;
    const baseURL = "https://www.visualstudio-staging.com";
    const devEndpoints = { 
        API_BASE_URL: baseURL,       
        GRAPH_QL_URL: `${baseURL}/${blogName}/graphql`,
        BLOG_NAME: blogName,
        POST_SLUG: postSlug
    }
    //console.log("GRAPH_QL_URL",devEndpoints.GRAPH_QL_URL);
    return devEndpoints;
}
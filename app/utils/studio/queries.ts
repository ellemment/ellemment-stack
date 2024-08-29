import groq from "groq";

export const POSTS_QUERY = groq`*[_type == "document" && defined(slug.current)] | order(_createdAt desc)`;
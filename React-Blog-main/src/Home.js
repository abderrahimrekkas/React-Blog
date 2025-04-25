import {useState, useEffect} from 'react';
import BlogList from './BlogList';
import TRue from './TRue';
import useFetch from './useFetch';
import React from 'react';
const Home = () => {
     const {data: blogs, isPending, error} = useFetch('http://localhost:8000/blogs');
     
    return ( 

        <>
        <TRue />
         <div className="home">
            { error && <div> { error } </div> }
            { isPending && <div>Loading.....</div> }
           {blogs && <BlogList blogs={blogs} title="All Blogs" />}
        </div> 
        </>
      
     );
}
 
export default Home;
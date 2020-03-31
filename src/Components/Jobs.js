import React, { useState,useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "../style/base/base.css";
import "../style/component/jobs.css";



// GQ Query to fetch all the JOBS
const JOBS = gql`
  {
    jobs {
      id
      title
      isPublished
      description
      slug
      company {
        name
      }
      userEmail
      applyUrl
    }
  }
`;

export default function Job(props) {
  
  let [jobs, setJobs] = useState([]);
  const { loading, data } = useQuery(JOBS);
  useEffect(() => {
    if(data){
    
    setJobs(data.jobs);
  }
    
    
  }, [data])
  if (loading)
    return (
     <div className="loading">
     <h1>loading....</h1>
      </div>
    );
  
 

  return (
   <div>
    <input
            
            type="text"
            className="form"
            placeholder="Enter Job or Company"
            //onChange={onChange}
          />
          
     
     {jobs.map(function(item, i){
       console.log(item,'index i',i);
  return <div className="data">
  <li key={i}>{item && item.id}</li>
  <li key={i}>{item && item.item}</li>
  <li key={i}>{item && item.isPublished}</li>
  <li key={i}>{item && item.description}</li>
  <li key={i}>{item && item.company.name}</li>
  </div>
})}
   </div>
  );
}

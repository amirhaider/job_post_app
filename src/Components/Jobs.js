import React, { useState,useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { NavLink} from 'react-router-dom';
import "../style/base/base.css";
import "../style/component/jobs.css";





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
        slug
      }
      userEmail
      applyUrl
    }
  }
`;

export default function Job(props) {
  const View=()=>{
       console.log("view working") ;
  };
  
  let [jobs, setJobs] = useState([]);
  let [filter, setfilter] = useState([]);
  const { loading, data } = useQuery(JOBS);
  useEffect(() => {
    if(data){
    
    setJobs(data.jobs);
    setfilter(data.jobs);
  }
    
    
  }, [data])
  const onChange = e => {
    let f = jobs.filter(
      f =>
        f.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        f.company.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setfilter(f);
  };
  if (loading)
    return (
     <div className="loading">
     <h1>loading....</h1>
      </div>
    );
  return (
   <div className="main_data_div"> 
    <input
            
            type="text"
            className="input"
            placeholder="Enter Job or Company for serch"
            onChange={onChange}
          />
          
     
     {filter.map(function(item){
  return <div className="main_div">
  <div className="">
  <div className="data">
  <div className="data_header">
  <input
                        type="checkbox"
                        className="custom_checkbox"
                        checked={item.isPublished}
                        
                      />
                     
                      {item.company && (
                        <a
                          href={`/jobs/${item.slug}/${item.company.slug}`}
                          className="title"
                        >
                          {item.title}
                        </a>
                        
                      )}
                      <small>at </small>{" "}
                      <b className="company_name">{item.company.name}</b>
                      <p className="apply_view">
                      <button
                        
                        className="apply"
                      >
                        Apply
                      </button>
                      {item.company && (
                        <button
                          onClick={View}
       
                          className="view_details"
                          
                        >
                          Details
                        </button>
                      )}
                    </p>
                    </div>
                      <p className="description">{item.description}</p>
                      {item.userEmail && (
                      <p className="">
                        <strong>Posted By:</strong>{" "}
                        <a href={item.userEmail} className="email"> {item.userEmail}</a>
                      </p>
                    )}
           </div>
        </div>
    </div>
})}
   </div>
  
  );
}

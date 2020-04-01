import React, { useState,useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
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
   <div>
    <input
            
            type="text"
            className="form"
            placeholder="Enter Job or Company for serch"
            onChange={onChange}
          />
          
     
     {filter.map(function(item, i){
       console.log(item,i);
  return <div className="main_div">
  <div className="main_data_div">
  <div className="data">
  <input
                        type="checkbox"
                        className="custom_checkbox"
                        id={item.id}
                        checked={item.isPublished}
                      />
                      <label
                        class="label"
                        for={item.id}
                        title="Published"
                        
                      ></label>
                      {item.company && (
                        <a
                          href={`/jobs/${item.slug}/${item.company.slug}`}
                          class="title"
                        >
                          {item.title}
                        </a>
                        
                      )}
                      <small>at </small>{" "}
                      <b className="company_name">{item.company.name}</b>
                      <p class="apply_view">
                      <button
                        onClick={item.applyUrl}
                        className="apply"
                      >
                        Apply
                      </button>
                      {item.company && (
                        <button
                          onClick={`/jobs/${item.slug}/${item.company.slug}`}
                          className="view_details"
                          
                        >
                          Details
                        </button>
                      )}
                    </p>
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

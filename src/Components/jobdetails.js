import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useParams } from "react-router";
import "../style/base/base.css";
import "../style/component/jobdetails.css";


const GET_JOB = gql`
  query getJob($companySlug: String!, $jobSlug: String!) {
    job(input: { companySlug: $companySlug, jobSlug: $jobSlug }) {
      id
      title
      isPublished
      description
      company {
        name
      }
      userEmail
      applyUrl
    }
  }
`;

export default function JobDetails(props) {
  const { job_slug, company_slug } = useParams();
  let [job, setJob] = useState({});
  const { loading, data } = useQuery(GET_JOB, {
    variables: {
      jobSlug: job_slug,
      companySlug: company_slug
    }
  });
  if (!Object.keys(job).length && data && data.job) {
    setJob(data.job);
  }
  if (loading) {
    return (
      
      <div className="">
  
            <h4 className="">Job Details </h4>
            <div className="loading">
              <h3>Loading...</h3>
            </div>
            </div>
          
    );
  }
  const { id, title, isPublished, description, company, applyUrl } = job;
  return (
    <div class="">
      <div class="">
        <div className="data">
          <h2 className="job_details">Job Details</h2>
          <div class="">
            <div class="">
              <div class="">
                <input
                  type="checkbox"
                  id={id}
                  checked={isPublished}
                />
                
                <a
                href="www.bing.com"
                  
                  className="title"
                >
                  {title}
                </a>
                <small>at </small>{" "}
                {company && (
                  <b className="company">{company.name}</b>
                )}
                <a
                  href={applyUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="apply"
                >
                  Apply
                </a>
              </div>
              <p className="description_detailspade">{description}</p>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

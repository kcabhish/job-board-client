import { useParams } from 'react-router';
import { getCompany } from '../lib/graphql/queries';
import { useEffect, useState } from 'react';
import JobList from '../components/JobList';

function CompanyPage() {
  const { companyId } = useParams();

  const [state, setState] = useState({
    company: null,
    loading: true,
    error: false
  });
  useEffect(() => {
    (async () => {
      try{
        const company = await getCompany(companyId);
        setState({
          company, loading: false, error: false
        });
      } catch (e) {
        setState({
          company: null, loading: false, error: true
        });
      } 
    })();
  }, [companyId]);

  const { company, loading, error } = state;
  if (loading) {
    return <>Loading...</>
  }
  if (error || !company) {
    return <div className='has-text-danger'>Data unavailable</div>
  }

  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
      <h2 className="title is-5">
        Jobs at {company.name}
      </h2>
      <div>
        <JobList jobs={company.jobs} />
      </div>
    </div>
  );
}

export default CompanyPage;

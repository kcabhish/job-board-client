import { GraphQLClient, gql } from "graphql-request";

const graphQLUrl = 'http://localhost:9000/graphql';
const client = new GraphQLClient(graphQLUrl);

export async function getJob(id) {
  const query = gql`
    query jobById($id: ID!) {
      job(id: $id) {
        id,
        date,
        title,
        company {
          id,
          name
        }
        description
      }
    }
  `;
  const { job } = await client.request(query, { id });
  return job;
}
export async function getJobs() {
    const query = gql`
        query {
        jobs {
          company {
            id
            name
          }
          date
          title
          id
        }
      }`;

    const { jobs } = await client.request(query);
    return jobs;
}

export async function getCompany(id) {
  const query = gql`
    query companyById($id: ID!) {
      company(id: $id) {
        id,
        name,
        description,
        jobs {
          title,
          date,
          id
        }
      }
    }
  `;
  const { company } = await client.request(query, { id });
  return company;
}
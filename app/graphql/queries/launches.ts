import { gql } from '@apollo/client'

export const LAUNCHES = gql`
  {
    launches(limit: 5) {
      id
      launch_date_utc
      launch_site {
        site_name
      }
      launch_success
      mission_name
      rocket {
        rocket_name
      }
      ships {
        name
      }
    }
  }
`

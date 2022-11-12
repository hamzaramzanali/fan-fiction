import React from 'react';
import { useQuery } from '@apollo/client';

import PublicAdventureList from '../components/PublicAdventureList';

import { QUERY_ADVENTURES} from '../utils/queries';

const CommunityPage = () => {
    const { loading, data } = useQuery(QUERY_ADVENTURES);
    const adventures = data?.thoughts || [];


    return (
        <main>
        <div className="flex-row justify-center">
          <div className="col-12 col-md-8 mb-3">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <PublicAdventureList
                adventures={adventures}
                title="Community Adventures..."
              />
            )}
          </div>
        </div>
      </main>
    );
  };
  

export default CommunityPage;


import { useState } from 'react';

import Loading from '@components/loading';
import Layout from '@components/layout';

import metadata from './metadata';
import { DashboardContainer } from './styles';

const Dashboard = () => {
  const [loading, _setLoading] = useState(true);

  if (loading) {
    return (
      <Layout {...metadata}>
        <Loading message="Carregando visão geral..." />
      </Layout>
    );
  }

  return (
    <Layout {...metadata}>
      <DashboardContainer>

      </DashboardContainer>
    </Layout>
  );
};

export default Dashboard;
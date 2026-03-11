import { useState } from 'react';

import useUserStore from '@stores/user';
import Layout from '@components/layout';
import Loading from '@components/loading';

import DashboardStats from './subcomponents/stats';
import WelcomeHeader from './subcomponents/header';
import metadata from './metadata';
import { DashboardContainer, SectionContainer } from './styles';

const Dashboard = () => {
  const { user } = useUserStore();
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
        <SectionContainer>
          <WelcomeHeader user={user} />
        </SectionContainer>
        <SectionContainer>
          <DashboardStats user={user} totalProves={0} />
        </SectionContainer>
        <SectionContainer sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
        </SectionContainer>
      </DashboardContainer>
    </Layout>
  );
};

export default Dashboard;
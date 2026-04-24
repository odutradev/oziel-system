import { useState } from 'react'

import WelcomeMessage from './subcomponents/welcome'
import { DashboardContainer } from './styles'
import Loading from '@components/loading'
import Layout from '@components/layout'
import metadata from './metadata'

const Dashboard = () => {
  const [loading, _setLoading] = useState(false)

  if (loading) {
    return (
      <Layout {...metadata}>
        <Loading message="Carregando visão geral..." />
      </Layout>
    )
  }

  return (
    <Layout {...metadata}>
      <DashboardContainer>
        <WelcomeMessage />
      </DashboardContainer>
    </Layout>
  )
}

export default Dashboard
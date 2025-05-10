// src/utils/withRouter.tsx
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export interface WithRouterProps {
  location: ReturnType<typeof useLocation>;
  navigate: ReturnType<typeof useNavigate>;
  params: ReturnType<typeof useParams>;
}

const withRouter = <P extends WithRouterProps>(Component: React.ComponentType<P>) => {
  function ComponentWithRouterProp(props: Omit<P, keyof WithRouterProps>) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    return (
      <Component
        {...(props as P)}
        location={location}
        navigate={navigate}
        params={params}
      />
    );
  }

  return ComponentWithRouterProp;
};

export default withRouter;

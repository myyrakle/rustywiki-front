import * as React from 'react';
import DefaultLayout from '../../../components/DefaultLayout';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IACLPageProps {}

const ACLPage: React.FunctionComponent<IACLPageProps> = () => {
  return <DefaultLayout>접근 제어 목록 페이지</DefaultLayout>;
};

export default ACLPage;

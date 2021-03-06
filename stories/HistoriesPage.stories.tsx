import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import HistoriesPage from '../pages/d/histories/[pageName]';
import { ApiProvider } from '../hooks/useApi';
import fakerStatic from 'faker';
import { DocHistoryType } from '../libs/api/DocApi';

export default {
  title: 'Pages/Detail/Histories',
  component: HistoriesPage,
} as Meta;

const Template: Story = () => {
  return <HistoriesPage pageName="제목" />;
};

export const Default = (): React.ReactNode => (
  <ApiProvider
    doc={
      {
        async getDocumentHistory() {
          const histories: DocHistoryType[] = Array(10)
            .fill('')
            .map(() => ({
              char_count: fakerStatic.datatype.number(),
              content: fakerStatic.lorem.paragraphs(3),
              id: fakerStatic.datatype.number(),
              increase: fakerStatic.datatype.number(),
              reg_utc: Math.round(
                fakerStatic.datatype.datetime().getTime() / 1000
              ),
              revision_number: fakerStatic.datatype.number(),
              writer_id: fakerStatic.datatype.number(),
              writer_name: fakerStatic.name.lastName(),
            }))
            .sort((a, b) => (a.id > b.id ? -1 : 1));
          return { list: histories, total_count: 20 } as any;
        },
      } as any
    }
  >
    <Template />
  </ApiProvider>
);

Default.args = {};

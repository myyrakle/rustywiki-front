import { AxiosInstance } from 'axios';
import type { DefaultResponse } from './DefaultResponse.type';
import type { PagingResultType } from './PagingResult.type';

type RegisterDocumentResponse = DefaultResponse & {
  is_new_doc: boolean;
};

export type GetDocumentResponse = DefaultResponse & {
  not_exists: boolean;
  title: string;
  content: string;
  last_update_utc: number;
};

export type DocHistoryType = {
  id: number;
  content: string;
  char_count: number;
  increase: number;
  revision_number: number;
  reg_utc: number; //timestamp
  writer_id: number;
  writer_name: string;
};

export type GetDocHistoriesResponseType = DefaultResponse &
  PagingResultType<DocHistoryType>;
export type GetDocHistoryDetailResponseType = DefaultResponse & {
  prev_history: DocHistoryType;
  current_history: DocHistoryType;
};

export class DocApi {
  constructor(private axios: AxiosInstance) {}

  async getDocument(title: string): Promise<GetDocumentResponse> {
    const result = await this.axios.get<GetDocumentResponse>('/doc/document', {
      params: { title },
    });

    return result?.data;
  }

  async registerDocument(
    title: string,
    content: string
  ): Promise<RegisterDocumentResponse> {
    const result = await this.axios.post<RegisterDocumentResponse>(
      '/doc/document',
      {
        title,
        content,
      }
    );
    return result?.data;
  }

  async getDocumentHistory(
    title: string,
    page: number
  ): Promise<GetDocHistoriesResponseType> {
    const result = await this.axios.get<GetDocHistoriesResponseType>(
      '/doc/history-list',
      {
        params: {
          title,
          page,
        },
      }
    );
    return result?.data;
  }

  async getDocumentHistoryDetail(
    historyId: string
  ): Promise<GetDocHistoryDetailResponseType> {
    const result = await this.axios.get<GetDocHistoryDetailResponseType>(
      '/doc/history',
      {
        params: {
          history_id: historyId,
        },
      }
    );
    return result?.data;
  }

  async rollbackHistory(historyId: string): Promise<DefaultResponse> {
    const result = await this.axios.post<DefaultResponse>(
      '/doc/history/rollback',
      {
        history_id: +historyId,
      }
    );
    return result?.data;
  }
}

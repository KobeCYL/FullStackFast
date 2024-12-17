import type {
  ProcessRule,
  DocumentResponse,
  UpdateSegmentRequest,
  CreateDatasetRequest,
  CreateDatasetResponse,
  GetDatasetsResponse,
  UpdateDocumentRequest,
  IndexingStatusResponse,
  DeleteDocumentResponse,
  GetDocumentsResponse,
  Segment,
  AddSegmentResponse,
  QuerySegmentResponse,
  DeleteSegmentResponse,
  RetrieveRequest,
  RetrieveResponse
} from './types';

export class DifyDatasetSDK {
  private baseUrl: string;
  private apiKey: string;
  constructor({ baseUrl, apiKey }: { baseUrl?: string, apiKey: string }) {
    this.baseUrl = baseUrl || 'https://api.dify.ai/v1';
    this.apiKey = apiKey;
  }

  async createDocumentByText({ datasetId, name, text, indexingTechnique, processRule }: {
    datasetId: string,
    name: string,
    text: string,
    indexingTechnique?: 'high_quality' | 'economy',
    processRule?: ProcessRule
  } = {
      datasetId: '',
      name: '',
      text: '',
      indexingTechnique: 'high_quality',
      processRule: { mode: 'automatic' }
    }): Promise<DocumentResponse> {
    const response = await fetch(`${this.baseUrl}/datasets/${datasetId}/document/create-by-text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        name,
        text,
        indexing_technique: indexingTechnique,
        process_rule: processRule,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  }

  async createDataset(request: CreateDatasetRequest = {
    name: 'test',
    description: 'test',
    indexing_technique: 'high_quality',
    permission: 'only_me',
    provider: 'vendor',
  }): Promise<CreateDatasetResponse> {
    const response = await fetch(`${this.baseUrl}/datasets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  }

  async getDatasets({ page = '1', limit = '20' }: { page?: string, limit?: string } = {}): Promise<GetDatasetsResponse> {
    const response = await fetch(`${this.baseUrl}/datasets?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });


    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  }

  async deleteDataset({ datasetId }: { datasetId: string }): Promise<void> {
    const response = await fetch(`${this.baseUrl}/datasets/${datasetId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
  }

  async updateDocumentByText({ datasetId, documentId, updateRequest }: {
    datasetId: string,
    documentId: string,
    updateRequest: UpdateDocumentRequest
  }): Promise<DocumentResponse> {
    const response = await fetch(`${this.baseUrl}/datasets/${datasetId}/documents/${documentId}/update-by-text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(updateRequest),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  }

  async updateDocumentByFile({ datasetId, documentId, name, file, processRule }: {
    datasetId: string,
    documentId: string,
    name: string,
    file: File,
    processRule?: ProcessRule
  }): Promise<DocumentResponse> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', file);

    if (processRule) {
      formData.append('process_rule', JSON.stringify(processRule));
    }

    const response = await fetch(`${this.baseUrl}/datasets/${datasetId}/documents/${documentId}/update-by-file`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  }

  async getDocumentIndexingStatus({ datasetId, batch }: {
    datasetId: string,
    batch: string
  }): Promise<IndexingStatusResponse> {
    const response = await fetch(`${this.baseUrl}/datasets/${datasetId}/documents/${batch}/indexing-status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  }

  async deleteDocument({ datasetId, documentId }: {
    datasetId: string,
    documentId: string
  }): Promise<DeleteDocumentResponse> {
    const response = await fetch(`${this.baseUrl}/datasets/${datasetId}/documents/${documentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  }

  async getDatasetDocuments({ datasetId, keyword, page, limit = '20' }: {
    datasetId: string,
    keyword?: string,
    page?: string,
    limit?: string
  }): Promise<GetDocumentsResponse> {
    const queryParams = new URLSearchParams({ limit });

    if (keyword) queryParams.append('keyword', keyword);
    if (page) queryParams.append('page', page);

    const response = await fetch(`${this.baseUrl}/datasets/${datasetId}/documents?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  }

  async addSegments({ datasetId, documentId, segments }: {
    datasetId: string,
    documentId: string,
    segments: Segment[]
  }): Promise<AddSegmentResponse> {
    const response = await fetch(`${this.baseUrl}/datasets/${datasetId}/documents/${documentId}/segments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({ segments }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  }

  async queryDocumentSegments({ datasetId, documentId, keyword, status }: {
    datasetId: string,
    documentId: string,
    keyword?: string,
    status?: string
  }): Promise<QuerySegmentResponse> {
    const queryParams = new URLSearchParams();

    if (keyword) queryParams.append('keyword', keyword);
    if (status) queryParams.append('status', status);

    const response = await fetch(`${this.baseUrl}/datasets/${datasetId}/documents/${documentId}/segments?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  }

  async deleteDocumentSegment({ datasetId, documentId, segmentId }: {
    datasetId: string,
    documentId: string,
    segmentId: string
  }): Promise<DeleteSegmentResponse> {
    const response = await fetch(`${this.baseUrl}/datasets/${datasetId}/documents/${documentId}/segments/${segmentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  }

  async updateDocumentSegment({ datasetId, documentId, segmentId, segment }: {
    datasetId: string,
    documentId: string,
    segmentId: string,
    segment: UpdateSegmentRequest
  }): Promise<AddSegmentResponse> {
    const response = await fetch(`${this.baseUrl}/datasets/${datasetId}/documents/${documentId}/segments/${segmentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({ segment }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  }
  async retrieveFromDataset({ datasetId, retrieveRequest }: {
    datasetId: string,
    retrieveRequest: RetrieveRequest
  }): Promise<RetrieveResponse> {
    const response = await fetch(`${this.baseUrl}/datasets/${datasetId}/retrieve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(retrieveRequest),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  }
}

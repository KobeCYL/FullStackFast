import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DifyDatasetSDK } from './dify';
import type {
  ProcessRule,
  CreateDatasetRequest,
  UpdateDocumentRequest,
  Segment,
  UpdateSegmentRequest,
  RetrieveRequest
} from './types';

@Injectable()
export class DifyService {
  private readonly difyClient: DifyDatasetSDK;

  constructor(private configService: ConfigService) {
    this.difyClient = new DifyDatasetSDK({
      apiKey: this.configService.get<string>('DIFY_API_KEY'),
      baseUrl: this.configService.get<string>('DIFY_BASE_URL'),
    });
  }

  // Dataset operations
  async createDataset(request: CreateDatasetRequest) {
    return this.difyClient.createDataset(request);
  }

  async getDatasets(page?: string, limit?: string) {
    return this.difyClient.getDatasets({ page, limit });
  }

  async deleteDataset(datasetId: string) {
    return this.difyClient.deleteDataset({ datasetId });
  }

  // Document operations
  async createDocumentByText(
    datasetId: string,
    name: string,
    text: string,
    indexingTechnique?: 'high_quality' | 'economy',
    processRule?: ProcessRule,
  ) {
    return this.difyClient.createDocumentByText({
      datasetId,
      name,
      text,
      indexingTechnique,
      processRule,
    });
  }

  async updateDocumentByText(
    datasetId: string,
    documentId: string,
    updateRequest: UpdateDocumentRequest,
  ) {
    return this.difyClient.updateDocumentByText({
      datasetId,
      documentId,
      updateRequest,
    });
  }

  async getDocumentIndexingStatus(datasetId: string, batch: string) {
    return this.difyClient.getDocumentIndexingStatus({ datasetId, batch });
  }

  async deleteDocument(datasetId: string, documentId: string) {
    return this.difyClient.deleteDocument({ datasetId, documentId });
  }

  async getDatasetDocuments(
    datasetId: string,
    keyword?: string,
    page?: string,
    limit?: string,
  ) {
    return this.difyClient.getDatasetDocuments({
      datasetId,
      keyword,
      page,
      limit,
    });
  }

  // Segment operations
  async addSegments(datasetId: string, documentId: string, segments: Segment[]) {
    return this.difyClient.addSegments({ datasetId, documentId, segments });
  }

  async queryDocumentSegments(
    datasetId: string,
    documentId: string,
    keyword?: string,
    status?: string,
  ) {
    return this.difyClient.queryDocumentSegments({
      datasetId,
      documentId,
      keyword,
      status,
    });
  }

  async deleteDocumentSegment(
    datasetId: string,
    documentId: string,
    segmentId: string,
  ) {
    return this.difyClient.deleteDocumentSegment({
      datasetId,
      documentId,
      segmentId,
    });
  }

  async updateDocumentSegment(
    datasetId: string,
    documentId: string,
    segmentId: string,
    segment: UpdateSegmentRequest,
  ) {
    return this.difyClient.updateDocumentSegment({
      datasetId,
      documentId,
      segmentId,
      segment,
    });
  }

  // Retrieve operation
  async retrieveFromDataset(datasetId: string, retrieveRequest: RetrieveRequest) {
    return this.difyClient.retrieveFromDataset({
      datasetId,
      retrieveRequest,
    });
  }
}

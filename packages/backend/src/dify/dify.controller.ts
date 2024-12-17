import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DifyService } from './dify.service';
import type {
  CreateDatasetRequest,
  ProcessRule,
  UpdateDocumentRequest,
  Segment,
  UpdateSegmentRequest,
  RetrieveRequest,
} from './types';

@Controller('dify')
export class DifyController {
  constructor(private readonly difyService: DifyService) {}

  // Dataset endpoints
  @Post('datasets')
  async createDataset(@Body() request: CreateDatasetRequest) {
    return this.difyService.createDataset(request);
  }

  @Get('datasets')
  async getDatasets(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.difyService.getDatasets(page, limit);
  }

  @Delete('datasets/:datasetId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteDataset(@Param('datasetId') datasetId: string) {
    return this.difyService.deleteDataset(datasetId);
  }

  // Document endpoints
  @Post('datasets/:datasetId/documents')
  async createDocument(
    @Param('datasetId') datasetId: string,
    @Body() body: {
      name: string;
      text: string;
      indexingTechnique?: 'high_quality' | 'economy';
      processRule?: ProcessRule;
    },
  ) {
    return this.difyService.createDocumentByText(
      datasetId,
      body.name,
      body.text,
      body.indexingTechnique,
      body.processRule,
    );
  }

  @Post('datasets/:datasetId/documents/:documentId')
  async updateDocument(
    @Param('datasetId') datasetId: string,
    @Param('documentId') documentId: string,
    @Body() updateRequest: UpdateDocumentRequest,
  ) {
    return this.difyService.updateDocumentByText(
      datasetId,
      documentId,
      updateRequest,
    );
  }

  @Get('datasets/:datasetId/documents')
  async getDocuments(
    @Param('datasetId') datasetId: string,
    @Query('keyword') keyword?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.difyService.getDatasetDocuments(datasetId, keyword, page, limit);
  }

  @Get('datasets/:datasetId/documents/:batch/status')
  async getDocumentStatus(
    @Param('datasetId') datasetId: string,
    @Param('batch') batch: string,
  ) {
    return this.difyService.getDocumentIndexingStatus(datasetId, batch);
  }

  @Delete('datasets/:datasetId/documents/:documentId')
  async deleteDocument(
    @Param('datasetId') datasetId: string,
    @Param('documentId') documentId: string,
  ) {
    return this.difyService.deleteDocument(datasetId, documentId);
  }

  // Segment endpoints
  @Post('datasets/:datasetId/documents/:documentId/segments')
  async addSegments(
    @Param('datasetId') datasetId: string,
    @Param('documentId') documentId: string,
    @Body('segments') segments: Segment[],
  ) {
    return this.difyService.addSegments(datasetId, documentId, segments);
  }

  @Get('datasets/:datasetId/documents/:documentId/segments')
  async querySegments(
    @Param('datasetId') datasetId: string,
    @Param('documentId') documentId: string,
    @Query('keyword') keyword?: string,
    @Query('status') status?: string,
  ) {
    return this.difyService.queryDocumentSegments(
      datasetId,
      documentId,
      keyword,
      status,
    );
  }

  @Delete('datasets/:datasetId/documents/:documentId/segments/:segmentId')
  async deleteSegment(
    @Param('datasetId') datasetId: string,
    @Param('documentId') documentId: string,
    @Param('segmentId') segmentId: string,
  ) {
    return this.difyService.deleteDocumentSegment(
      datasetId,
      documentId,
      segmentId,
    );
  }

  @Post('datasets/:datasetId/documents/:documentId/segments/:segmentId')
  async updateSegment(
    @Param('datasetId') datasetId: string,
    @Param('documentId') documentId: string,
    @Param('segmentId') segmentId: string,
    @Body('segment') segment: UpdateSegmentRequest,
  ) {
    return this.difyService.updateDocumentSegment(
      datasetId,
      documentId,
      segmentId,
      segment,
    );
  }

  // Retrieve endpoint
  @Post('datasets/:datasetId/retrieve')
  async retrieve(
    @Param('datasetId') datasetId: string,
    @Body() retrieveRequest: RetrieveRequest,
  ) {
    return this.difyService.retrieveFromDataset(datasetId, retrieveRequest);
  }
}

export type ProcessRule = {
  mode: 'automatic' | 'custom';
  rules?: {
    pre_processing_rules: {
      id: 'remove_extra_spaces' | 'remove_urls_emails';
      enabled: boolean;
    }[];
    segmentation: {
      separator: string;
      max_tokens: number;
    };
  };
};

export type DocumentResponse = {
  document: {
    id: string;
    position: number;
    data_source_type: string;
    data_source_info: {
      upload_file_id: string;
    };
    dataset_process_rule_id: string;
    name: string;
    created_from: string;
    created_by: string;
    created_at: number;
    tokens: number;
    indexing_status: string;
    error: string | null;
    enabled: boolean;
    disabled_at: number | null;
    disabled_by: string | null;
    archived: boolean;
    display_status: string;
    word_count: number;
    hit_count: number;
    doc_form: string;
  };
  batch: string;
};

export type CreateDatasetRequest = {
  name: string;
  description?: string;
  indexing_technique?: 'high_quality' | 'economy';
  permission?: 'only_me' | 'all_team_members' | 'partial_members';
  provider?: 'vendor' | 'external';
  external_knowledge_api_id?: string;
  external_knowledge_id?: string;
};

export type CreateDatasetResponse = {
  id: string;
  name: string;
  description: string | null;
  provider: string;
  permission: string;
  data_source_type: string | null;
  indexing_technique: string | null;
  app_count: number;
  document_count: number;
  word_count: number;
  created_by: string;
  created_at: number;
  updated_by: string;
  updated_at: number;
  embedding_model: string | null;
  embedding_model_provider: string | null;
  embedding_available: boolean | null;
};

export type DatasetInfo = {
  id: string;
  name: string;
  description: string;
  permission: string;
  data_source_type: string;
  indexing_technique: string;
  app_count: number;
  document_count: number;
  word_count: number;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
};

export type GetDatasetsResponse = {
  data: DatasetInfo[];
  has_more: boolean;
  limit: number;
  total: number;
  page: number;
};

export type UpdateSegmentRequest = {
  content: string;
  answer?: string;
  keywords?: string[];
  enabled?: boolean;
};

export type UpdateDocumentRequest = {
  name?: string;
  text?: string;
  process_rule?: ProcessRule;
};

export type IndexingStatusResponse = {
  data: {
    id: string;
    indexing_status: string;
    processing_started_at: number;
    parsing_completed_at: number;
    cleaning_completed_at: number;
    splitting_completed_at: number;
    completed_at: number | null;
    paused_at: number | null;
    error: string | null;
    stopped_at: number | null;
    completed_segments: number;
    total_segments: number;
  }[];
};

export type DeleteDocumentResponse = {
  result: string;
};

export type DocumentInfo = {
  id: string;
  position: number;
  data_source_type: string;
  data_source_info: any | null;
  dataset_process_rule_id: string | null;
  name: string;
  created_from: string;
  created_by: string;
  created_at: number;
  tokens: number;
  indexing_status: string;
  error: string | null;
  enabled: boolean;
  disabled_at: number | null;
  disabled_by: string | null;
  archived: boolean;
};

export type GetDocumentsResponse = {
  data: DocumentInfo[];
  has_more: boolean;
  limit: number;
  total: number;
  page: number;
};

export type Segment = {
  content: string;
  answer?: string;
  keywords?: string[];
};

export type SegmentResponse = {
  id: string;
  position: number;
  document_id: string;
  content: string;
  answer: string;
  word_count: number;
  tokens: number;
  keywords: string[];
  index_node_id: string;
  index_node_hash: string;
  hit_count: number;
  enabled: boolean;
  disabled_at: number | null;
  disabled_by: string | null;
  status: string;
  created_by: string;
  created_at: number;
  indexing_at: number;
  completed_at: number;
  error: string | null;
  stopped_at: number | null;
};

export type AddSegmentResponse = {
  data: SegmentResponse[];
  doc_form: string;
};

export type QuerySegmentResponse = {
  data: SegmentResponse[];
  doc_form: string;
};

export type DeleteSegmentResponse = {
  result: string;
};

export type RetrievalModel = {
  search_method: 'keyword_search' | 'semantic_search' | 'full_text_search' | 'hybrid_search';
  reranking_enable?: boolean;
  reranking_mode?: {
    reranking_provider_name: string;
    reranking_model_name: string;
  };
  weights?: number;
  top_k?: number;
  score_threshold_enabled?: boolean;
  score_threshold?: number;
};

export type RetrieveRequest = {
  query: string;
  retrieval_model?: RetrievalModel;
  // external_retrieval_model?: object; // 未启用字段，可视需求实现
};
export type RetrieveResponse = {
  query: {
    content: string;
  };
  records: {
    segment: {
      id: string;
      position: number;
      document_id: string;
      content: string;
      answer: string | null;
      word_count: number;
      tokens: number;
      keywords: string[];
      index_node_id: string;
      index_node_hash: string;
      hit_count: number;
      enabled: boolean;
      disabled_at: number | null;
      disabled_by: string | null;
      status: string;
      created_by: string;
      created_at: number;
      indexing_at: number;
      completed_at: number;
      error: string | null;
      stopped_at: number | null;
      document: {
        id: string;
        data_source_type: string;
        name: string;
        doc_type: string | null;
      };
    };
    score: number;
    tsne_position: any | null;
  }[];
};
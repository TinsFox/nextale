/**
 * 项目状态
 * - draft: 草稿
 * - published: 已发布
 * - archived: 已归档
 */
export const PROJECT_STATUS = [
  'draft',
  'published',
  'archived',
  'under_review',
] as const;

export type ProjectStatus = (typeof PROJECT_STATUS)[number];

export const ProjectStatusEnum = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
  UNDER_REVIEW: 'under_review',
} as const;

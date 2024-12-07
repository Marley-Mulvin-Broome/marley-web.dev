export * from './propTypes'
export * from './article'

export type SearchIndexItemType = 'article' | 'page' | 'game' | 'folder';

export interface SearchIndexItem {
  href: string;
  title: string;
  content: string;
  type: SearchIndexItemType;
}
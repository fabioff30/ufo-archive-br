export type SearchRecord = {
  id: string;
  title: string;
  agency: string;
  type: string;
  release_date: string;
  incident_date: string;
  incident_location: string;
  blurb: string;
  blurb_pt?: string;
  year: number | null;
  decade: string | null;
  has_thumb: boolean;
  has_video: boolean;
  has_text: boolean;
  has_translation?: boolean;
  redacted: boolean;
  dossiers: string[];
};

export type IndexMeta = {
  total: number;
  agencies: { value: string; count: number }[];
  types: { value: string; count: number }[];
  decades: { value: string; count: number }[];
  dossiers: { slug: string; title: string; count: number }[];
  media: { with_thumb: number; with_video: number; with_text: number };
};

export type SimilarRef = {
  id: string;
  title: string;
  type?: string;
  score?: number;
};

export type FullRecord = {
  id: string;
  title: string;
  agency: string;
  type: string;
  release_date: string;
  incident_date: string;
  incident_location: string;
  blurb: string;
  blurb_pt?: string;
  source_url: string;
  thumbnail_local: string;
  thumb_small: string;
  video_local: string;
  dvids_video_id: string;
  text: string;
  text_pt?: string;
  similar_text: SimilarRef[];
  similar_image: SimilarRef[];
  extracted_images: string[];
  dossiers: string[];
  redacted: boolean;
  year: number | null;
  decade: string | null;
};

export type DossierMap = Record<
  string,
  { title: string; blurb: string; recordIds: string[] }
>;

export type PostData = {
  title: string;
  selftext: string;
  author: string;
  url: string;
  created: number;
};

export type Post = {
  kind: 'Listing';
  data: PostData;
};

type ListingData = {
  after: string;
  dist: number;
  modhash: string;
  geo_filter: string | null;
  children: Array<Post>;
  before: string | null;
};

export type Listing = {
  kind: 'Listing';
  data: ListingData;
};

export type Topic = {
  id: string;
  label: string;
};

export type MainStore = {
  topic: string | null;
  topics: Array<Topic>;
};

export type Creative = {
  id: string;
  content?: string;
  contributors: Array<Contributor>;
  description?: string;
  enabled: boolean;
  formats: Array<Format>;
  lastModified: Date;
  title: string;
};

export type Contributor = {
  id: string;
  firstName: string;
  lastName: string;
};

export type Format = {
  width: number;
  height: number;
};

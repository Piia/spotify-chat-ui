export type AlbumImage = {
    url: string;
};

export type Album = {
    images: AlbumImage[];
};

export type Artist = {
    name: string;
};

export type Track = {
    id: string;
    uri: string;
    name: string;
    album: Album;
    artist: Artist;
};

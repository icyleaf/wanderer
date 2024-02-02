import { array, number, object, string } from "yup";
import type { Category } from "./category";
import type { SummitLog } from "./summit_log";
import type { Waypoint } from "./waypoint";

class Trail {
    id?: string;
    name: string;
    location?: string;
    public: boolean;
    distance?: number;
    elevation_gain?: number;
    duration?: number;
    thumbnail?: string;
    photos: string[];
    gpx?: string;
    expand: {
        category?: Category;
        waypoints: Waypoint[]
        summit_logs: SummitLog[]
        gpx_data?: string
    }
    tags?: string[];
    description?: string;

    _photoFiles: File[]

    constructor(name: string,
        params?: {
            id?: string,
            location?: string,
            public?: boolean,
            distance?: number,
            elevation_gain?: number,
            duration?: number,
            thumbnail?: string,
            photos?: string[],
            gpx?: string,
            category?: Category,
            waypoints?: Waypoint[],
            summit_logs?: SummitLog[],
            tags?: string[],
            description?: string
        }

    ) {
        this.id = params?.id;
        this.name = name;
        this.location = params?.location;
        this.public = params?.public ?? false
        this.distance = params?.distance;
        this.elevation_gain = params?.elevation_gain;
        this.duration = params?.duration;
        this.thumbnail = params?.thumbnail;
        this.photos = params?.photos ?? [];
        this.gpx = params?.gpx;
        this.expand = {
            category: params?.category,
            waypoints: params?.waypoints ?? [],
            summit_logs: params?.summit_logs ?? []
        }
        this.tags = params?.tags ?? []
        this.description = params?.description ?? "";
        this._photoFiles = [];
    }
}

const trailSchema = object<SummitLog>({
    id: string().optional(),
    name: string().required("Required"),
    location: string().optional(),
    distance: number().optional(),
    elevation_gain: number().optional(),
    duration: number().optional(),
    thumbnail: string().optional(),
    photos: array(string()).optional(),
    gpx: string().optional(),
    description: string().optional()
});

export { Trail, trailSchema };

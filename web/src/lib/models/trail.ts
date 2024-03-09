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
    lat?: number;
    lon?: number;
    thumbnail: number;
    photos: string[];
    gpx?: string;
    created?: string;
    category?: string;
    waypoints: string[];
    summit_logs: string[];
    expand: {
        category?: Category;
        waypoints: Waypoint[]
        summit_logs: SummitLog[]
        gpx_data?: string
    }
    tags?: string[];
    description?: string;
    author?: string;

    constructor(name: string,
        params?: {
            id?: string,
            location?: string,
            public?: boolean,
            distance?: number,
            elevation_gain?: number,
            duration?: number,
            lat?:number,
            lon?: number,
            thumbnail?: number,
            photos?: string[],
            gpx?: string,
            category?: Category,
            waypoints?: Waypoint[],
            summit_logs?: SummitLog[],
            tags?: string[],
            description?: string
            created?: string
        }

    ) {
        this.id = params?.id;
        this.name = name;
        this.location = params?.location;
        this.public = params?.public ?? false
        this.distance = params?.distance;
        this.elevation_gain = params?.elevation_gain;
        this.duration = params?.duration;
        this.lat = params?.lat;
        this.lon = params?.lon;
        this.thumbnail = params?.thumbnail ?? 0;
        this.photos = params?.photos ?? [];
        this.waypoints =  [];
        this.summit_logs = [];
        this.gpx = params?.gpx;
        this.expand = {
            category: params?.category,
            waypoints: params?.waypoints ?? [],
            summit_logs: params?.summit_logs ?? []
        }
        this.tags = params?.tags ?? []
        this.description = params?.description ?? "";
        this.created = params?.created;
    }
}

const trailSchema = object<Trail>({
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

interface TrailFilter {
    q: string,
    category: string[],
    near: {
        lat?: number,
        lon?: number,
        radius: number
    }
    distanceMin: number,
    distanceMax: number,
    elevationGainMin: number;
    elevationGainMax: number;
    completed?: boolean;
    sort: "name" | "distance" | "elevation_gain" | "created";
    sortOrder: "+" | "-" 
}

export { Trail, trailSchema };    

export type { TrailFilter };


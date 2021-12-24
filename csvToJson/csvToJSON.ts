import { Feature, FeatureCollection } from "./geoJSONTypes";
import {elementType, elementProps} from "./types";

/*
Converts a CSV string to a GeoJSON FeatureCollection
Written by Magnus Jackson on 24-12-2021
*/

// class containing the properties of a feature
export class Element {
    
    props: elementProps

    constructor(props: elementType) {
        this.props = {
            Site: <string>props[0],
            SiteNumber: <number>props[1],
            Seconds: <number>props[2],
            DateTime: <string>props[3],
            Latitude: <number>props[4],
            Longitude: <number>props[5],
            Hsig: <number>props[6],
            Hmax: <number>props[7],
            Tp: <number>props[8],
            Tz: <number>props[9],
            SST: <number>props[10],
            Direction: <number>props[11],
            Current_Speed: <number>props[12],
            Current_Direction: <number>props[13]
        };
    }

    createFeature(): Feature {
        return {
            type: "Feature",
            geometry: {type: "Point", coordinates: [this.props.Latitude, this.props.Longitude]},
            properties: {
                "site": this.props.Site,
                "SiteNumber": this.props.SiteNumber,
                "Seconds": this.props.Seconds,
                "DateTime": this.props.DateTime,
                "Hsig": this.props.Hsig,
                "Hmax": this.props.Hmax,
                "Tp": this.props.Tp,
                "Tz": this.props.Tz,
                "SST": this.props.SST,
                "Direction": this.props.Direction,
                "Current_Speed": this.props.Current_Speed,
                "Current_Direction": this.props.Current_Direction
            }
        }
    }
}

// spits the data into an array of lines
function splitData(data:string): string[] {
    return data.split("\n");
}

// splits the lines into an array of elements
function removeFromIndex(array: any[], index: number) {
    array.splice(index, 1);
}

// generates a feature collection from the csv
export function generateFeatureCollectionShel(data: string): FeatureCollection {
    let features: Feature[] = [];

    let lines = splitData(data);

    removeFromIndex(lines, 0);
    removeFromIndex(lines, 1);
    
    for (let i = 1; i < lines.length; i++) {
        let props: elementType = lines[i].split(",");
        let element = new Element(props);
        features.push(element.createFeature());
    }

    return {
        type: "FeatureCollection",
        features: features
    }
}

// returns the data as a FeatureCollection
export function csvToJSON(csv: string): FeatureCollection {
    return generateFeatureCollectionShel(csv);
}

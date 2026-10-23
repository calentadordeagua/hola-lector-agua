
import { volumes as year1Volumes, shortStories as year1ShortStories } from "@/data/year1";
import { volumes as year2Volumes, shortStories as year2ShortStories } from "@/data/year2";
import { volumes as year3Volumes, shortStories as year3ShortStories } from "@/data/year3";

export const allVolumes = [
    ...year1Volumes,
    ...year2Volumes,
    ...year3Volumes,
    ...year1ShortStories,
    ...year2ShortStories,
    ...year3ShortStories
];

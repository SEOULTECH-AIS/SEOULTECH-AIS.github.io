import { Project } from '../types/Project';
import { ongoingProjects } from './projects/ongoing';
import { completedGovProjects } from './projects/completed_gov';
import { completedIndustryProjects } from './projects/completed_industry';

export const projectsData: Project[] = [
    ...ongoingProjects,
    ...completedGovProjects,
    ...completedIndustryProjects
];

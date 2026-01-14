import React from 'react';
import researchDataJson from '@/data/research.json';
import { ResearchTopic } from '@/types/Research';
import homeData from '@/data/home.json';
import HomeView from '@/pages/Home/HomeView';
import { HomeContent } from '@/types/Home';

const researchData = researchDataJson as ResearchTopic[];
const content = homeData as unknown as HomeContent;

const HomeContainer = () => {
    // Filter research data to exclude equipment. The limit is removed.
    const displayResearch = researchData
        .filter(item => item.title !== 'Research Equipment');

    return (
        <HomeView
            researchItems={displayResearch}
            content={content}
        />
    );
};

export default HomeContainer;
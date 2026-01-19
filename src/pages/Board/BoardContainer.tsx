import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import boardData from '@/data/board.json';
import equipmentData from '@/data/equipment.json';
import { BoardItem } from '@/types/Board';
import { Description } from '@/types/Base';
import BoardView from './BoardView';

const BoardContainer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'NEWS' | 'EQUIPMENT'>('NEWS');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const area = params.get('area');
        if (area === 'equipment') setActiveTab('EQUIPMENT');
        else if (area === 'news') setActiveTab('NEWS');
        else setActiveTab('NEWS');
    }, [location]);

    const handleTabChange = (id: 'NEWS' | 'EQUIPMENT') => {
        setActiveTab(id);
        navigate(`?area=${id.toLowerCase()}`);
    };

    return (
        <BoardView
            data={boardData as BoardItem[]}
            equipmentData={equipmentData as Description[]}
            activeTab={activeTab}
            onTabChange={handleTabChange}
        />
    );
};

export default BoardContainer;
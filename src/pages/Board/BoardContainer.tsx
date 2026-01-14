import React from 'react';
import boardData from '@/data/board.json';
import equipmentData from '@/data/equipment.json';
import { BoardItem } from '@/types/Board';
import { Description } from '@/types/Base';
import BoardView from './BoardView';

const BoardContainer = () => {
    return (
        <BoardView
            data={boardData as BoardItem[]}
            equipmentData={equipmentData as Description[]}
        />
    );
};

export default BoardContainer;
import { FC } from 'react';
import Chip from '@mui/material/Chip';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hook/redux';
import { ITag } from '../models/ITag';

export const TagChip: FC<{ tag: ITag }> = ({ tag }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
        // dispatch(setSearchTags([tag]))
    };
    return (
        <Box mx={0.5}>
            <Chip label={tag.name} size='small' onClick={handleClick} />
        </Box>
    );
};
import { Box, Typography, useTheme, Button } from '@mui/material';
import { shades } from '../theme';
import { useLocation, useNavigate } from 'react-router-dom';
import { IItemProps } from '../models/IItem';
import { ThemeChip } from './Common/ThemeChip';
import { useAppSelector } from '../hook/redux';
import { ICollection } from '../models/ICollection';

const Item: React.FC<IItemProps> = ({ item, width }: IItemProps) => {
    const navigate = useNavigate();
    const { collections } = useAppSelector((state) => state.collections);
    const { pathname } = useLocation();
    const currentItemCollection: ICollection | undefined = collections.find(
        (c) => Number(c.id) === Number(item.collectionId)
    );
    const themeId = currentItemCollection?.themeId;

    const {
        palette: { neutral },
    } = useTheme();
    const { name, image, id, collectionId } = item;

    return (
        <Box width={width}>
            <Box position='relative' onClick={() => navigate(`/items/${id}`)}>
                <img
                    alt={item.name}
                    width='300px'
                    height='400px'
                    src={image}
                    style={{ cursor: 'pointer', borderRadius: '5px' }}
                />
                <Box
                    position='absolute'
                    bottom='5%'
                    left='0'
                    width='100%'
                    height='90%'
                    padding='0 5%'>
                    <Box
                        display='flex'
                        flexDirection='column'
                        justifyContent='space-between'
                        height='100%'>
                        <Box display='flex'>
                            {pathname === '/' && (
                                <ThemeChip
                                    themeId={Number(themeId)}
                                    color='default'
                                    backgroundColor='white'
                                    border='none'
                                />
                            )}
                        </Box>

                        <Box display='flex' justifyContent='space-between'>
                            <Box
                                display='flex'
                                alignItems='center'
                                borderRadius='3px'
                                // sx={{ backgroundColor: shades.neutral[100] }}
                            >
                                <Typography color='white'>
                                    {item.name}
                                </Typography>
                            </Box>
                            {pathname === '/' && (
                                <Button
                                    onClick={() => navigate(`/items/${id}`)}
                                    sx={{
                                        backgroundColor: shades.primary[100],
                                        color: shades.secondary[800],
                                    }}>
                                    GO
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Item;

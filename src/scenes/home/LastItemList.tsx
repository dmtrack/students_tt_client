import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook/redux';
import { Box, Typography, Tab, Tabs, useMediaQuery } from '@mui/material';
import Item from '../../components/Item';
import {
    fetchItems,
    fetchTopRatedItems,
} from '../../state/actions/items.actions';
import { IItem } from '../../models/IItem';
import Loader from '../../utils/loader';

const LastItemList = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.items.items);
    const topRated = useAppSelector((state) => state.items.topRated);
    const topRatedFlat = topRated?.map((element) => {
        return {
            id: element.id,
            count: element.count,
            image: element.item?.image,
            name: element.item?.name,
            created: element.item?.created,
        };
    });
    // const mostCommented = items.slice(items.length - 3, items.length);

    const itemsLoading = useAppSelector((state) => state.items.itemsLoading);

    const [value, setValue] = useState('newItems');
    const isNonMobile = useMediaQuery('(min-width:600px)');
    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    useEffect(() => {
        dispatch(fetchItems());
        dispatch(fetchTopRatedItems());
    }, []);
    console.log(itemsLoading, 'itemsLoading');
    return (
        <>
            {items && topRatedFlat ? (
                <Box width='90%' margin='80px auto'>
                    <Typography variant='h5' textAlign='center'>
                        discover items
                    </Typography>
                    <Tabs
                        textColor='primary'
                        indicatorColor='primary'
                        value={value}
                        onChange={handleChange}
                        centered
                        TabIndicatorProps={{
                            sx: { display: isNonMobile ? 'block' : 'none' },
                        }}
                        sx={{
                            mb: '25px',
                            '& .MuiTabs-flexContainer': { flexWrap: 'wrap' },
                        }}>
                        <Tab label='NEW' value='newItems' />
                        <Tab label='TOP RATED' value='topRated' />
                        <Tab label='MOST COMMENTED' value='mostCommented' />
                    </Tabs>
                    <Box
                        margin='0 auto'
                        display='grid'
                        gridTemplateColumns='repeat(auto-fill, 300px)'
                        justifyContent='space-around'
                        rowGap='20px'
                        columnGap='1.33%'>
                        {value === 'newItems' &&
                            items.map((item: IItem) => (
                                <Item item={item} key={Number(item.created)} />
                            ))}
                        {value === 'topRated' &&
                            topRatedFlat.map((item: IItem) => (
                                <Item item={item} key={Number(item.created)} />
                            ))}
                        {value === 'mostCommented' &&
                            items.map((item: IItem) => (
                                <Item item={item} key={Number(item.created)} />
                            ))}
                    </Box>
                </Box>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default LastItemList;

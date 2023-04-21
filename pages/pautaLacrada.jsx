import { useState } from 'react';
import { Card, CardContent, Button, IconButton } from '@mui/material';
import TableRowsIcon from '@mui/icons-material/TableRows';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import GridViewIcon from '@mui/icons-material/GridView';
import OverviewCard from '../component/overview/overviewCard';
import OverviewTable from '../component/overview/overviewTable';
import { render } from 'react-dom';



export default function PautaLacrada() {




    //useState do React
    const [isCardVisible, setIsCardVisible] = useState(true);

    // Função que altera o estado de visibilidade do card
    const toggleCardVisibility = () => {
        if (isCardVisible) {
        setIsCardVisible(false);
        } else {
        setIsCardVisible(true);
        }
    };

    return (
        <div>  
            <Stack className='iconButton' direction="row" spacing={1} >
                <div>
                <IconButton aria-label="table" onClick={toggleCardVisibility} variant="contained">
                    <TableRowsIcon />{isCardVisible ? false : true}
                </IconButton>
                {isCardVisible ? null : (
                   
                    <OverviewCard />

                )}
                </div>
                <div>
                <IconButton aria-label="grid" onClick={toggleCardVisibility} variant="contained">
                    <GridViewIcon />{isCardVisible ? true : false}
                </IconButton>
                {!isCardVisible ? null :  (
                   
                    <OverviewTable />
                )}
                </div>
            </Stack>
      </div>
    );
}




  



 
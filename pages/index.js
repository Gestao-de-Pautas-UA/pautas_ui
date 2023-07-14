import { Theme, ThemeProvider } from "@uaveiro/ui";
import * as React from 'react';
import '@/styles/styles.css';
import { useState } from "react";
import axios from 'axios';
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

import { Input } from "@uaveiro/ui";  
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router';


// const useStyles = makeStyles({
//   uaButtonHome: {
//     borderRadius: 1,  
//     backgroundColor: 'white', 
//     color: 'black', 
//     borderColor: 'black', 
//     fontSize: '14px',
//     padding: '0px 12px 0px 12px',
//     height: 'auto',
//     minHeight: '40px',
//     maxWidth: '140px',
//     textTransform: 'capitalize',
//     justifyContent: 'center',
//     fontWeight: '400',
//     '&:hover': {
//       background: '#0EB4BD',
//       color: '#FFFFFF',
//     },
//   },
// });



export default function Home() {

  const [invalidProfId, setInvalidProfId] = useState(false);

  const {t} = useTranslation();

  const classes = useStyles();

  const [profId, setProfId] = useState('');

  const router = useRouter();

  const goToPautas = async () => {

    try {
      const url = process.env.API_URL + '/pautas/' + profId;
      const response = await axios.get(url);
      if (response.status === 200) {
        setInvalidProfId(false);
        router.push(`/${profId}`);
      }
      
    } catch (error) {
      setInvalidProfId(true);
      console.log(error);
    }

  }

  return (

    <ThemeProvider theme={Theme}>
    <div>
      <h2 className="tituloPautas">{t("bemvindo")}</h2>
      <p className="subtituloPautas">{t("insiracodigo")}</p>
      <div style={{marginLeft: '50px', marginTop: '50px', display: 'flex'}}>
        <Input 
          border={`1px solid ${invalidProfId ? 'red' : '#424242'}`}
          width="100px" 
          height="40px"
          color="#424242" 
          id="profId"
          defultValue={profId}
          type="number"
          onChange={(e) => setProfId(e.target.value)}
          />
          <Button variant="outlined" 
            className={classes.uaButton2} 
            onClick={goToPautas} 
            style={{ marginLeft: "5rem"}}>
            {t("prosseguir")}
          </Button> 
      </div>
      <div style={{marginLeft: '50px', fontSize: '0.8rem'}}>
        {invalidProfId && <p style={{color: 'red'}}>
          {t("codigoinvalido")}
        </p>}
      </div>
    </div>
    </ThemeProvider>
  );
}

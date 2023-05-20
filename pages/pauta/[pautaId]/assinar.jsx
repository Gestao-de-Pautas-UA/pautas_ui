import { useRouter } from 'next/router';
import { Theme, ThemeProvider, TableLoading } from "@uaveiro/ui";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Link from 'next/link'
import { useState, useEffect, forwardRef } from 'react';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle  } from '@mui/material';
import Slide from '@mui/material/Slide';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';




const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles({
  uaButton: {
    /* define your custom styles here */
    borderRadius: 1,  
    backgroundColor: 'white', 
    color: 'black', 
    borderColor: 'black', 
    fontSize: '14px',
    padding: '0px 12px 0px 12px',
    height: 'auto',
    minHeight: '40px',
    maxWidth: '140px',
    textTransform: 'capitalize',
    justifyContent: 'center',
    fontWeight: '400',
    '&:hover': {
      background: '#0EB4BD',
      color: '#FFFFFF',
    },
  },
  uaCard: {
    border: '0px solid',
    borderRadius: '1px',
  }
});

export default function Assinar() {
  
  
  const {t} = useTranslation();
  
  
  const classes = useStyles();

  const router = useRouter();
  const { pautaId } = router.query; // retrieve the "pautaId" from the URL

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!pautaId) {
        return;
      }
      try {
      const path = `/pauta/${pautaId}`;
      const url = process.env.API_URL + path;
      const response = await axios.get(url);
      setData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();
}, [pautaId]);


  const [openSignDialog, setOpenSignDialog] = useState(false);

  const handleCloseSignDialog = () => {
    setOpenSignDialog(false);
  };


  const [signedPdfHashResponse, setSignedPdfHashResponse] = useState('');

  const [openPluginErrorDialog, setOpenPluginErrorDialog] = useState(false);

  const handleClosePluginErrorDialog = () => {
    setOpenPluginErrorDialog(false);
  };

  const handlePlugin = async () => {
    try {
      
      const path = "http://localhost:3005/";
      
      let response1;
      try { 
        response1 = await axios.get(path);
      } catch (error) {
        console.error(error);
        setOpenPluginErrorDialog(true);
        console.log(openPluginErrorDialog)
        return;
      }

      const response2 = await axios.get(`http://20.123.119.238/pautasBack/pdf/estudantes/${pautaId}`, {
        responseType: 'arraybuffer'
      });
      console.log(response2.data)


      const formData = new FormData();
      const blob = new Blob([response2.data], { type: 'application/pdf' });

      formData.append('file', blob);

      const response3 = await axios.post("http://localhost:3005/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });      
      console.log(response3)

      setSignedPdfHashResponse(response3.data);

      
      setOpenSignDialog(true);
      
      
    } catch (error) {
      console.error(error);
      
    }
    
  };


  const handleGetAndOpenSigned = async () => {
    setOpenSignDialog(false);
    // Fazer se o usuário clicou no botão de Já assinei
    axios.get("http://localhost:3005/get/" + signedPdfHashResponse, {responseType: 'arraybuffer'})
      .then(response => {
        if (response.status === 200) {
          console.log('Valid response received');
          // Do something with the response
          axios.post(process.env.API_URL + "/set/pautaEstado/", 
          {
            "codigoPauta": pautaId,
            "estado": "ASSINADA"
          }
          ).catch(error => {
            console.error('Error @ change pauta estado to assinada', error);
          });
          const file = new Blob([response.data], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          const windowReturn = window.open(fileURL);


        } else {
          console.log('Invalid response received:', response.data);

        }
      })
      .catch(error => {
        console.error('Error occurred:', error);

      });
  }


    if (!data) {
    return <ThemeProvider theme={Theme}>
            <div class="pautas-page-container">
              <div style={{ marginBottom: '20px'}}>
                <Link href="/">
                <Typography className="text-link" sx={{ display: 'inline-block'}}>
                  lista de Pautas
                </Typography>
                </Link>
                <Typography className="text-link" sx={{ display: 'inline-block', marginLeft: '5px'}} >
                  &gt;
                </Typography>
                <Typography sx={{ display: 'inline-block', marginLeft:'9px', fontWeight: '600'}}>
                  Pauta
                </Typography>
              </div>         
              <TableLoading />
            </div>
          </ThemeProvider>;
  }

  return (
    <div class="pauta-page-container">
      <ThemeProvider theme={Theme}>
      <div style={{ marginBottom: '20px'}}>
        <Link href="/">
            <Typography className="text-link" sx={{ display: 'inline-block'}}>
             {t("lista")}
            </Typography>
        </Link>
            <Typography className="text-link" sx={{ display: 'inline-block', marginLeft: '5px'}} >
                &gt;
            </Typography>
        <Link href={`/pauta/${pautaId}`}>
            <Typography className="text-link" sx={{ display: 'inline-block', marginLeft:'9px'}}>
                {t("pautamin")}
            </Typography>
        </Link>
        <Typography className="text-link" sx={{ display: 'inline-block', marginLeft: '5px'}} >
          &gt;
        </Typography>
        <Typography sx={{ display: 'inline-block', marginLeft:'9px', fontWeight: '600'}}>
                {t("assinar")}
        </Typography>
      </div>
      <div>         
          <div style={{ display: 'flex'}}>
            <Typography sx={{fontSize: '1.75rem' ,fontWeight: '600', lineHeight: '1.5', marginRight: '10px'}}
            >{data.disciplinaResponse.nome}
            </Typography>
            <Typography sx={{fontWeight: '400', lineHeight: '1.5', color: '#757575', paddingTop: '12.5px', marginRight: '8px'}}
            >{data.disciplinaResponse.codigo}
            </Typography>
            <Typography sx={{fontWeight: '400', lineHeight: '1.5', color: '#757575', paddingTop: '12.5px'}}
            >{data.tipoExame}
            </Typography>
          </div>
          <div style={{marginBottom: '35px'}} >
            <Typography sx={{fontWeight: '400', lineHeight: '1.5', color: '#757575', fontSize: '20px', }}
            >{data.anoLectivo}
            </Typography>
          </div>
        </div>
        <Grid container spacing={0}>
          <Grid item sm={6}>
            <div style={{display:'flex', justifyContent:'center', paddingLeft:'80px'}}>  
              <Card sx={{ maxWidth: 345 }} className={classes.uaCard}> 
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="/autenticacaogovIcon.png"
                    alt="autenticacaogovIcon"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
                      {t("assinarpauta")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t("texto1")}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions sx={{justifyContent: 'center'}} >
                  <Button 
                    variant="outlined" 
                    className={classes.uaButton}
                    onClick={handlePlugin}>
                    {t("assinar")}
                  </Button>
                </CardActions>
              </Card>
            </div>
          </Grid>

          <Grid item sm={6}>
            <div style={{display:'flex', justifyContent:'center', paddingRight:'100px'}}> 
            <Card sx={{ maxWidth: 345 }}  className={classes.uaCard}> 
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="/laterIcon.png"
                    alt="autenticacaogovIcon"
                    sx={{objectFit: 'contain'}}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
                      {t("assinartarde")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t("texto2")}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions sx={{justifyContent: 'center'}} >
                  <Link href={`/`}>
                    <Button variant="outlined" className={classes.uaButton}>
                      {t("listaM")}
                    </Button>
                  </Link>
                </CardActions>
              </Card>
              
            </div>
          </Grid>

        </Grid>
        
        {/* Sign dialog */}
        <div>
          <Dialog
          open={openSignDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseSignDialog}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            {"Use a aplicação Autenticação.gov para assinar a pauta    "}
              <Image
                src="/share-leave-icon.jpg"
                width={20}
                height={20}
                onClick={handlePlugin}
              />

          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {t("texto3")}
            </DialogContentText>
            <div style={{marginTop: '1rem'}}>
              <img
                style={{ maxWidth: "100%", maxHeight: "calc(100vh - 64px)" }}
                src="/autenticacaoGovPrint.png"
                alt={t("demonstra")}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseSignDialog}
                variant="outlined" 
                className={classes.uaButton}
                sx={{marginRight: '10px'}}
                >{t("cancelar")}</Button>
            <Button onClick={handleGetAndOpenSigned}
                    variant="outlined" 
                    className={classes.uaButton}
                    sx={{marginRight: '10px'}}
                    >{t("jaassinei")}</Button>
          </DialogActions>
          </Dialog>
        </div>


        {/* Plugin error dialog */}
        <div>
          <Dialog
          open={openPluginErrorDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClosePluginErrorDialog}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            {t("texto4")}

          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {t("texto5")}
            </DialogContentText>
            <div style={{marginTop: '1.2rem'}}>
              <img
                style={{ maxWidth: "60%", maxHeight: "calc(100vh - 64px)", marginLeft: '10rem' }}
                src="/pluginRunningPrint.png"
                alt="Demonstração de plugin a rodar"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePluginErrorDialog}
                variant="outlined" 
                className={classes.uaButton}
                sx={{marginRight: '10px'}}
                >Ok</Button>
          </DialogActions>
          </Dialog>
        </div>
      </ThemeProvider>
    </div>
    
  );
};
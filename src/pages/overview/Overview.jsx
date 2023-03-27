import "./overview.css"
import {
    ThemeProvider,
    Theme,
    ContentContainer,
    Table,
    Indent,
    Breadcrumbs 
  } from "@uaveiro/ui";
import MyDropdown from "../../components/dropdown/dropdown";


//import './data.txt'
export default function Overview() {

  const ButtonStyle = ({ type, text }) => {
    return <button className={"widgetLgButton " + type}>{text}</button>;
  };

  return (
    <ThemeProvider theme={Theme}>
      {/* Em que formato esta o data? */}
      {/* <ContentContainer height="135px">
        <Breadcrumbs {...data} /> 
      </ContentContainer> */}
      <div style={{ display: 'flex' }}>
        {/* <div style={{width: '100%'}}>
        <h2>Gestão de Pautas</h2>
        </div>
        <div>
        <div>
          <p><MyDropdown/> </p>
          
        </div>
        <div>
          <p>List/Card:</p>
          
        </div>
        </div> */}
      </div>
      

      <ContentContainer backgroundColor="#F5F5F5" padding="20px">
        <Table marginTop="0">
          {/* <caption>Gestão de Pautas</caption> */}
          <thead>
            <tr>
              <th>Disciplinas</th>
              <th>Época de Exame</th>
              <th>N_Pauta</th>
              <th>Estado</th>
              <th>Editar</th>
              <th>Detalhes</th>
              
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Indent>Introdução a Engenharia de software</Indent>
              </td>
              <td>Normal</td>
              <td>123NM</td>
              <td>
                <ButtonStyle className="widgetLgButton" type="Declined" text="Por preecher"  />
               
              </td>
              <td>
                {/* <Link href="/">Editar</Link> */}
                
                <button>Editar</button>
                
              </td>
              <td>
                <button>Detalhes</button>
              </td>

            </tr>
            <tr>
              <td>
                <Indent>Projecto em Informatica</Indent>
              </td>
              <td>Normal</td>
              <td>456NM</td>

              <td>
                <ButtonStyle className="widgetLgButton" type="Pending" text="Assinada"  />
              </td>
              <td>
                <button>Editar</button>
              </td>
              <td>
                <button>Detalhes</button>
              </td>
            </tr>
            <tr>
              <td>
                <Indent>Compiladores</Indent>
              </td>
              <td>Recurso</td>
              <td>789NM</td>

              <td>
                <ButtonStyle className="widgetLgButton" type="Approved" text= "Preechida"  />
              </td>
              <td>
                <button>Assinar</button>
              </td>
              <td>
                <button>Detalhes</button>
              </td>
            </tr>
          </tbody>
        </Table>
      </ContentContainer>

    </ThemeProvider>
  );
}

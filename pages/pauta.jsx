import { Table, Theme, ThemeProvider, Button } from "@uaveiro/ui";
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Input } from "@uaveiro/ui";  


export default function Pauta() {
  const pautaName = { "pautaNome": "Projecto em Informática" };

  const studentsData = [
      {
        "nmec": 11005,
        "nome": "Maria Paz Freire Remígio Frias",
        "regime": "T",
        "codigoCurso": "11415",
        "repetente": true
      },
      {
        "nmec": 11006,
        "nome": "Lisandro Barreno Aires Figueiró",
        "regime": "O",
        "codigoCurso": "12416",
        "repetente": false
      },
      {
        "nmec": 11007,
        "nome": "Lourenço Anhaia Baptista Barroso",
        "regime": "O",
        "codigoCurso": "11853",
        "repetente": false
      },
      {
        "nmec": 11008,
        "nome": "Lucas Rebocho Carvalhais",
        "regime": "O",
        "codigoCurso": "12023",
        "repetente": false
      },
      {
        "nmec": 11009,
        "nome": "João Bonito Afonso",
        "regime": "O",
        "codigoCurso": "15513",
        "repetente": false
      },
      {
        "nmec": 11010,
        "nome": "Leonor Rebimbas",
        "regime": "O",
        "codigoCurso": "11243",
        "repetente": false
      },
      {
        "nmec": 11011,
        "nome": "Joaquim Toledo Rocha Silvestre Marmou",
        "regime": "O",
        "codigoCurso": "14334",
        "repetente": true
      },
      {
        "nmec": 11012,
        "nome": "Sara Marquesa dos Santos",
        "regime": "O",
        "codigoCurso": "12342",
        "repetente": false
      },
      {
        "nmec": 11013,
        "nome": "Pedro Albuquerque Guedes",
        "regime": "O",
        "codigoCurso": "14253",
        "repetente": false
      },
      {
        "nmec": 11014,
        "nome": "Inês Santos Ferreira",
        "regime": "T",
        "codigoCurso": "11873",
        "repetente": false
      },
      {
        "nmec": 11015,
        "nome": "Fábio Ribeiro Mendes",
        "regime": "O",
        "codigoCurso": "14543",
        "repetente": false
      },
      {
        "nmec": 11016,
        "nome": "Diogo Valente Moreira",
        "regime": "T",
        "codigoCurso": "12314",
        "repetente": false
      },
      {
        "nmec": 11017,
        "nome": "Marta Carvalho Rodrigues",
        "regime": "O",
        "codigoCurso": "11234",
        "repetente": false
      },
      {
        "nmec": 11018,
        "nome": "Luís Miguel Abreu dos Santos",
        "regime": "O",
        "codigoCurso": "13534",
        "repetente": true
      },
      {
        "nmec": 11005,
        "nome": "Maria Paz Freire Remígio Frias",
        "regime": "T",
        "codigoCurso": "11415",
        "repetente": true
      },
      {
        "nmec": 11006,
        "nome": "Lisandro Barreno Aires Figueiró",
        "regime": "O",
        "codigoCurso": "12416",
        "repetente": false
      },
      {
        "nmec": 11007,
        "nome": "Lourenço Anhaia Baptista Barroso",
        "regime": "O",
        "codigoCurso": "11853",
        "repetente": false
      },
      {
        "nmec": 11008,
        "nome": "Lucas Rebocho Carvalhais",
        "regime": "O",
        "codigoCurso": "12023",
        "repetente": false
      },
      {
        "nmec": 11009,
        "nome": "João Bonito Afonso",
        "regime": "O",
        "codigoCurso": "15513",
        "repetente": false
      },
      {
        "nmec": 11010,
        "nome": "Leonor Rebimbas",
        "regime": "O",
        "codigoCurso": "11243",
        "repetente": false
      },
      {
        "nmec": 11011,
        "nome": "Joaquim Toledo Rocha Silvestre Marmou",
        "regime": "O",
        "codigoCurso": "14334",
        "repetente": true
      }
    ];

    const studentsNotas = [
      { "nota": 13 },
      { "nota": 9 },
      { "nota": 11 },
      { "nota": null },
      { "nota": 16 },
      { "nota": null },
      { "nota": 10 },
      { "nota": 12 },
      { "nota": null },
      { "nota": 14 },
      { "nota": null },
      { "nota": 15 },
      { "nota": 18 },
      { "nota": 8 },
      { "nota": null },
      { "nota": 17 }
    ];
  
    return (

      <ThemeProvider theme={Theme}>
        <div class="pauta-page-container">
          <div className="pauta-page-title">{ pautaName.pautaNome }</div>
          <MDBContainer class="w-100">
            <MDBRow end>
              <MDBCol md="3" lg="2">
                <Button variant="default" width="9rem" >Download para preencher</Button>
              </MDBCol>
              <MDBCol md="3" lg="2">
                <div class="d-flex justify-content-end">
                  <Button variant="default" width="9.5rem">Upload de planilha da pauta</Button>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          <Table 
            marginTop="15px" 
            borders="1px solid" 
            col2Size="10%"
            col3Size="10%"
            col4Size="15%" >
            <thead>
              <tr>
                <th>Nome</th>
                <th>Nº Mec.</th>
                <th>Regime</th>
                <th>Código de Curso</th>
                <th>Repetente</th>
                <th>Nota</th>
              </tr>
            </thead>
            <tbody>
              {studentsData.map((student, index) =>{
                const notaContent = studentsNotas[index] 
                return (
                <tr>
                  <td>{student.nome}</td>
                  <td>{student.nmec}</td>
                  <td>{student.regime}</td>
                  <td>{student.codigoCurso}</td>
                  <td>{student.repetente ? "Sim" : "Não" }</td>
                  <td>
                    <Input border="1px solid #424242" width="90px" color="#424242" value={studentsNotas[index]?.nota || ""}/>
                  </td>
                </tr>
              )})}
            </tbody>
          </Table>
        </div>
      </ThemeProvider>
    );
}
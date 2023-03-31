import { Table, Theme, ThemeProvider } from "@uaveiro/ui";


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
      }
    ];
  
    return (

      <div class="pauta-page-container">
          <h1 className="pauta-page-title">{ pautaName.pautaNome }</h1>
        <ThemeProvider theme={Theme}>
          <Table marginTop="0">
            <caption>Tabela de alunos</caption>
            <thead>
              <tr>
                <th>Número Mecanográfico</th>
                <th>Nome</th>
                <th>Regime</th>
                <th>Código de Curso</th>
                <th>Repetente</th>
              </tr>
            </thead>
            <tbody>
              {studentsData.map((student) => (
                <tr>
                  <td>{student.nome}</td>
                  <td>{student.nmec}</td>
                  <td>{student.regime}</td>
                  <td>{student.codigoCurso}</td>
                  <td>{student.repetente ? "Sim" : "Não" }</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ThemeProvider>
      </div>
    );
}
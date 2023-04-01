const data = {
    hasSectionTitle: true,
    title: "",
    data: `
      <table>

          <thead>
            <tr>
              <th>Disciplina</th>
              <th>Época de Exame</th>
              <th>N_Pauta</th>
              <th>Estado</th>
              <th>Editar</th>
              <th>Detalhes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Introdução a Engenharia de software</td>
                <td>Normal</td>
                <td>123NM</td>
                <td><Button className="circle_btn">' '</Button></td>
                <td><Button variant="contained">Editar</Button></td>
                <td><Button variant="contained">Detalhes</Button></td>
                </tr>
            <tr>
                <td>Projecto em Informatica</td>
                <td>Normal</td>
                <td>123NM</td>
                <td><Button className="circle_btn">' '</Button></td>
                <td><Button variant="contained">Editar</Button></td>
                <td><Button variant="contained">Detalhes</Button></td>
            </tr>
            <tr>
                <td>Compiladores</td>
                <td>Normal</td>
                <td>123NM</td>
                <td><Button className="circle_btn">' '</Button></td>
                <td><Button variant="contained">Editar</Button></td>
                <td><Button variant="contained">Detalhes</Button></td>
            </tr>
            
            <tr>
                <td>Base de dados</td>
                <td>Normal</td>
                <td>123NM</td>
                <td><Button className="circle_btn">'  '</Button></td>
                <td><Button variant="contained">Editar</Button></td>
                <td><Button variant="contained">Detalhes</Button></td>
            </tr>
          </tbody>
      </table>
    `
  };
  
  export default data;
  
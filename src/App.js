import {
  ThemeProvider,
  Theme,
  Button
} from "@uaveiro/ui";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <div>
        <h1>Welcome to my React App</h1>
        <p>This is a sample paragraph of information.</p>
        <ul>
          <li>List item 1</li>
          <li>List item 2</li>
          <li>List item 4</li>
        </ul>
          <Button>Hello from paco2</Button>
      </div>
    </ThemeProvider>
  );
}

export default App;

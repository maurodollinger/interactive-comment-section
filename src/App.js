import Home from "./Components/Home/Home";

const routes = {
  '/interactive-comment-section/build/': Home,
};

function App() {
  const path = window.location.pathname;
  const Component = routes[path];
  return (
    <div className="App">
      <Component />
    </div>
  );
}

export default App;

import AddComment from "./Components/AddComment/AddComment";
import CommentsSection from "./Components/CommentsSection/CommentsSection";
import { AuthContextProvider } from "./Context/auth-context";
import jsonData from './data/data.json'

function App() {
  return (
    <div className="App">
      <AuthContextProvider user={jsonData.currentUser}>
        <CommentsSection comments={jsonData.comments}/>
        <AddComment data={jsonData.currentUser}/>
      </AuthContextProvider>
    </div>
  );
}

export default App;

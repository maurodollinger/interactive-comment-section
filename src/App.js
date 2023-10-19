import {useState} from 'react';
import AddComment from "./Components/AddComment/AddComment";
import Modal from './Components/Modal/Modal';
import CommentsSection from "./Components/CommentsSection/CommentsSection";
import { AuthContextProvider } from "./Context/auth-context";
import jsonData from './data/data.json'

function App() {
  const [modalOpen,setModalOpen] = useState(false);

  const openModal = () =>{
    setModalOpen(true);    
  }
  
  const closeModal = () =>{
    setModalOpen(false);
  }
  
  return (
    <div className="App">
      <AuthContextProvider user={jsonData.currentUser} openModal={openModal}>
        <CommentsSection comments={jsonData.comments}/>
        <AddComment data={jsonData.currentUser}/>
        {modalOpen && <Modal onClose={closeModal}></Modal>}
      </AuthContextProvider>
    </div>
  );
}

export default App;

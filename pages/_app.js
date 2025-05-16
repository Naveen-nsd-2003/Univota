/* import "../styles/globals.css";

//INTERNAL IMPORT
import { VotingProvider } from "../context/Voter";
import  NavBar  from "../components/NavBar/NavBar";

const MyApp = ({ Component, pageProps }) =>(

<VotingProvider>
    <div>
        <NavBar/>
        <div>
            <Component {...pageProps} />;
        </div>
    </div>
</VotingProvider>
);
    
    

export default MyApp;
 */

import "../styles/globals.css";

// INTERNAL IMPORT
import { VotingProvider } from "../context/Voter";
import NavBar from "../components/NavBar/NavBar";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyApp = ({ Component, pageProps }) => (
  <VotingProvider>
    <div>
      <NavBar />
      <Component {...pageProps} />
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover 
        theme="dark"
      />
    </div>
  </VotingProvider>
);

export default MyApp;
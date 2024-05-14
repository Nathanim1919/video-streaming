import { ImSpinner9 } from "react-icons/im";
import styled from "styled-components";


const Loader = () => {
    return (
      <Container className="flex space-x-2 w-full h-screen fixed inset-0 bg-zinc-700/50 z-50 justify-center items-center">
        <ImSpinner9/>
      </Container>
    );
  };
  
  export default Loader;
  


  const Container = styled.div`
    background-color: rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    place-items: center;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    color: #fff;
    gap: 2rem;
    position: relative;


    >*:nth-child(1){
          animation: spin 2s linear infinite;
          font-size: 3rem;
      }


    @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
  `
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
    background-color: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    place-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    color: #fff;
    gap: 2rem;
    position: relative;
    padding: 3rem;


    >*:nth-child(1){
          animation: spin .61s linear infinite;
          font-size: 2rem;
      }


    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `
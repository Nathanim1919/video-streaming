import { ImSpinner9 } from "react-icons/im";
import styled from "styled-components";


const Loader = () => {
    return (
      <Container className="flex space-x-2 w-full h-screen fixed inset-0 bg-zinc-700/50 z-50 justify-center items-center">
        <ImSpinner9/>
      </Container>
    );

    // return (
    //   <Container className="outer">
    //     <div className="inner">
    //       <div className="circle"></div>
    //     </div>
    //   </Container>
    // )
  };
  
  export default Loader;


  // const Container = styled.div`
  //   position: absolute;
  //   width: 100%;
  //   height: auto;
  //   background-color: #0000005e;
  //   backdrop-filter: blur(4px);
  //   display: grid;
  //   place-items: center;
  //   .inner{
  //         width: 70px;
  //         height: 70px;
  //         background-color: #002d80;
  //         border-radius: 50%;
  //         position: relative;
  //         margin-top: 4rem;
  //         display: grid;
  //         place-items: center;
  //         animation: spin 1s linear infinite;
  //   }
    
  //   .circle{
  //     width: 65px;
  //     position: relative;
  //     height: 65px;
  //     border-radius: 50%;
  //     background-color: #211f1f;
  //   }


  //   @keyframes spin {
  //    0% { 
  //     transform: scale(0);
  //     opacity: 0;
  //    }
  //    100% { 
  //     transform: scale(1);
  //     opacity: 1;
  //    }
  //    }
  // `

  


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
          background-color: #264658;
      }


    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `
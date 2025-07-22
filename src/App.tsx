import { StarBackground } from "./components/starbackground";
// import ProfilePage from "./pages/profilepage";
import Projects from "./pages/projects";
import { Link, Element }from "react-scroll";

function App() {
  return (
    <div className="w-full h-screen">
      <StarBackground />
      <div className="w-full h-screen">
        <ProfilePage />
      </div>
      <Element name="section2" className="">
        <Projects />
      </Element>
    </div>
  );
}
//  overflow-y-scroll
// 
// overflow-x-hidden
export default App;

function ProfilePage() {
  return (
    <>
      <div className="flex flex-row justify-between px-[170px] py-[152px] ">
        <div className="text-white flex flex-col items-start h-[415x] w-[418px] justify-between">
          <div className="flex flex-col items-start text-base/20">
            <h1 className="text-[96px] font-bold">Hi,</h1>
            <h2 className="text-[70px] font-bold ">I'm Aldren</h2>
          </div>
          <p className="text-left text-[25px]/7">
            I’m a Software developer <br />
            with experience in Mobile, <br />
            Web, and AI development.
          </p>
          <Link to="section2" smooth={true} duration={500}>
            <button
              type="button"
              className="bg-[#75C310] rounded-[30px] w-[220px] h-[56px] text-[20px] font-bold"
            >
              Go to portfolio
            </button>
          </Link>
        </div>
        <div className="h-[415px] w-[418px] p-5">
          <img
            src="/src/assets/profile/circle_profile.png"
            alt="Profile"
            className="h-full w-full object-cover rounded-full border-[10px] border-[#75C310]"
          />
        </div>
      </div>
    </>
  );
}



// import { Link, Element } from 'react-scroll';

// function App() {
//   return (
//     <div>
//       <nav className='bg-white'>

//             <Link to="section1" smooth={true} duration={500}>Section 1</Link>

//             <Link to="section2" smooth={true} duration={500}>Section 2</Link>

//       </nav>
//       <Element name="section1">
//         <section style={{ height: '100vh', backgroundColor: 'lightblue' }}>
//           <h1>Section 1</h1>
//           <p>This is the content of section 1</p>
//         </section>
//       </Element>
//       <Element name="section2">
//         <section style={{ height: '100vh', backgroundColor: 'lightgreen' }}>
//           <h1>Section 2</h1>
//           <p>This is the content of section 2</p>
//         </section>
//       </Element>
//       {/* Add more sections with Element components as needed */}
//     </div>
//   );
// }

// export default App;
import {Link} from "react-scroll";

export default function ProfilePage() {

  return (
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
        <Link to="projects" smooth={true} duration={250}>
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
          src="/profile/circle_profile.png"
          alt="Profile"
          className="h-full w-full object-cover rounded-full border-[10px] border-[#75C310]"
        />
      </div>
    </div>
  );
}

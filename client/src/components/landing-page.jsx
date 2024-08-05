import female1 from "../assets/images/female1.png";
import female2 from "../assets/images/female2.png";
import content from "../assets/images/content.png";
import containerhorizon from "../assets/images/containerhorizon.png";
import heart from "../assets/images/heart.png";
import emojismile from "../assets/images/emojismile.png";
import emojisunglasses from "../assets/images/emojisunglasses.png";
import emojiwowstar from "../assets/images/emojiwowstar.png";
import emojiparty from "../assets/images/emojiparty.png";
import emojilove from "../assets/images/emojilove.png";
import containervertical from "../assets/images/containervertical.png";
import Nav from "../pages/non-user/nav";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#160404] pt-[180px] overflow-x-hidden">
      <Nav />
      {/* Section 1 */}
      <div className="relative flex flex-col lg:flex-row-reverse lg:gap-6 lg:justify-center items-center">
        {/* Background Circles and Images */}
        <div className="max-lg:hidden">
          <div className="w-[67px] h-[67px] bg-[#411032] rounded-full absolute top-[100px] left-[-15px]" />
          <div className="w-[60px] h-[60px] bg-[#32000E] rounded-full absolute right-[100px] top-[379px]" />
          <div className="w-2 h-2 bg-yellow-900 rounded-full absolute right-[250px] top-[481px]" />
          <div className="w-2 h-2 bg-rose-400 rounded-full absolute left-[127px] top-[50px]   " />
          <div className="w-7 h-7 absolute right-[150px] top-[410px]">
            <img className="w-full h-full " src={emojismile} />
          </div>
          <div className="w-7 h-7 absolute left-[55%] top-[100px]">
            <img className="w-full h-full " src={heart} />
          </div>
        </div>

        {/* Main Image */}
        <div className="relative h-[209px] w-screen lg:w-[357px] lg:h-[758px]">
          <img
            className="absolute w-[250px] h-[305px] lg:w-[357px] lg:h-[500px] lg:top-[-144px] max-lg:top-[-96px] max-lg:left-[-30px]"
            src={female1}
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center gap-6 lg:mt-[175px] lg:mb-[223px] text-center text-white relative z-10">
          <h1 className="text-6xl font-black leading-[69px] font-['Nunito']">
            Make the <br /> first ‘Merry’
          </h1>
          <p className="text-xl font-semibold leading-[30px] font-['Nunito']">
            If you feel lonely, let’s start meeting <br />
            new people in your area! <br />
            Don’t forget to get Merry with us
          </p>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="px-6 py-3 bg-rose-700 rounded-full hover:bg-[#FFE1EA] hover:text-[#95002B] shadow text-base font-bold leading-normal font-['Nunito']"
          >
            Start matching!
          </button>
        </div>
        {/* Secondary Image */}
        <div className="w-screen lg:w-[357px] h-[376.75px] lg:h-[758px] relative">
          <img
            className=" h-[376.75px] lg:h-[500px] absolute lg:bottom-0 max-lg:right-[-56px]"
            src={female2}
          />
        </div>
      </div>

      {/* Section 2 */}
      <section
        id="section-two"
        className=" relative z-10 flex flex-col lg:flex-row lg:justify-center gap-[82px] lg:gap-[25px] lg:pb-20 pt-10 lg:pt-[150px] items-center bg-[#160404]"
      >
        <div className="w-[500px] max-lg:w-[330px]">
          <h2 className="text-pink-400 text-[46px] font-extrabold leading-[57.50px] font-['Nunito']">
            Why Merry <br className="lg:hidden" /> Match?
          </h2>
          <p className="text-xl font-semibold leading-[30px] font-['Nunito'] text-white mt-4">
            Merry Match is a new generation of online dating website for
            everyone.
          </p>
          <p className="text-base font-normal leading-normal font-['Nunito'] text-slate-50 mt-4">
            Whether you’re committed to dating, meeting new people, expanding
            your social network, meeting locals while traveling, or even just
            making a small chat with strangers.
            <br />
            <br />
            This site allows you to make your own dating profile, discover new
            people, save favorite profiles, and let them know that you’re
            interested.
          </p>
        </div>
        <div className="">
          <img className="w-full" src={content} />
        </div>
      </section>

      {/* Section 3 */}
      <section
        id="section-three"
        className="flex flex-col items-center bg-[#160404] pt-20 pb-[88px] lg:pt-[150px] lg:pb-[81px]"
      >
        <h2 className="w-[300px] text-center text-pink-400 text-[46px] font-extrabold leading-[57.50px] font-['Nunito']">
          How to Merry
        </h2>
        <div className="lg:w-screen flex flex-wrap justify-center gap-6 mt-12 max-lg:flex-col">
          {[
            { img: emojisunglasses, title: "Upload your cool picture" },
            { img: emojiwowstar, title: "Explore and find the one you like" },
            { img: emojiparty, title: "Click ‘Merry’ to get to know!" },
            { img: emojilove, title: "Start chatting and relationship" },
          ].map((item, index) => (
            <div
              key={index}
              className="w-[262px] p-8 bg-[#2A0B21] rounded-[40px] flex flex-col items-center gap-10 max-lg:w-[350px] max-lg:h-[300px]"
            >
              <div className="w-[120px] h-[120px] p-[35px] bg-[#411032] rounded-full flex items-center justify-center">
                <img className="w-[50px] h-[50px]" src={item.img} />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold leading-[30px] text-white font-['Nunito']">
                  {item.title}
                </h3>
                <p className="text-base leading-normal font-normal text-slate-300 font-['Nunito']">
                  Lorem ipsum is a placeholder text
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 */}
      <section className=" bg-[#160404] lg:px-40 lg:pt-20 lg:pb-[120px]">
        <div className=" relative flex justify-center items-center lg:rounded-[32px]">
          <img
            className=" absolute w-full h-full max-lg:hidden object-cover z-0 rounded-[32px]"
            src={containerhorizon}
          />
          <img
            className=" absolute w-full h-full lg:hidden object-cover z-0"
            src={containervertical}
          />
          <div className=" flex flex-col gap-7 lg:gap-10 items-center z-10 py-32 lg:pt-[83px] lg:pb-[81px] ">
            <div className="text-center text-white text-[46px] font-extrabold leading-[57.50px] font-['Nunito']">
              Let’s start <br className="xl:hidden" /> finding <br /> and
              matching someone new
            </div>
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="px-6 py-3 bg-rose-100 rounded-full hover:bg-[#E4E6ED] font-bold leading-normal font-['Nunito'] text-red-600"
            >
              Start Matching!
            </button>
          </div>
        </div>
      </section>
      <div className="">
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;

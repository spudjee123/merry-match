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
import Nav from "../nav";

export function LandingPage() {
  return (
    <div className="bg-[#160404] lg:h-[2700px] max-lg:h-[4000px]">
      <Nav />
      {/* Section 1 */}
      <div className="relative flex flex-col items-center">
        {/* Background Circles and Images */}
        <div className="absolute inset-0 max-lg:hidden">
          <div className="w-[67px] h-[67px] bg-[#411032] rounded-full absolute left-[-10px] top-[120px]" />
          <div className="w-[60px] h-[60px] bg-[#32000E] rounded-full absolute right-[100px] top-[379px]" />
          <div className="w-2 h-2 bg-yellow-900 rounded-full absolute right-[250px] top-[481px]" />
          <div className="w-2 h-2 bg-rose-400 rounded-full absolute left-[127px] top-[75px]   " />
          <div className="w-7 h-7 absolute right-[150px] top-[410px]">
            <img className="w-full h-full" src={emojismile} />
          </div>
          <div className="w-7 h-7 absolute right-[550px] top-[100px]">
            <img className="w-full h-full" src={heart} />
          </div>
        </div>

        {/* Main Image */}
        <div className="absolute right-[300px] top-[-144px] w-[357px] h-[500px]">
          <img
            className="absolute left-[200px] top-0 w-[286px] h-[500px] max-lg:left-[250px] max-lg:top-[80px] max-lg:w-[190px] max-lg:h-[300px]"
            src={female1}
          />
          <div className="absolute left-[209px] top-[398px] w-[148px] h-[41px]">
            <div className="absolute left-[320px] top-[40px] w-[148px] h-[41px] bg-[#64001D] rounded-tl-3xl rounded-bl-3xl rounded-br-3xl rotate-180 origin-top-left max-lg:left-[280px] max-lg:top-[-50px]" />
            <div className="absolute left-[170px] top-[10px] w-[148px] text-center text-white text-xs leading-[18px] max-lg:left-[130px] max-lg:top-[-80px]">
              Hi! Nice to meet you
            </div>
          </div>
        </div>

        {/* Secondary Image */}
        <div className="absolute left-[160px] top-[258px] w-[357px] h-[500px]">
          <img
            className="absolute left-[-50px] w-[500px] h-[500px] max-lg:left-[40px] max-lg:top-[430px] max-lg:w-[270px] max-lg:h-[350px] z-10"
            src={female2}
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center gap-6 mt-40 text-center text-white max-lg:mt-[300px]">
          <h1 className="text-6xl font-black leading-[69px] font-['Nunito']">
            Make the <br /> first ‘Merry’
          </h1>
          <p className="text-xl font-semibold leading-[30px] font-['Nunito']">
            If you feel lonely, let’s start meeting <br />
            new people in your area! <br />
            Don’t forget to get Merry with us
          </p>
          <button className="px-6 py-3 bg-rose-700 rounded-full shadow text-base font-bold leading-normal font-['Nunito']">
            Start matching!
          </button>
        </div>
      </div>

      {/* Section 2 */}
      <div className="relative flex flex-col items-center bg-[#160404] w-screen h-screen top-[100px] lg max-lg:top-[100px]">
        <div className="absolute left-[100px] top-[300px] w-[500px] max-lg:left-[30px] max-lg:top-[400px] max-lg:w-[330px]">
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
        <div className="absolute right-[100px] top-[275px] max-lg:left-[10px] max-lg:top-[900px] max-lg:w-[500px] max-lg:h-[500px]">
          <img className="max-lg:w-[350px]" src={content} />
        </div>
      </div>

      {/* Section 3 */}
      <div className="relative flex flex-col items-center bg-[#160404] px-40 pt-20 pb-[88px] top-[-100px] max-lg:h-screen max-lg:top-[500px]">
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
      </div>

      {/* Section 4 */}
      <div className=" bg-[#160404] max-lg:relative max-lg:h-[500px] max-lg:top-[1200px]">
        <div className="relative flex justify-center items-center">
          <img className="max-lg:hidden" src={containerhorizon} />
          <img className="w-full h-full lg:hidden" src={containervertical} />
          <div className="absolute lg:mb-[100px] text-center text-white text-[46px] font-extrabold leading-[57.50px] font-['Nunito'] max-lg:left-0 max-lg:top-[120px]">
            Let’s start <br className="xl:hidden" /> finding <br /> and matching
            someone new
          </div>
          <button className="px-6 py-3 bg-rose-100 rounded-full font-bold leading-normal font-['Nunito'] text-rose-800 absolute top-[230px] max-lg:left-[120px] max-lg:top-[400px]">
            Start Matching!
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

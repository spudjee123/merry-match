import landingpage1 from "./assets/images/landingpage1.png";
import landingpage2 from "./assets/images/landingpage2.png";
import landingpage3 from "./assets/images/landingpage3.png";
import landingpage4 from "./assets/images/landingpage4.png";
import landingpage5 from "./assets/images/landingpage5.png";
import landingpage6 from "./assets/images/landingpage6.png";
import landingpage7 from "./assets/images/landingpage7.png";
import landingpage8 from "./assets/images/landingpage8.png";
import landingpage9 from "./assets/images/landingpage9.png";
import landingpage10 from "./assets/images/landingpage10.png";
import landingpage11 from "./assets/images/landingpage11.png";

export function LandingPage() {
  return (
    /* ------------------------------------------------------- section 1 ------------------------------------------------------- */
    <div className="h-[3200px] bg-[#160404] max-lg:h-[4200px]">
      <div className="w-screen h-screen relative flex flex-col bg-[#160404]">
        <div className="w-screen top-[80px] absolute max-lg:hidden">
          <div className="w-[67px] h-[67px] left-[-10px] top-[36px] absolute bg-[#411032] rounded-full" />
          <div className="w-[60px] h-[60px] right-[100px] top-[379px] absolute bg-[#32000E] rounded-full" />
          <div className="w-2 h-2 right-[250px] top-[481px] absolute bg-yellow-900 rounded-full" />
          <div className="w-[7px] h-[7px] left-[127px] top-0 absolute bg-rose-400 rounded-full" />
          <div className="w-7 h-7 right-[150px] top-[410px] absolute">
            <img
              className="w-7 h-7 left-0 top-0 absolute "
              src={landingpage5}
            />
          </div>
          <div className="w-7 h-7 right-[550px] top-[0px] absolute">
            <img className="w-7 h-7 left-0 top-0 absolute" src={landingpage6} />
          </div>
        </div>

        <div className="w-[357px] h-[500px] right-[300px] top-[-144px] absolute">
          <img
            className="w-[286px] h-[500px] left-[200px] top-0 absolute max-lg:top-[80px] max-lg:left-[250px] max-lg:w-[190px] max-lg:h-[300px] "
            src={landingpage1}
          />
          <div className="w-[148px] h-[41px] left-[209px] top-[398px] absolute">
            <div
              className="w-[148px] h-[41px] left-[230px] top-[40px] absolute origin-top-left rotate-180 bg-[#64001D] rounded-br-3xl rounded-bl-3xl rounded-tl-3xl
          max-lg:left-[280px] max-lg:top-[-50px]"
            />
            <div className="w-[148px] left-[82px] top-[10px] absolute text-center text-white text-xs leading-[18px] max-lg:top-[-80px] max-lg:left-[130px]">
              Hi! Nice to meet you
            </div>
          </div>
        </div>
        <div className="w-[357px] h-[500px] left-[160px] top-[258px] absolute">
          <img
            className="w-[500px] h-[500px] left-[-50px] absolute z-[1] max-lg:w-[270px] max-lg:h-[350px] max-lg:top-[430px] max-lg:left-[40px]"
            src={landingpage2}
          />
        </div>

        <div className="w-screen h-screen mb-[150px] flex flex-col justify-center items-center gap-[60px] max-lg:mt-[240px]  ">
          <div className="self-stretch h-[252px] flex-col justify-start items-center gap-6 flex">
            <div className="self-stretch text-center text-white text-6xl font-black font-['Nunito'] leading-[69px]">
              Make the <br />
              first ‘Merry’
            </div>
            <div className="self-stretch text-center text-white text-xl font-semibold font-['Nunito'] leading-[30px]">
              If you feel lonely, let’s start meeting <br />
              new people in your area! <br />
              Don’t forget to get Merry with us
            </div>
          </div>
          <div className="px-6 py-3 bg-rose-700 rounded-[99px] shadow justify-center items-center gap-2 inline-flex">
            <div className="text-center text-white text-base font-bold font-['Nunito'] leading-normal">
              Start matching!
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------- section 2 ------------------------------------------------------- */}

        <div className="w-screen h-screen top-[700px] absolute bg-[#160404] max-lg:top-[700px] max-lg:flex max-lg:flex-col">
          <div className="w-[500px] absolute top-[300px] left-[100px] max-lg:w-[330px] max-lg:top-[400px] max-lg:left-[30px]">
            <div className="w-[452px] top-[20px] text-pink-400 text-[46px] font-extrabold font-['Nunito'] leading-[57.50px] ">
              Why Merry <br className="xl:hidden" />
              Match?
            </div>
            <div className="self-stretch">
              <span className="text-white text-xl font-semibold font-['Nunito'] leading-[30px]">
                <br />
                Merry Match is a new generation of online dating website for
                everyone.
                <br />
              </span>
              <span className="text-slate-50 text-base font-normal font-['Nunito'] leading-normal">
                <br />
                Whether you’re committed to dating, meeting new people,
                expanding your social network, meeting locals while traveling,
                or even just making a small chat with strangers.
                <br />
                <br />
                This site allows you to make your own dating profile, discover
                new people, save favorite profiles, and let them know that
                you’re interested.
              </span>
            </div>
          </div>

          <div className="top-[275px] right-[100px] absolute max-lg:flex max-lg:flex-col max-lg:left-[10px] max-lg:top-[900px] max-lg:w-[500px] max-lg:h-[500px]">
            <img className="max-lg:w-[350px]" src={landingpage3} />
          </div>
        </div>

        {/* ------------------------------------------------------- section 3 ------------------------------------------------------- */}

        <div className="w-screen h-screen top-[1400px] px-40 pt-20 pb-[88px] bg-[#160404] absolute flex justify-center items-center max-lg:top-[1950px]">
          <div className="self-stretch flex-col justify-start items-center gap-12 inline-flex ">
            <div className="self-stretch text-center text-pink-400 text-[46px] font-extrabold font-['Nunito'] leading-[57.50px]">
              How to Merry
            </div>
            <div className="justify-start items-start gap-6 inline-flex max-lg:flex-col bg-[#160404]">
              <div className="w-[262px] p-8 bg-[#2A0B21] rounded-[40px] flex-col justify-start items-center gap-10 inline-flex max-lg:w-[350px] max-lg:h-[300px]">
                <div className="w-[120px] h-[120px] p-[35px] bg-[#411032] rounded-[99px] justify-center items-center inline-flex ">
                  <img className="w-[50px] h-[50px]" src={landingpage7} />
                </div>
                <div className="self-stretch h-[124px] flex-col gap-3 flex">
                  <div className="self-stretch text-center text-white text-2xl font-bold font-['Nunito'] leading-[30px]">
                    Upload your cool picture
                  </div>
                  <div className="self-stretch text-center text-slate-300 text-base font-normal font-['Nunito'] leading-normal">
                    Lorem ipsum is a placeholder text
                  </div>
                </div>
              </div>
              <div className="w-[262px] p-8 bg-[#2A0B21] rounded-[40px] flex-col justify-start items-center gap-10 inline-flex max-lg:w-[350px] max-lg:h-[330px]">
                <div className="w-[120px] h-[120px] p-[35px] bg-[#411032] rounded-[99px] justify-center items-center inline-flex">
                  <img className="w-[50px] h-[50px]" src={landingpage8} />
                </div>
                <div className="self-stretch h-[124px] flex-col gap-3 flex">
                  <div className="self-stretch text-center text-white text-2xl font-bold font-['Nunito'] leading-[30px]">
                    Explore and find the one you like
                  </div>
                  <div className="self-stretch text-center text-slate-300 text-base font-normal font-['Nunito'] leading-normal">
                    Lorem ipsum is a placeholder text
                  </div>
                </div>
              </div>
              <div className="w-[262px] p-8 bg-[#2A0B21] rounded-[40px] flex-col justify-start items-center gap-10 inline-flex max-lg:w-[350px] max-lg:h-[330px]">
                <div className="w-[120px] h-[120px] p-[35px] bg-[#411032] rounded-[99px] justify-center items-center inline-flex">
                  <img className="w-[50px] h-[50px]" src={landingpage9} />
                </div>
                <div className="self-stretch h-[124px] flex-col gap-3 flex">
                  <div className="self-stretch text-center text-white text-2xl font-bold font-['Nunito'] leading-[30px]">
                    Click ‘Merry’ for get to know!
                  </div>
                  <div className="self-stretch text-center text-slate-300 text-base font-normal font-['Nunito'] leading-normal">
                    Lorem ipsum is a placeholder text
                  </div>
                </div>
              </div>
              <div className="w-[262px] p-8 bg-[#2A0B21] rounded-[40px] flex-col justify-start items-center gap-10 inline-flex max-lg:w-[350px] max-lg:h-[330px]">
                <div className="w-[120px] h-[120px] p-[35px] bg-[#411032] rounded-[99px] justify-center items-center inline-flex">
                  <img className="w-[50px] h-[50px]" src={landingpage10} />
                </div>
                <div className="self-stretch h-[124px] flex-col gap-3 flex">
                  <div className="self-stretch text-center text-white text-2xl font-bold font-['Nunito'] leading-[30px]">
                    Start chating and relationship{" "}
                  </div>
                  <div className="self-stretch text-center text-slate-300 text-base font-normal font-['Nunito'] leading-normal">
                    Lorem ipsum is a placeholder text
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------- section 4 ------------------------------------------------------- */}

        <div className="w-screen h-screen absolute top-[2100px] left-[-240px] bg-[#160404] max-lg:top-[3850px] max-lg:left-[2000px] max-lg:flex-col max-lg:absolute">
          <div className="w-full h-full absolute left-[400px] max-lg:left-[-2000px] max-lg:bottom-[250px]">
            <img className="max-lg:hidden" src={landingpage4} />
            <img className="max-lg:w-full xl:hidden" src={landingpage11} />
            <div className="left-[266px] top-[83px] absolute text-center text-white text-[46px] font-extrabold font-['Nunito'] leading-[57.50px] max-lg:left-[0px] max-lg:top-[130px]">
              Let’s start <br className="xl:hidden" />
              finding <br />
              and matching someone new
            </div>
            <button className="px-6 py-3 left-[479px] top-[239px] absolute bg-rose-100 rounded-[99px] font-bold font-['Nunito'] leading-normal max-lg:left-[120px] max-lg:top-[400px] text-rose-800  ">
              Start Matching!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LangingPage;

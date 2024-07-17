import NavUser from "./navUser"
import Footer from "../../components/Footer"
import heart from './images/heart.png'
import check from "./images/check.png"

const packages = [
    {
      name: 'Basic',
      price: 'THB 59.00',
      merry: '  Merry’ more than a daily limited',
      limit: 'Up to 25 Merry per day',
      imageUrl:
        'https://i.pinimg.com/564x/76/1f/96/761f967889d8efff2590ed79af6667e8.jpg',
    },
    {
        name: 'Platinum',
        price: 'THB 99.00',
        merry: '  Merry’ more than a daily limited ',
        limit: 'Up to 45 Merry per day',
        imageUrl:
          'https://i.pinimg.com/564x/76/1f/96/761f967889d8efff2590ed79af6667e8.jpg',
      },
      {
        name: 'Basic',
        price: 'THB 59.00',
        merry: '‘Merry’ more than a daily limited',
        limit: 'Up to 25 Merry per day',
        imageUrl:
          'https://i.pinimg.com/564x/76/1f/96/761f967889d8efff2590ed79af6667e8.jpg',
      }
  ]
  
  function Membership() {
    return (
      <>
        <NavUser />
        <div className="bg-white py-24 sm:py-32 mt-[80px]">
        <div className="max-w-2xl max-lg:ml-[40px] lg:ml-[200px]">
              <h2 className="text-lg leading-8 text-beige-700">Merry Membership</h2>
              <div className="mt-4 text-3xl font-bold tracking-tight text-purple-500 sm:text-4xl flex md:content-center">
                Join us and start matching
              </div>
              <p className="text-white md:text-purple-500">Be part of Merry Membership to make more Merry!</p>
            </div>
          <div className="mx-auto mb-[220px] grid justify-center max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
            {packages.map((item, index) => (
            <div className="card bg-base-100 w-94 shadow-xl flex">
              <figure className="px-10 pt-2 w-[385px] h-[350px] border-gray-600 bg-white">
                
                  <div key={index} className="card-body items-start text-left">
                    <img
                      src={item.imageUrl}
                      alt="Package"
                      className="h-16 w-16 rounded-full"
                    />
                    <h2 className="card-title text-purple-800 text-2xl">{item.name}</h2>
                    <h2 className="card-title text-purple-800 text-xl">{item.price}<span className="text-gray-600 text-base">/Month</span></h2>
                    <div className="flex items-center"><img src={check} alt="checklist" /><span>{item.merry}</span></div>
                    <div className="flex items-center"><img src={check} alt="checklist" /><span>{item.limit}</span></div>
                    <hr/>
                    <div className="card-actions">
                      <button className="btn hover:bg-red-100 bg-red-100 border-red-100 text-red-600 rounded-[99px] w-[311px] h-[48px]">Choose package</button>
                    </div>
                  </div>
                
              </figure>
            </div>))}
          </div>
          <Footer/>
        </div>
      </>
    );
  }
  

  export default Membership
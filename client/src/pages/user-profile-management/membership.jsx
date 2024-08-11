import NavUser from "./navUser";
import Footer from "../../components/Footer";
import heart from "./images/heart.png";
import check from "./images/check.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../../context/auth";

function Membership() {
  const [packages, setPackages] = useState([]);
  const  { state } = useAuth() 
  const userName = state.user?.name
  console.log(state)

  const getData = async () => {
    try {
      const result = await axios.get("http://localhost:4001/admin/get");
      setPackages(result.data.packages);
      console.log("abc",result.data.packages)
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredPackages = packages.filter((item) =>
    item.packages_name.toLowerCase()
  );
const prices = packages.map((item => item.price))
console.log("abc",prices);

  const paymentCheckout = async (packageName) => {
    localStorage.setItem('selectedPackageName', packageName);
    const orderPayment = {
      user: { name: userName },
      packageName: { name: packageName },
    };
    const stripe = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLIC_KEY
    );
    try {
      const result = await axios.post(
        "http://localhost:4001/payments/api/checkout",
        orderPayment
      );
      const { url, sessionId } = result.data;
      window.location.href = url
      // const sessionId = result.data.sessionId;
      stripe.redirectToCheckout({sessionId:sessionId});
      
    } catch (error) {
      console.error("Error to payment checkout package:", error);
    }
  };

  return (
    <>
      <NavUser />
      <div className="bg-main py-24 sm:py-32 mt-[50px] overflow-x-hidden">
        <div className="max-w-2xl max-lg:ml-[40px] lg:ml-[200px]">
          <h2 className="text-lg leading-8 text-beige-700 mb-4">
            Merry Membership
          </h2>
          <div className="mt-4 text-3xl font-bold text-purple-500 sm:text-4xl flex md:hidden">
            Join us and start matching
          </div>
          <p className="text-white md:text-purple-500 text-4xl font-bold hidden md:block">
            Be part of Merry Membership to make more Merry!
          </p>
        </div>
        <div className="mx-auto mb-[220px] grid justify-center max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3 mt-12">
          {filteredPackages.map((item, index) => (
            <div
              key={index}
              id="package-container"
              className="card bg-base-100 w-94 shadow-md flex sm:w-[345px]"
            >
              <figure className="max-sm:px--18 pt-2 sm:w-[385px] h-[380px] border-gray-600 bg-white">
                <div
                  id="package-img"
                  className="card-body items-start text-left max-sm:px-4"
                >
                  <img
                    src={item.icons}
                    alt="Package"
                    className="h-16 w-16 rounded-[16px] mb-6 mt-8"
                  />
                  <h2 className="card-title text-purple-800 text-2xl">
                    {item.packages_name}
                  </h2>
                  <h2 className="card-title text-purple-800 text-xl">
                    THB {item.price}.00
                    <span className="text-gray-600 text-base">/Month</span>
                  </h2>

                  <div className="flex items-center">
                    <img src={check} alt="checklist" />

                    <span>‘Merry’ more than a daily limited </span>
                  </div>
                  <div className="flex items-center">
                    <img src={check} alt="checklist" />

                    <span>Up to {item.merry_limit} Merry per day</span>
                  </div>
                  <br className="h-2" />
                  <hr className="shadow-md w-[300px] mb-2" />
                  <div className="card-actions">
                    <button
                      id="choose-btn"
                      className="btn hover:bg-red-100 bg-red-100 border-red-100 text-red-600 rounded-[99px] w-[311px] h-[48px] leading-6 text-base mb-12"
                      onClick={() => {
                        paymentCheckout(item.packages_name);
                      }}
                    >
                      Choose package
                    </button>
                  </div>
                </div>
              </figure>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Membership;

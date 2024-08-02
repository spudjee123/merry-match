import NavUser from "./navUser.jsx";
import Footer from "../../components/Footer";
import MerryListView from "../../components/user-profile-management/merry-list-view.jsx";

function MerryListPage() {
  return (
    <>
      <NavUser />
      <section className=" mt-[88px] px-0 max-lg:pb-10 lg:px-[254px] lg:pt-20 lg:pb-[147px] min-h-[calc(100vh-397px)] lg:min-h-[calc(100vh-459px)] bg-main">
        <MerryListView />
      </section>
      <Footer />
    </>
  );
}

export default MerryListPage;

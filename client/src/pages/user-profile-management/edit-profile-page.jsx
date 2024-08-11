import EditProfileForm from "../../components/user-profile-management/edit-profile-form.jsx";
import Footer from "../../components/Footer.jsx";
import NavUser from "./navUser.jsx";

function EditProfilePage() {
  return (
    <>
      <NavUser />
      <section className="bg-main text-black mt-[70px]">
        <EditProfileForm />
      </section>
      <Footer />
    </>
  );
}

export default EditProfilePage;

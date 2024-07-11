import EditProfileForm from "../../components/user-profile-management/edit-profile-form.jsx";
import Nav from "../../nav.jsx";

function EditProfilePage() {
  return (
    <>
      <Nav />
      <section className="bg-main text-black">
        <EditProfileForm />
      </section>
    </>
  );
}

export default EditProfilePage;

import EditProfileForm from "../../components/user-profile-management/edit-profile-form.jsx";
import Nav from "../../nav.jsx";

function EditProfilePage() {
  return (
    <>
      <Nav />
      <section className="px-4 py-10 lg:px-60 lg:pt-20 lg:pb-14">
        <EditProfileForm />
      </section>
    </>
  );
}

export default EditProfilePage;

import RegisterForm from "../../components/non-user/register-form";
import Nav from "../../nav";

function RegisterPage() {
  return (
    <>
      <Nav />
      <section className=" bg-main relative">
        <RegisterForm />
        <div className=" w-[100px] h-[100px] rounded-full absolute top-[85px] left-[-19px] bg-beige-100 max-lg:hidden"></div>
        <div className=" w-[59px] h-[59px] rounded-full absolute top-[605px] right-[-14px] bg-beige-100 max-lg:hidden"></div>
      </section>
    </>
  );
}

export default RegisterPage;

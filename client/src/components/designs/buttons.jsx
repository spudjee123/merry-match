import { ArrowBackIcon } from "./icons";

export function ButtonPrimary(props) {
  return (
    <button
      className=" px-6 py-3 rounded-full font-nunito font-bold text-white text-center drop-shadow-primary bg-red-500 hover:bg-red-400 active:bg-red-600 disabled:bg-gray-300 disabled:text-gray-600"
      disabled={props.disabled}
      type={props.type}
      id={props.id}
      form={props.form}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export function ButtonSecondary(props) {
  return (
    <button
      className=" px-6 py-3 rounded-full font-nunito font-bold text-red-600 text-center drop-shadow-secondary bg-red-100 hover:bg-red-200 active:bg-red-300 disabled:bg-gray-300 disabled:text-gray-600"
      disabled={props.disabled}
      type={props.type}
      id={props.id}
      form={props.form}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export function ButtonGhost(props) {
  return (
    <button
      className=" px-2 py-1 flex gap-2 rounded-2xl"
      disabled={props.disabled}
      type={props.type}
      id={props.id}
      form={props.form}
      onClick={props.onClick}
    >
      <ArrowBackIcon className=" w-4 h-4; fill-red-500 hover:fill-red-400 active:fill-red-600 disabled:fill-gray-500 " />
      <p className=" font-nunito font-bold text-red-500 hover:text-red-400 active:text-red-600 disabled:text-gray-500 ">
        {props.text}
      </p>
    </button>
  );
}

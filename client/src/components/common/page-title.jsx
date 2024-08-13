function Title(props) {
  return (
    <article className=" font-nunito flex flex-col gap-2 items-start text-start">
      <h1 className=" text-beige-700 text-tagline">{props.title}</h1>
      <div>
        <p className=" text-purple-500 text-headline3 lg:text-headline2 text-wrap">
          {props.upperDetail}
        </p>
        <p className="  text-purple-500  text-headline3 lg:text-headline2 font-extrabold text-wrap">
          {props.lowerDetail}
        </p>
      </div>
    </article>
  );
}

export default Title;
